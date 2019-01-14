<template>
  <div>
    <div class="alert alert-success alert-dismissible fade show" v-show="success">
      Verzonden!
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

    <form novalidate="true">
      <div class="form-group">
        <label for="name">Naam</label>
        <input id="name" class="form-control" :class="{'is-invalid' : formErrors.name}" type="text" placeholder="Naam" v-model="form.name" @input="delete formErrors.name">
        <p class="invalid-feedback" v-show="formErrors.name">{{ formErrors.name }}</p>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" class="form-control" :class="{'is-invalid' : formErrors.email}" type="text" placeholder="Naam" v-model="form.email" @input="delete formErrors.email">
        <p class="invalid-feedback" v-show="formErrors.email">{{ formErrors.email }}</p>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="confirmation" v-model="form.confirmation">
        <label class="form-check-label" for="confirmation">
          Stuur mij een bevestigingsmail
        </label>
      </div>

      <div class="form-group">
        <vue-recaptcha :sitekey="captcha.sitekey" @verify="captcha.key = $event" @expired="captcha.key = ''" ref="captcha"></vue-recaptcha>
      </div>

      <div class="form-group">
        <button :disabled="!this.captcha.key" class="btn btn-primary" @click="submit">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-show="loading"></span>
          Submit
        </button>
      </div>
    </form>
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
        confirmation: false
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
      errorMessage: null
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
      this.$refs.captcha.reset()
      this.captchaKey = this.errorMessage = null
      for (let key in this.form ) {
        this.form[key] = null
      }
    }
  }
}
</script>
