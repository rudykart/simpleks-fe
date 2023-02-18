<template>
   <loader v-if="loading" />
   <div class="login" style="background: #f3f2f2;">
      <div class="d-flex justify-content-center" style="height: 100vh">
         <div class="row align-items-center">
            <div class="container">
               <div class="card m-3 shadow-sm" style="min-width: 450px;">
                  <div class="card-header">
                     <h1 class="text-center mt-1">Login</h1>
                  </div>
                  <div class="card-body ">
                     <form @submit.prevent="_login">
                        <div class="mb-3">
                           <label for="email" class="form-label">Email</label>
                           <input type="email" class="form-control form-control-sm" name="email" id="email"
                              v-model="form.email">
                           <div v-if="validation.email" class="text-danger mt-2">
                              {{ validation.email[0] }}
                           </div>
                        </div>

                        <div class="mb-3">
                           <label for="password" class="form-label">Password</label>
                           <input type="password" class="form-control form-control-sm" name="password" id="password"
                              v-model="form.password">
                           <div v-if="validation.password" class="text-danger mt-2">
                              {{ validation.password[0] }}
                           </div>
                        </div>

                        <div class="mb-3">
                           <p class="text-center">Belum mempunyai akun ?<br> Klik <router-link :to="{ name: 'register' }"
                                 class="">disini</router-link></p>
                        </div>

                        <div class="d-flex justify-content-center mb-2">
                           <button type="submit" style="width: 100px;"
                              class="float-end btn btn-sm btn-primary">Login</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>

   </div>
</template>
 
<script>
import { mapGetters, mapActions } from "vuex"

import loader from '../../components/Loader.vue'

export default {
   components: {
      loader,
   },
   data: () => ({
      form: {
         email: '',
         password: ''
      },
      validation: {
         email: '',
         password: ''
      },
      loading: false
   }),
   computed: {
      ...mapGetters(['isAuth']),
   },
   methods: {
      ...mapActions('auth', ['login']),
      async _login() {
         this.loading = true
         try {
            await this.login(this.form)
            this.$router.replace({ name: 'bahanbaku.index' })
            this.loading = false
         } catch (e) {
            this.validation = e.response.data.errors
            this.loading = false
         }
      },
   },
   created() {
      if (this.isAuth) {
         this.$router.push({ name: 'bahanbaku.index' })
      }
   }
}

</script>