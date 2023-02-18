<template>
    <div class="modal fade" id="editPersediaanBahanBaku" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <!-- <loader v-if="loading" /> -->
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Persediaan Bahan Baku</h1>
                    <button type="button" @click="updateOpenCloseFun()" class="btn-close" data-bs-dismiss="modal"
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
                <form v-if="!loading" @submit.prevent="_updateDataPersediaanBahanBaku">
                    <div class="modal-body">
                        <div class="mb-2">
                            <label for="" class="form-label">Keterangan Persediaan Bahan Baku</label>
                            <input v-model="data.keterangan_pbb" type="text"
                                :class="[validation.keterangan_pbb ? 'form-control is-invalid' : 'form-control']">
                            <span v-if="validation.keterangan_pbb" class="form-text text-danger">
                                {{ validation.keterangan_pbb[0] }}
                            </span>
                        </div>
                        <div v-if="dataGanda != null" class="alert alert-danger alert-dismissible fade show"
                            role="alert" style="margin-bottom: 10px; margin-top: 17px;">
                            Oops, Bahan baku tidak boleh <strong>sama !</strong>
                            <button type="button" @click="dataGanda = null" class="btn-close" data-bs-dismiss="alert"
                                aria-label="Close"></button>
                        </div>
                        <div class="row" style="margin-bottom: -9px;">
                            <div class="col"><label class="form-label">Bahan Baku</label></div>
                            <div class="col"><label class="form-label">Stok</label></div>
                        </div>
                        <div v-for="(stokBahanBaku, index) in data.stokBahanBakus" :key="stokBahanBaku">
                            <div class="row">
                                <div class="col">
                                    <div class="my-2">
                                        <select v-model="stokBahanBaku.bahan_baku_id"
                                            :class="[validation['stokBahanBakus.' + index + '.bahan_baku_id'] ? 'form-control is-invalid' : 'form-control']">
                                            <!-- <option v-for="(bahanBaku, index) in dataBahanBakus"
                                                v-bind:value="bahanBaku.id">
                                                {{ bahanBaku.nama_bb }}
                                            </option> -->
                                            <option v-for="(bahanBaku, index) in bahanBakus"
                                                v-bind:value="bahanBaku.id">
                                                {{ bahanBaku.nama_bb }}
                                            </option>
                                        </select>
                                    </div>
                                    <div v-if="validation['stokBahanBakus.' + index + '.bahan_baku_id']"
                                        style="margin-top: -7px;" class="form-text text-danger">
                                        {{ validation['stokBahanBakus.' + index + '.bahan_baku_id'][0] }}
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group row my-2">
                                        <div class="input-group ">
                                            <div class="input-group">
                                                <input v-model="stokBahanBaku.stok_bb" type="text" name=""
                                                    :class="[validation['stokBahanBakus.' + index + '.stok_bb'] ? 'form-control is-invalid' : 'form-control']">
                                                <span class="input-group-text"
                                                    style="border-top-right-radius: 4px; border-bottom-right-radius: 4px;">
                                                    g
                                                </span>

                                                <button v-if="data.stokBahanBakus.length == 1" type="button" disabled
                                                    class="col-form-label btn btn-danger rounded ms-4">
                                                    <span class="ms-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                            fill="currentColor" class="bi bi-trash3-fill"
                                                            viewBox="0 0 20 20">
                                                            <path
                                                                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                        </svg>
                                                    </span>
                                                </button>
                                                <button v-else type="button" @click="remove(stokBahanBaku, index)"
                                                    class="col-form-label btn btn-danger rounded ms-4">
                                                    <span class="ms-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                            fill="currentColor" class="bi bi-trash3-fill"
                                                            viewBox="0 0 20 20">
                                                            <path
                                                                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="validation['stokBahanBakus.' + index + '.stok_bb']"
                                        style="margin-top: -7px;" class="form-text text-danger">
                                        {{ validation['stokBahanBakus.' + index + '.stok_bb'][0] }}
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="footer border-top">
                        <button type="button" @click="add" class="btn btn-success float-start my-3 ms-3"
                            :disabled="loadingUpdate">
                            + Bahan Baku
                        </button>
                        <button type="submit" class="btn btn-primary my-3 float-end ms-2 me-3">
                            <div v-if="loadingUpdate">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading
                            </div>
                            <div v-if="!loadingUpdate">
                                Simpan
                            </div>
                        </button>
                        <button type="button" @click="updateOpenCloseFun()" data-bs-dismiss="modal"
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
        bahanBakus: Object,
    },
    data() {
        return {
            // dataBahanBakus: {},
            validation: {},
            dataGanda: null,
            loadingUpdate: false,
            destroyStokBahanBakus: [],
        }
    },
    computed: {
        // ...mapState('persediaanBahanBaku', ['persediaanBahanBakus']),
        // ...mapState('bahanBaku', ['bahanBakus']),

    },
    methods: {
        ...mapActions('persediaanBahanBaku', ['updateDataPersediaanBahanBaku']),
        // ...mapActions('bahanBaku', ['fetchDropdownBahanBakus']),
        _resetForm() {
            this.validation = {}
            this.destroyStokBahanBakus = []
            this.dataGanda = null
        },
        updateOpenCloseFun() {
            this._resetForm()
            // this.destroyStokBahanBakus = []
            $('#editPersediaanBahanBaku').modal('hide');
        },
        // setDataPersediaanBahanBaku() {
        //     this.loading = true
        //     this.pbb = this.data
        //     this.loading = false
        // },
        // async _fetchDropdownBahanBakus() {
        //     try {
        //         let data = await this.fetchDropdownBahanBakus()
        //         this.dataBahanBakus = data.data
        //         window.scrollTo(0, 0);
        //     } catch (e) {
        //         console.error(e)
        //     }
        // },
        async _updateDataPersediaanBahanBaku() {
            console.log(this.data)
            this.loadingUpdate = true
            try {
                this.data.destroyStokBahanBakus = this.destroyStokBahanBakus
                await this.updateDataPersediaanBahanBaku(this.data)
                this.updateOpenCloseFun()
                this.$emit('dataUpdated')
                this.loadingUpdate = false
            } catch (e) {
                if (e.response.data.errors) {
                    this.loadingUpdate = false
                    this.validation = e.response.data.errors
                    this.dataGanda = null
                } else if (e.response.data.data_ganda) {
                    this.loadingUpdate = false
                    this.dataGanda = e.response.data.data_ganda
                    this.validation = {}
                }
                this.loadingUpdate = false
            }
        },

        add() {
            this.data.stokBahanBakus.push({ id: null, bahan_baku_id: null, stok_bb: null })
        },

        remove(stokBahanBaku, index) {
            // console.log(this.stokBahanBaku)
            this.data.stokBahanBakus.splice(index, 1)
            if (stokBahanBaku.id) {
                // this.data.destroyStokBahanBakus.push({ bahan_baku: null, })
                this.destroyStokBahanBakus.push({ id: stokBahanBaku.id })
                console.log(this.destroyStokBahanBakus)
            }
        },
    },
    // created() {
    //     this._fetchDropdownBahanBakus()
    // },
}

</script>