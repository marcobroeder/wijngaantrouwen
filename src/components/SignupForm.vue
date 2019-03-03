<template>
  <div>
    <div class="alert alert-success alert-dismissible fade show" v-show="success">
      Bedankt voor je reactie!
      <button type="button" class="close" aria-label="Close" @click="success = false">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="alert alert-danger alert-dismissible fade show" v-show="error">
      {{ errorMessage }}
      <button type="button" class="close" aria-label="Close" @click="error = false">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div id="formulier" v-if="formtonen">
    <form novalidate="true">
      <div class="form-group">
        <label for="aanwezigheid">Aanwezigheid</label>
        <select id="aanwezigheid" class="form-control" v-model="form.aanwezigheid" :class="{'is-invalid' : formErrors.aanwezigheid}">
          <option disabled value="">Geef hier aan of je aanwezig bent</option>
          <option>Ik ben er bij!</option>
          <option>Ik ben er niet bij...</option>
        </select>
        <p class="invalid-feedback" v-show="formErrors.aanwezigheid">{{ formErrors.aanwezigheid }}</p>
      </div>

      <div class="form-group">
        <label for="name">Naam</label>
        <input id="name" class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" :class="{'is-invalid' : formErrors.name}" type="text" placeholder="Voor- en achternaam" v-model="form.name" @input="delete formErrors.name">
        <p class="invalid-feedback" v-show="formErrors.name">{{ formErrors.name }}</p>
      </div>

      <div class="form-group">
        <label for="tweedenaam">Partners zijn uiteraard ook welkom! Kom je met z'n tweeën?</label>
        <input id="tweedenaam" class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" :class="{'is-invalid' : formErrors.tweedenaam}" type="text" placeholder="Voor- en achternaam" v-model="form.tweedenaam">
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" class="form-control" :class="{'is-invalid' : formErrors.email}" type="text" placeholder="Op dit mailadres ontvang je later updates over de bruiloft" v-model="form.email" @input="delete formErrors.email">
        <p class="invalid-feedback" v-show="formErrors.email">{{ formErrors.email }}</p>
      </div>

      <div class="form-group">
        <label for="overnachting">Overnachting</label>
        <select id="overnachting" class="form-control" v-model="form.overnachting" :class="{'is-invalid' : formErrors.overnachting}">
          <option disabled value="">Heb je eventueel interesse in een overnachting?</option>
          <option>Ik ben zeker geïnteresseerd!</option>
          <option>Ik heb geen interesse in een overnachting</option>
        </select>
        <p class="invalid-feedback" v-show="formErrors.overnachting">{{ formErrors.overnachting }}</p>
      </div>

      <div class="form-group">
        <label for="opmerkingen">Plaats hier eventuele opmerkingen</label>
        <textarea class="form-control" id="opmerkingen" placeholder="Geef hier bijvoorbeeld eventuele voedselallergieën door." rows="4" v-model="form.opmerkingen"></textarea>
      </div>

      <div class="form-group" >
          <vue-recaptcha :sitekey="captcha.sitekey" @verify="captcha.key = $event; delete formErrors.captcha" @expired="captcha.key = ''" ref="captcha"></vue-recaptcha>
        <p class="invalid-feedback" :class="{'d-block' : formErrors.captcha }">{{ formErrors.captcha }}</p>
      </div>

      <div class="form-group" >
        <button class="btn btn-primary" @click="submit">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-show="loading"></span>
          Verstuur
        </button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import { sendXHR } from '../sendXHR.js'

export default {
  name: 'SignupForm',

  components: { VueRecaptcha },

  mixins: [sendXHR],

  data() {
    return {
      form: {
        name: null,
        email: null,
        subject: null,
        textarea: null,
        confirmation: true,
        aanwezigheid: '',
        overnachting: ''
      },
      formErrors: {},
      captcha: {
        sitekey: '6LdjsYkUAAAAAATwqRcqqkLJgngho3eqzRNiryu-',
        key: null,
      },
      url: 'https://script.google.com/macros/s/AKfycbxvfqdH8kbhJGNHBrSyv9GLrkLPY3if1VdHH7v77YJbjk0S0SdO/exec',
      loading: false,
      success: false,
      error: false,
      errorMessage: null,
      formtonen: true
    }
  },

  methods: {
    submit (e) {
      e.preventDefault();
      
      this.loading = true
      this.formErrors = {}

      if (!this.form.name) {
        this.formErrors.name = "Naam is verplicht."
      }
      if (!this.form.aanwezigheid) {
        this.formErrors.aanwezigheid = "Geef aan of je aanwezig bent."
      }
      if (!this.captcha.key) {
        this.formErrors.captcha = "Bevestig dat je geen robot bent."
      }
      if (!this.form.overnachting) {
        this.formErrors.overnachting = "Geef aan of je interesse hebt in een overnachting."
      }
      if (!this.form.email) {
        this.formErrors.email = 'Emailadres is verplicht.'
      } else if (!this.validEmail(this.form.email)) {
        this.formErrors.email = 'Emailadres is ongeldig.'
      }

      if (Object.keys(this.formErrors).length) {
        this.loading = false
        return
      }



      let body = {
        ...this.form, 
        captchaKey: this.captcha.key,
        formGoogleSendEmail: this.form.email
      }

      // Send using XHR
      this.sendXHR('POST', this.url, body)
      this.error = false
      this.formtonen = false
      router.push({ path: '#aanmelden' })
      //this.form.v-show = false
    },

    validEmail(email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },

    onSuccess () {
      this.loading = false
      this.clear()
      this.success = true
    },

    onError (error) {
      this.loading = this.success = false
      this.errorMessage = error
      this.error = true
    },

    clear () {
      this.errorMessage = null
      for (let key in this.form ) {
        this.form[key] = null
      }      
    }
  }
}


</script>
