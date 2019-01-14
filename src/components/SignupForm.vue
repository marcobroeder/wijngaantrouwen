<template>
  <div>
    <div class="notification is-primary" v-show="success">
      <button class="delete" @click="success = false"></button>
      Verzonden!
    </div>

    <div class="notification is-danger" v-show="error">
      <button class="delete" @click="error = false"></button>
      {{ errorMessage }}
    </div>

    <form novalidate="true">
      <div class="field">
        <label class="label">Naam</label>
        <div class="control has-icons-right">
          <input class="input" :class="{'is-danger' : formErrors.name}" type="text" placeholder="Naam" v-model="form.name" @input="delete formErrors.name">
          <span class="icon is-small is-right" v-show="formErrors.name">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p class="help is-danger" v-show="formErrors.name">{{ formErrors.name }}</p>
      </div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" :class="{'is-danger' : formErrors.email}" type="email" placeholder="Email input" v-model="form.email" @input="delete formErrors.email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right" v-show="formErrors.email">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
        <p class="help is-danger" v-show="formErrors.email">{{ formErrors.email }}</p>
      </div>

      <div class="field">
        <label class="checkbox">
          <input type="checkbox" v-model="form.confirmation">
          Stuur mij een bevestigingsmail
        </label>
      </div>

      <div class="field">
        <label class="label">Subject</label>
        <div class="control">
          <div class="select">
            <select v-model="form.subject">
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Message</label>
        <div class="control">
          <textarea class="textarea" placeholder="Textarea" v-model="form.textarea"></textarea>
        </div>
      </div>

      <div class="field">
        <vue-recaptcha :sitekey="captcha.sitekey" @verify="captcha.key = $event" @expired="captcha.key = ''" ref="captcha"></vue-recaptcha>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button :disabled="!this.captcha.key" :class="{'is-loading' : loading}" class="button is-link" @click="submit">Submit</button>
        </div>
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
      this.error = false;
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
        this.form[key] = null;
      }
    }
  }
}
</script>
