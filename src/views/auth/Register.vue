<template>
    <div class="register" style="background: #f3f2f2;">
        <div class="d-flex justify-content-center" style="height: 100vh">
            <div class="row align-items-center">
                <div class="container">
                    <div class="card m-3 shadow-sm" style="min-width: 450px;">
                        <div class="card-header">
                            <h3 class="text-center mt-1">Register</h3>
                        </div>
                        <div class="card-body ">
                            <form @submit.prevent="_storeRegister()">
                                <div class="mb-1">
                                    <label for="name" class="form-label float-star">Name</label>
                                    <input type="text" class="form-control form-control-sm" v-model="user.name">
                                    <!-- <div v-if="validation.name" class="text-danger mt-2">
                               Name
                            </div> -->
                                </div>

                                <div class="mb-1">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="text" class="form-control form-control-sm" id="email"
                                        v-model="user.email">
                                    <!-- <div v-if="validation.email" class="text-danger mt-2">
                               Masukkan email
                            </div> -->
                                </div>

                                <div class="mb-1">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control form-control-sm" id="password"
                                        v-model="user.password">
                                    <!-- <div v-if="validation.password" class="text-danger mt-2">
                               Masukkan password
                            </div> -->
                                </div>

                                <div class="mb-3">
                                    <label for="konfirmasi_password" class="form-label">Konfirmasi Password</label>
                                    <input type="password" class="form-control form-control-sm" id="konfirmasi_password"
                                        v-model="user.konfirmasi_password">
                                    <!-- <div v-if="validation.konfirmasi_password" class="text-danger mt-2">
                               Masukkan password
                            </div> -->
                                </div>

                                <!-- <div class="mb-1"> -->
                                <p class="text-center">Sudah mempunyai akun ?<br> Klik <router-link
                                        :to="{ name: 'login' }" class="">disini</router-link></p>
                                <!-- </div> -->

                                <div class="d-flex justify-content-center mb-2">
                                    <button type="submit" style="width: 100px;"
                                        class="float-end btn btn-sm btn-primary">Register</button>
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
// export default {
//    data() {
//       return {
//          user: {
//             name: '',
//             email: '',
//             password: '',
//             konfirmasi_password: ''
//          }
//       };
//    },
//    methods: {
//       storeRegister: function () {
//          let data = {
//             name: this.name,
//             email: this.email,
//             password: this.password,
//          };
//          this.$store
//             .dispatch("register", data)
//             .then(response => {
//                console.log(response)
//                this.$router.push({
//                   name: 'Login'
//                })
//             }).catch(error => {
//                console.log(error.response.data.errors)
//                this.errors = error.response.data.errors
//             })
//       }
//    }
// };


import { mapGetters, mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                konfirmasi_password: ''
            }
        }
    },
    computed: {
        ...mapGetters(['isAuth'])
    }, methods: {
        ...mapActions('user', ['storeRegister']),
        _resetForm() {
            this.user = {
                name: '',
                email: '',
                password: '',
                konfirmasi_password: ''
            }
        },
        async _storeRegister() {
            try {
                await this.storeRegister(this.user)
            } catch (e) {
                alert(e)
            }
        }

    },
    created() {
        if (this.isAuth) {
            // this.$router.push({ name: 'bahanbaku' })
            // this.$router.replace({ name: 'bahanbaku.index' })
            this.$router.push({ name: 'bahanbaku.index' })
        }
    }
}

</script>