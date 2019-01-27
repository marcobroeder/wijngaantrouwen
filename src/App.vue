<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#app">Bruiloft Marco&Kelsey</a>
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#app">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#welkom">Welkom</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#aanmelden">Aanmelden</a>
            </li>
            <li class="nav-item">
              <a class="nav-link js-scroll-trigger" href="#signup">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Header -->
    <header class="masthead">
      <div class="container d-flex h-100 align-items-end pb-5">
        <div class="mx-auto text-center">
          <a href="#aanmelden" class="btn btn-primary js-scroll-trigger">Aanmelden</a>
        </div>
      </div>
    </header>

    <!-- Welkom -->
    <section id="welkom" class="projects-section bg-light">
      <div class="container">

        <!-- Featured Project Row -->
        <div class="row align-items-center no-gutters mb-4 mb-lg-5">
          <div class="col-12 text-center">
            <i class="far fa-2x mb-2"></i>
            <h2 class="mb-5">Welkom!</h2>
          </div>
          <div class="col-12 text-left">
            Welkom...
          </div>
        </div>


      </div>
    </section>


    <!-- Projects Section -->
    <section id="aanmelden" class="projects-section bg-light">
      <div class="container">

        <!-- Featured Project Row -->
        <div class="row align-items-center no-gutters mb-4 mb-lg-5">
          <div class="col-12 text-center">
            <i class="far fa-paper-plane fa-2x mb-2"></i>
            <h2 class="mb-5">Geef aan dat je er blij bent!</h2>
          </div>
          <div class="col-12 text-left">
            <SignupForm />
          </div>
        </div>
        
        <!-- Project One Row -->
        <!-- <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
          <div class="col-lg-6">
            <img class="img-fluid" src="img/demo-image-01.jpg" alt="">
          </div>
          <div class="col-lg-6">
            <div class="bg-black text-center h-100 project">
              <div class="d-flex h-100">
                <div class="project-text w-100 my-auto text-center text-lg-left">
                  <h4 class="text-white">Misty</h4>
                  <p class="mb-0 text-white-50">An example of where you can put an image of a project, or anything else, along with a description.</p>
                  <hr class="d-none d-lg-block mb-0 ml-0">
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- Project Two Row -->
        <!-- <div class="row justify-content-center no-gutters">
          <div class="col-lg-6">
            <img class="img-fluid" src="img/demo-image-02.jpg" alt="">
          </div>
          <div class="col-lg-6 order-lg-first">
            <div class="bg-black text-center h-100 project">
              <div class="d-flex h-100">
                <div class="project-text w-100 my-auto text-center text-lg-right">
                  <h4 class="text-white">Mountains</h4>
                  <p class="mb-0 text-white-50">Another example of a project with its respective description. These sections work well responsively as well, try this theme on a small screen!</p>
                  <hr class="d-none d-lg-block mb-0 mr-0">
                </div>
              </div>
            </div>
          </div>
        </div> -->

      </div>
    </section>

    <!-- Signup Section -->
    <section id="signup" class="signup-section">
      <div class="container">
        <div class="row">
          <div class="col-md-10 col-lg-8 mx-auto text-center">

            <h2 class="text-white mb-5">Contact</h2>

          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section bg-black">
      <div class="container">

        <div class="row">

          <div class="col-md-4 mb-3 mb-md-0" >
            <div class="card py-4 h-100" id="adres">
              <div class="card-body text-center">
                <i class="fas fa-map-marked-alt text-primary mb-2"></i>
                <h4 class="text-uppercase m-0">Adres</h4>
                <hr class="my-4">
                <div class="small text-black">Wijngoed Montferland<br/> Munsterweg 4 <br/>7081HJ Gendringen</div>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-3 mb-md-0">
            <div class="card py-4 h-100" id="route">
              <div class="card-body text-center">
                <i class="fas fa-map-marked-alt text-primary mb-2"></i>
                <h4 class="text-uppercase m-0">Route</h4>
                <hr class="my-4">
                <div class="small text-black">Plan je route via <a href="https://goo.gl/maps/rGdNKL5s65Q2" target="_blank">google maps</a>.
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-3 mb-md-0">
            <div class="card py-4 h-100" id="vragen">
              <div class="card-body text-center">
                <i class="fas fa-envelope text-primary mb-2"></i>
                <h4 class="text-uppercase m-0">Email</h4>
                <hr class="my-4">
                <div class="small text-black">Voor alle vragen/opmerkingen, kun je contact opnemen met onze ceremoniemeester via: <a href="mailto:marcoenkelseygaantrouwen@gmail.com">marcoenkelseygaantrouwen@gmail.com</a></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black small text-center text-white-50">
      <div class="container">
        Copyright &copy; Marco en Kelsey 2019
      </div>
    </footer>
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { grayscale } from './grayscale.js'
import 'startbootstrap-grayscale/css/grayscale.min.css'
import SignupForm from './components/SignupForm.vue'

export default {
  name: 'app',

  components: {
    SignupForm
  },

  mixins: [grayscale]
}
</script>

<style scoped>
.projects-section {
    padding: 5rem 0;
}

.masthead {
  background: url("./assets/foto_marco_kelsey.jpg");
  background-position: center;
  height: 720px;
  padding: 0
}

.signup-section {
  background: linear-gradient(to bottom,rgba(22,22,22,.1) 0,rgba(22,22,22,.5) 75%,#161616 100%),url("./assets/verona.jpg");
  background-position: center;
  background-repeat: no-repeat;
  padding: 14rem 0;
  background-size: cover;
}

#adres{
  background: url("./assets/scooter.jpg");
  background-position: center;
  background-size: cover;
  padding:0;
}

#route{
  background: url("./assets/route.jpg");
  background-position: center;
  background-size: cover;
  padding:0;
}

#vragen{
  background: url("./assets/vragen.jpg");
  background-position: center;
  background-size: cover;
  padding:0;
}

</style>
