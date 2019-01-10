<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <h1 class="title">
          Hello World
        </h1>
        <p class="subtitle">
          My first website with <strong>Bulma</strong>!
        </p>
        <SignupForm />
      </div>
    </section>
  </div>
</template>

<script>
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import SignupForm from './components/SignupForm.vue'

export default {
  name: 'app',
  components: {
    SignupForm
  }
}
</script>
