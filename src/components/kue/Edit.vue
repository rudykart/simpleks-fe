<template>
    <div class="modal fade" id="editKue" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <!-- <loader v-if="loading" /> -->
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit Kue</h1>
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
                <form v-if="!loading" @submit.prevent="_updateDataKue">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <div class="mb-2">
                                    <label for="" class="form-label">Nama Kue</label>
                                    <input v-model="data.nama_kue" type="text"
                                        :class="[validation.nama_kue ? 'form-control is-invalid' : 'form-control']">
                                    <span v-if="validation.nama_kue" class="form-text text-danger">
                                        {{ validation.nama_kue[0] }}
                                    </span>
                                </div>
                            </div>
                            <div class="col">
                                <label for="" class="form-label">Keuntungan</label>
                                <div class="form-group row">
                                    <div class="input-group mb-2">
                                        <div class="input-group">
                                            <span class="input-group-text"
                                                style="border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
                                                Rp
                                            </span>
                                            <input type="text"
                                                :class="[validation.keuntungan_kue ? 'form-control is-invalid' : 'form-control']"
                                                v-model="data.keuntungan_kue">
                                        </div>
                                    </div>
                                </div>
                                <div v-if="validation.keuntungan_kue" style="margin-top: -7px;"
                                    class="form-text text-danger">
                                    {{ validation.keuntungan_kue[0] }}
                                </div>
                            </div>
                        </div>
                        <div v-if="dataGanda != null" class="alert alert-danger alert-dismissible fade show"
                            role="alert" style="margin-bottom: 10px; margin-top: 17px;">
                            Oops, Bahan baku tidak boleh <strong>sama !</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        <div class="row" style="margin-bottom: -9px;">
                            <div class="col"><label class="form-label">Bahan Baku</label></div>
                            <div class="col"><label class="form-label">Jumlah</label></div>
                        </div>
                        <div v-for="(komposisiKue, index) in data.komposisiKues" :key="komposisiKue">
                            <div class="row">
                                <div class="col">
                                    <div class="my-2">
                                        <select v-model="komposisiKue.bahan_baku_id"
                                            :class="[validation['komposisiKues.' + index + '.bahan_baku_id'] ? 'form-control is-invalid' : 'form-control']">
                                            <option v-for="(bahanBaku, index) in bahanBakus"
                                                v-bind:value="bahanBaku.id">
                                                {{ bahanBaku.nama_bb }}
                                            </option>
                                        </select>
                                    </div>
                                    <div v-if="validation['komposisiKues.' + index + '.bahan_baku_id']"
                                        style="margin-top: -7px;" class="form-text text-danger">
                                        {{ validation['komposisiKues.' + index + '.bahan_baku_id'][0] }}
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group row my-2">
                                        <div class="input-group ">
                                            <div class="input-group">
                                                <input v-model="komposisiKue.jumlah_bb" type="text" name=""
                                                    :class="[validation['komposisiKues.' + index + '.jumlah_bb'] ? 'form-control is-invalid' : 'form-control']">
                                                <span class="input-group-text"
                                                    style="border-top-right-radius: 4px; border-bottom-right-radius: 4px;">
                                                    g
                                                </span>

                                                <button v-if="data.komposisiKues.length == 1" type="button" disabled
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
                                                <button v-else type="button" @click="remove(komposisiKue, index)"
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
                                    <div v-if="validation['komposisiKues.' + index + '.jumlah_bb']"
                                        style="margin-top: -7px;" class="form-text text-danger">
                                        {{ validation['komposisiKues.' + index + '.jumlah_bb'][0] }}
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
            destroyKomposisiKues: [],
        }
    },
    // computed: {
    //     ...mapState('bahanBaku', ['bahanBakus']),
    // },
    methods: {
        // ...mapActions('bahanBaku', ['fetchDropdownBahanBakus']),
        ...mapActions('kue', ['updateDataKue']),
        _resetForm() {
            this.validation = {}
            this.dataGanda = null
        },
        updateOpenCloseFun() {
            $('#editKue').modal('hide');
            this._resetForm()
            this.destroyKomposisiKues = []
        },
        // async _fetchDropdownBahanBakus() {
        //     try {
        //         let data = await this.fetchDropdownBahanBakus()
        //         this.dataBahanBakus = data.data
        //         window.scrollTo(0, 0);
        //     } catch (e) {
        //         console.error(e)
        //     }
        // },
        async _updateDataKue() {
            console.log(this.data)
            this.loadingUpdate = true
            try {
                this.data.destroyKomposisiKues = this.destroyKomposisiKues
                await this.updateDataKue(this.data)
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
            this.data.komposisiKues.push({ id: null, bahan_baku_id: null, jumlah_bb: null })
        },

        remove(komposisiKue, index) {
            this.data.komposisiKues.splice(index, 1)
            if (komposisiKue.id) {
                this.destroyKomposisiKues.push({ id: komposisiKue.id })
                console.log(this.destroyKomposisiKues)
            }
        },
    },
    // created() {
    //     this._fetchDropdownBahanBakus()
    // },
}

</script>