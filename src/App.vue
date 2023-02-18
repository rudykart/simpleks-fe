<template>

  <Title :title="judul" />

  <div v-if="$route.name == 'login' || $route.name == 'register'">
    <router-view />
  </div>

  <div v-else-if="$route.name != 'login' || $route.name != 'register'">
    <div class="wrapper">
      <!-- Sidebar  -->
      <sideBar />

      <div class="container">

        <!-- Page Content  -->
        <div id="content" class="px-2">
          <div class="d-flex flex-row bd-highlight align-items-center my-1">
            <div class="bd-highlight">
              <button type="button" id="sidebarCollapse" @click="sideBar()" class="btn btn-primary rounded shadow-sm">
                <i class="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor"
                    class="bi bi-text-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </i>
              </button>
            </div>
            <h1 class="bd-highlight ms-2 mt-2"> {{ judul }} </h1>
          </div>
          <!-- Content -->
          <router-view />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import sideBar from '../src/components/Sidebar.vue'
import Title from './components/Title.vue'
// import store from './store'

export default {
  data() {
    return {
      counter: 1,
      judul: this.$route.name,
    }
  },
  components: {
    sideBar,
    Title
  },
  methods: {
    sideBar() {
      this.counter++
      if (this.counter % 2 == 1) {
        $("#sidebar").css("margin-left", "0px")
      } else {
        $("#sidebar").css("margin-left", "-220px")
      }
    },

    bacaJudul() {
      if (this.$route.name == "login") {
        this.judul = 'Login'
      } else if (this.$route.name == "register") {
        this.judul = 'Register'
      } else if (this.$route.name == "bahanbaku.index") {
        this.judul = 'Bahan Baku'
      } else if (this.$route.name == "persediaanbahanbaku.index") {
        this.judul = 'Persediaan Bahan Baku'
      } else if (this.$route.name == "kue.index") {
        this.judul = 'Kue'
      } else if (this.$route.name == "hitung.index") {
        this.judul = 'Hitung'
      }
    },

  },
  mounted() {
    this.bacaJudul()
    // let isAuth = store.getters.isAuth
    // console.log(isAuth)
  },
  watch: {
    '$route.name'() {
      this.bacaJudul()
    },
    // 'store.getters.isAuth'(val) {
    //   if (!val) {

    //     this.$router.replace({ name: 'login' })
    //   }
    // },
  }
}
</script>

<style>
body {
  /* font-family: 'Poppins', sans-serif; */
  /* font-family: 'Agency FB Bold', arial; */
  font-family: sans-serif;
  /* background: #fafafa; */
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

/* ---------------------------------------------------
      SIDEBAR STYLE
  ----------------------------------------------------- */

.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
}


#sidebar {
  min-width: 220px;
  max-width: 220px;
  color: rgb(0, 0, 0);
  transition: all 0.3s;
  background: #f3f2f2;
}

#sidebar.active {
  margin-left: -220px;
}

#sidebar .nav-link.active {
  /* font-weight: bold; */
  color: #0d6efd;
  font-weight: bold;
  /* color: #fb8c00; */
}

#sidebar a.nav-link:hover {
  color: #0d6efd;
}

#sidebar a.nav-link {
  /* color: #007bff; */
  color: #000000;
}

a[data-toggle='collapse'] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

/* ---------------------------------------------------
      CONTENT STYLE
  ----------------------------------------------------- */

#content {
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s;
}
</style>