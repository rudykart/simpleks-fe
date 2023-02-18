<template>
    <div class="modal fade" id="destroyBahanBaku" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Hapus Bahan Baku</h1>
                    <button type="button" class="btn-close" @click="destroyOpenCloseFun()" aria-label="Close"></button>
                </div>
                <div class="my-5" v-if="loading">
                    <div class="d-flex justify-content-center mt-2">
                        <div class="row align-items-center">
                            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                    <h4 class="text-center mt-2">Loading...</h4>
                </div>
                <form v-if="!loading" @submit.prevent="_destroyDataBahanBaku">
                    <div class="modal-body">
                        <div class="my-2">
                            <span>
                                Kamu yakin mau hapus data <strong>{{ bahanBaku.nama_bb }}</strong> ?
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="destroyOpenCloseFun()" class="btn btn-secondary"
                            data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" :disabled="loadingDestroy">
                            <div v-if="loadingDestroy">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading
                            </div>
                            <div v-if="!loadingDestroy">
                                Hapus
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex";

export default {
    name: 'Destroy',
    props: {
        data: Array,
        loading: Boolean,
    },
    data() {
        return {
            bahanBaku: {
                id: '',
                nama_bb: '',
                user_id: '',
            },
            loadingDestroy: false
        }
    },
    computed: {
        ...mapState('bahanBaku', ['bahanBakus'])
    },
    methods: {
        ...mapActions('bahanBaku', ['destroyDataBahanBaku']),
        _resetForm() {
            this.bahanBaku = {
                id: '',
                nama_bb: '',
                user_id: '',
            }
        },
        destroyOpenCloseFun() {
            this._resetForm()
            $('#destroyBahanBaku').modal('hide');
        },
        setDataBahanBaku() {
            this.bahanBaku = this.data
        },
        async _destroyDataBahanBaku() {
            this.loadingDestroy = true
            try {
                await this.destroyDataBahanBaku(this.bahanBaku.id)
                this.destroyOpenCloseFun()
                this.$emit('dataDestroyed')
                this._resetForm()
                this.loadingDestroy = false
            } catch (e) {
                console.log(e)
                this.validation = e.response.data.errors
                this.loadingDestroy = false
            }
        },
    },

    created() {
        this.setDataBahanBaku()
    },

    updated() {
        this.setDataBahanBaku()
    },
}
</script>