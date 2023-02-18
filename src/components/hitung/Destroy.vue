<template>
    <div class="modal fade" id="destroyHitung" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Hapus Data Perhitungan</h1>
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

                <form v-if="!loading" @submit.prevent="_destroyDataHitung">
                    <div class="modal-body">
                        <div class="mb-2">
                            <label for="" class="form-label">Keterangan Hitung</label>
                            <input v-model="data.keterangan_hitung" type="text" disabled
                                :class="[validation.keterangan_hitung ? 'form-control is-invalid' : 'form-control']">
                            <span v-if="validation.keterangan_hitung" class="form-text text-danger">
                                {{ validation.keterangan_hitung[0] }}
                            </span>
                        </div>

                        <div class="mb-2">
                            <label for="" class="form-label">Persediaan Bahan Baku</label>
                            <div class="form-group">
                                <div class="input-group">

                                    <select v-model="data.persediaan_bahan_baku_id" disabled
                                        :class="[validation.persediaan_bahan_baku_id ? 'rounded form-control is-invalid' : 'rounded form-control']">
                                        <option v-for="(persediaanBahanBaku, index) in persediaanBahanBakus"
                                            v-bind:value="persediaanBahanBaku.id">
                                            {{ persediaanBahanBaku.keterangan_pbb }}
                                        </option>
                                    </select>
                                    <button type="button" class="col-form-label btn btn-info ms-3 rounded"
                                        data-bs-toggle="collapse" data-bs-target="#collapseExample"
                                        aria-expanded="false" aria-controls="collapseExample">
                                        <span class="ms-1" style="color: white;">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 20 20">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                <path
                                                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <span v-if="validation.persediaan_bahan_baku_id" class="form-text text-danger">
                                {{ validation.persediaan_bahan_baku_id[0] }}
                            </span>
                        </div>

                        <div class="mb-2">
                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">
                                    <!-- {{ data.persediaanBahanBaku }} -->
                                    <!-- <table v-if="data.persediaanBahanBaku['stokBahanBakus']" -->
                                    <table v-if="data.persediaanBahanBaku" class="table table-sm table-hover mt-1">
                                        <thead>
                                            <tr>
                                                <th scope="col" width="65px" class="text-center">#</th>
                                                <th scope="col">Stok Bahan Baku</th>
                                                <th scope="col" width="140px" class="text-center">Jumlah</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(stok, index) in data.persediaanBahanBaku.stokBahanBakus">
                                                <th valign="middle" scope="row" class="text-center">{{ index + 1 }}</th>
                                                <td valign="middle">{{ stok.nama_bb }}</td>
                                                <td valign="middle" class="text-center">{{ stok.stok_bb }} g</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="row" style="margin-bottom: -20px;">
                            <div class="col"><label class="form-label">Kue</label></div>
                        </div>
                        <div v-for="(dataHitung, index) in data.dataHitungs" :key="dataHitung">
                            <div class="row" style="margin-top: 18px;">
                                <div class="form-group">
                                    <div class="input-group">
                                        <!-- <select v-model="dataHitung.kue_id" disabled
                                            :class="[validation['dataHitungs.' + index + '.kue_id'] ? 'rounded form-control is-invalid' : 'rounded form-control']">
                                            <option v-for="(kue, index) in kues" v-bind:value="kue.id">
                                                {{ kue.nama_kue }}
                                            </option>
                                        </select> -->
                                        <input v-model="dataHitung.kue.nama_kue" type="text" disabled
                                            class="rounded form-control">


                                        <button type="button" class="col-form-label btn btn-info mx-3 rounded"
                                            data-bs-toggle="collapse" :data-bs-target="['#detailKue' + index]"
                                            aria-expanded="false" aria-controls="detailKue" @click="detailKue(index)">
                                            <span class="ms-1" style="color: white;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 20 20">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                    <path
                                                        d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                                </svg>
                                            </span>
                                        </button>

                                        <button type="button" class="col-form-label btn btn-danger rounded" disabled>
                                            <span class="ms-1" style="color: white;">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 20 20">
                                                    <path
                                                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                </svg>
                                            </span>
                                        </button>

                                    </div>
                                </div>
                                <span v-if="validation['dataHitungs.' + index + '.kue_id']"
                                    class="form-text text-danger">
                                    {{ validation['dataHitungs.' + index + '.kue_id'][0] }}
                                </span>
                            </div>

                            <div class="mt-2">
                                <div class="collapse" :id="['detailKue' + index]">
                                    <div class="card card-body">
                                        <table class="table table-sm table-hover mt-1">
                                            <thead>
                                                <tr>
                                                    <th scope="col" width="65px" class="text-center">#</th>
                                                    <th scope="col">Komposisi Kue</th>
                                                    <th scope="col" width="140px" class="text-center">Jumlah</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(komp, index) in dataHitung.kue['komposisiKues']">
                                                    <th valign="middle" scope="row" class="text-center">{{ index + 1 }}
                                                    </th>
                                                    <td valign="middle">{{ komp.nama_bb }}</td>
                                                    <td valign="middle" class="text-center">{{ komp.jumlah_bb }} g</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer border-top">
                        <!-- <button type="button" @click="add" class="btn btn-success float-start my-3 ms-3"
                            :disabled="loadingDestroy">
                            + Bahan Baku
                        </button> -->
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
        persediaanBahanBakus: Object,
        // kues: Object,
    },
    data() {
        return {
            dataSimpleks: {},
            validation: {},
            dataGanda: null,
            loadingDestroy: false,
            pbb: {}
        }
    },
    computed: {
        ...mapState(['data']),
    },
    methods: {
        ...mapActions('hitung', ['getDataHasilHitung', 'destroyDataHitung']),
        async _getDataHasilHitung() {
            this.loadingDestroy = true
            console.log(this.data)
            try {
                let hasil = await this.getDataHasilHitung(this.data)
                this.dataSimpleks = hasil.data
                this.loadingDestroy = false
            } catch (e) {
                this.loadingDestroy = false
                console.error(e)
            }
        },
        async _destroyDataHitung() {
            console.log(this.data)
            this.loadingDestroy = true
            try {
                this.data.destroyDataHitungs = this.destroyDataHitungs
                await this.destroyDataHitung(this.data)
                this.destroyOpenCloseFun()
                this.$emit('dataDestroyed')
                this.loadingDestroy = false
            } catch (e) {
                if (e.response.data.errors) {
                    this.loadingDestroy = false
                    this.validation = e.response.data.errors
                    this.dataGanda = null
                } else if (e.response.data.data_ganda) {
                    this.loadingDestroy = false
                    this.dataGanda = e.response.data.data_ganda
                    this.validation = {}
                }
                this.loadingDestroy = false
            }
        },
        _resetForm() {
            this.data = {
                keterangan_hitung: '',
                persediaan_bahan_baku_id: '',
                dataHitungs: [
                    { kue_id: '' },
                ],
            },
                this.destroyDataHitungs = {},
                this.validation = {},
                this.dataGanda = null
        },
        detailKue(index) {
            $('#detailKue' + index).collapse("toggle");
        },
        destroyOpenCloseFun() {
            $('#destroyHitung').modal('hide');
        },
    },
    mounted() {
        // // 'data.persediaan_bahan_baku_id'(val) {
        // this.persediaanBahanBakus.forEach(element => {
        //     if (element.id == this.data.persediaan_bahan_baku_id) {
        //         this.data.persediaan_bahan_baku = element
        //     }
        // });
        // // },

        // this.pbb = this.data.persediaanBahanBaku
    },
    watch: {
        // 'data.persediaan_bahan_baku_id'(val) {
        //     this.persediaanBahanBakus.forEach(element => {
        //         if (element.id == val) {
        //             this.data.persediaan_bahan_baku = element
        //         }
        //     });
        // },

        // 'data.dataHitungs': {
        //     handler(val) {
        //         for (let i = 0; i < val.length; i++) {
        //             this.kues.forEach(kue => {
        //                 if (kue.id == val[i].kue_id) {
        //                     val[i].kue = kue
        //                 }
        //             });
        //         }
        //     },
        //     deep: true
        // }
    }
}

</script>