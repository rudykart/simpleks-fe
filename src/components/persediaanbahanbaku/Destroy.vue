<template>
    <div class="modal fade" id="destroyPersediaanBahanBaku" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <!-- <loader v-if="loading" /> -->
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Hapus Persediaan Bahan Baku</h1>
                    <button type="button" @click="destroyOpenCloseFun()" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
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


                <form v-if="!loading" @submit.prevent="_destroyDataPersediaanBahanBaku">
                    <div class="modal-body">
                        <div class="mb-2">
                            <label for="" class="form-label">Keterangan Persediaan Bahan Baku</label>
                            <input v-model="data.keterangan_pbb" type="text" disabled
                                class="form-control">
                        </div>
                        <div class="row" style="margin-bottom: -9px;">
                            <div class="col"><label class="form-label">Bahan Baku</label></div>
                            <div class="col"><label class="form-label">Stok</label></div>
                        </div>
                        <div v-for="(stokBahanBaku, index) in data.stokBahanBakus" :key="stokBahanBaku">
                            <div class="row">
                                <div class="col">
                                    <div class="my-2">
                                        <input v-model="stokBahanBaku.nama_bb" type="text" disabled
                                            class="form-control">
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group row my-2">
                                        <div class="input-group ">
                                            <div class="input-group">
                                                <input v-model="stokBahanBaku.stok_bb" type="text" disabled
                                                    class="form-control">
                                                <span class="input-group-text"
                                                    style="border-top-right-radius: 4px; border-bottom-right-radius: 4px;">
                                                    g
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="footer border-top">
                        <button type="submit" class="btn btn-danger my-3 float-end ms-2 me-3">
                            <div v-if="loadingDestroy">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading
                            </div>
                            <div v-if="!loadingDestroy">
                                Hapus
                            </div>
                        </button>
                        <button type="button" @click="destroyOpenCloseFun()" data-bs-dismiss="modal"
                            class="btn btn-secondary my-3 float-end ">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>



<script>
import { mapState, mapActions } from "vuex";
import loader from '../Loader.vue'

export default {
    components: {
        loader,
    },
    props: {
        data: Array,
        loading: Boolean,
    },
    data() {
        return {
            loadingDestroy: false,
        }
    },
    methods: {
        ...mapActions('persediaanBahanBaku', ['destroyDataPersediaanBahanBaku']),
        _resetForm() {
            this.validation = {}
            this.dataGanda = null
        },
        destroyOpenCloseFun() {
            $('#destroyPersediaanBahanBaku').modal('hide');
            this._resetForm()
            this.destroyStokBahanBaku = []
        },
        async _destroyDataPersediaanBahanBaku() {
            console.log(this.data)
            this.loadingDestroy = true
            try {
                await this.destroyDataPersediaanBahanBaku(this.data)
                this.destroyOpenCloseFun()
                this.$emit('dataDestroyed')
                this.loadingDestroy = false
            } catch (e) {
                console.error(e)
                this.loadingDestroy = false
            }
        },
    },
}

</script>