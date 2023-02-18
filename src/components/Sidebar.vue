<template>
    <nav id="sidebar" class="border shadow-sm">
        <div class="sid">
            <div class="sidebar-header mt-4 border-bottom" style="width: 220px;">
                <h3 class="ms-3">Simplesk-App</h3>
                <div class="d-flex align-items-center ms-2 my-3">
                    <div class="bd-highlight mx-2">
                        <img src="../../public/user.png" class="border border-secondary"
                            style="border-radius: 50%; width: 40px;">
                    </div>
                    <div class="bd-highlight">
                        <span style="font-size: 11pt;">{{ user.name }} </span>
                        <br>
                        <span style="font-size: 11pt;"> {{ user.email }} </span>
                    </div>
                </div>
            </div>
            <div class="ms-2">
                <ul class="list-unstyled">
                    <li class="nav-item mt-3 mb-2 ms-2">
                        <span class="fs-6">
                            <router-link :to="{ name: 'bahanbaku.index' }"
                                :class="[$route.name == 'bahanbaku.index' ? 'nav-link active' : 'nav-link']">Bahan
                                Baku</router-link>
                        </span>
                    </li>
                    <li class="nav-item mb-2 ms-2">
                        <span class="fs-6">
                            <router-link :to="{ name: 'persediaanbahanbaku.index' }"
                                :class="[$route.name == 'persediaanbahanbaku.index' ? 'nav-link active' : 'nav-link']">Persediaan
                                Bahan
                                Baku</router-link>
                        </span>
                    </li>
                    <li class="nav-item mb-2 ms-2">
                        <span class="fs-6">
                            <router-link :to="{ name: 'kue.index' }"
                                :class="[$route.name == 'kue.index' ? 'nav-link active' : 'nav-link']">
                                Kue</router-link>
                        </span>
                    </li>
                    <li class="nav-item mb-2 ms-2">
                        <span class="fs-6">
                            <router-link :to="{ name: 'hitung.index' }"
                                :class="[$route.name == 'hitung.index' ? 'nav-link active' : 'nav-link']">
                                Hitung</router-link>
                        </span>
                    </li>
                    <li class="nav-item mb-2 ms-2">
                        <a type="button" class="nav-link fs-6" @click="keluar()">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>



<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            user: {},
        }
    },
    methods: {
        ...mapActions('auth', ['logout', 'getUser']),
        async _logout() {
            try {
                await this.logout()
            } catch (e) {
                console.error(e)
            }
        },
        async _getUser() {
            try {
                let dataUser = await this.getUser()
                this.user = dataUser.data.data
            } catch (e) {
                console.error(e)
            }
        },
        keluar() {
            this._logout();
            localStorage.removeItem('access_token')
            location.reload()
        }
    },
    created() {
        this._getUser()
    }
}

</script>