<template>
   <div class="modal fade" id="createHitung" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h1 class="modal-title fs-5" id="staticBackdropLabel">Tambah Data Perhitungan</h1>
               <button type="button" @click="createOpenCloseFun()" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
            </div>
            <form @submit.prevent="_createDataHitung">
               <div class="modal-body">
                  <div class="mb-2">
                     <label for="" class="form-label">Keterangan Hitung</label>
                     <input v-model="data.keterangan_hitung" type="text"
                        :class="[validation.keterangan_hitung ? 'form-control is-invalid' : 'form-control']">
                     <span v-if="validation.keterangan_hitung" class="form-text text-danger">
                        {{ validation.keterangan_hitung[0] }}
                     </span>
                  </div>

                  <div class="mb-2">
                     <label for="" class="form-label">Persediaan Bahan Baku</label>
                     <div class="form-group">
                        <div class="input-group">
                           <select v-model="data.persediaan_bahan_baku_id"
                              :class="[validation.persediaan_bahan_baku_id ? 'rounded form-control is-invalid' : 'rounded form-control']">
                              <option v-for="(persediaanBahanBaku, index) in persediaanBahanBakus"
                                 v-bind:value="persediaanBahanBaku.id">
                                 {{ persediaanBahanBaku.keterangan_pbb }}
                              </option>
                           </select>
                           <button type="button" class="col-form-label btn btn-info ms-3 rounded" data-bs-toggle="collapse"
                              data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                              <span class="ms-1" style="color: white;">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                    class="bi bi-eye-fill" viewBox="0 0 20 20">
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
                           <!-- <h1>{{ data.persediaan_bahan_baku }}</h1> -->
                           <table v-if="data.persediaan_bahan_baku != null" class="table table-sm table-hover mt-1">
                              <thead>
                                 <tr>
                                    <th scope="col" width="65px" class="text-center">#</th>
                                    <th scope="col">Stok Bahan Baku</th>
                                    <th scope="col" width="140px" class="text-center">Jumlah</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr v-for="(stok, index) in data.persediaan_bahan_baku.stokBahanBakus">
                                    <th valign="middle" scope="row" class="text-center">{{ index + 1 }}</th>
                                    <td valign="middle">{{ stok.nama_bb }}</td>
                                    <td valign="middle" class="text-center">{{ stok.stok_bb }} g</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>

                  <div v-if="dataGanda != null" class="alert alert-danger alert-dismissible fade show" role="alert"
                     style="margin-bottom: 10px; margin-top: 17px;">
                     Oops, Bahan baku tidak boleh <strong>sama !</strong>
                     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                  <div class="row" style="margin-bottom: -20px;">
                     <div class="col"><label class="form-label">Kue</label></div>
                  </div>
                  <div v-for="(dataHitung, index) in data.dataHitungs" :key="dataHitung">
                     <div class="row" style="margin-top: 18px;">
                        <div class="form-group">
                           <div class="input-group">
                              <select v-model="dataHitung.kue_id"
                                 :class="[validation['dataHitungs.' + index + '.kue_id'] ? 'rounded form-control is-invalid' : 'rounded form-control']">
                                 <option v-for="(kue, index) in kues" v-bind:value="kue.id">
                                    {{ kue.nama_kue }}
                                 </option>
                              </select>
                              <button type="button" class="col-form-label btn btn-info mx-3 rounded"
                                 data-bs-toggle="collapse" :data-bs-target="['#detailKue' + index]" aria-expanded="false"
                                 aria-controls="detailKue" @click="detailKue(index)">
                                 <span class="ms-1" style="color: white;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                       class="bi bi-eye-fill" viewBox="0 0 20 20">
                                       <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                       <path
                                          d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg>
                                 </span>
                              </button>

                              <button type="button" class="col-form-label btn btn-danger rounded"
                                 v-if="data.dataHitungs.length == 1" disabled>
                                 <span class="ms-1" style="color: white;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                       class="bi bi-trash3-fill" viewBox="0 0 20 20">
                                       <path
                                          d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                 </span>
                              </button>
                              <button type="button" class="col-form-label btn btn-danger rounded" v-else
                                 @click="remove(komposisiKue, index)">
                                 <span class="ms-1" style="color: white;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                       class="bi bi-trash3-fill" viewBox="0 0 20 20">
                                       <path
                                          d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                 </span>
                              </button>
                           </div>
                        </div>
                        <span v-if="validation['dataHitungs.' + index + '.kue_id']" class="form-text text-danger">
                           {{ validation['dataHitungs.' + index + '.kue_id'][0] }}
                        </span>
                     </div>

                     <div class="mt-2">
                        <div class="collapse" :id="['detailKue' + index]">
                           <div class="card card-body">
                              <!-- {{ data.dataHitungs[index].kue }} -->
                              <!-- <template v-if="dataHitung.kue != null"> -->
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
                                       <th valign="middle" scope="row" class="text-center">{{ index + 1 }}</th>
                                       <td valign="middle">{{ komp.nama_bb }}</td>
                                       <td valign="middle" class="text-center">{{ komp.jumlah_bb }} g</td>
                                    </tr>
                                 </tbody>
                              </table>
                              <!-- </template> -->
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="footer border-top">
                  <button type="button" @click="add" class="btn btn-success float-start my-3 ms-3" :disabled="loading">
                     + Kue
                  </button>
                  <button type="button" @click="_getDataHasilHitung()" class="btn btn-info float-start my-3 ms-2"
                     data-bs-target="#createHasilHitung" data-bs-toggle="modal">
                     <span style="color: white;">
                        Hitung
                     </span>
                  </button>
                  <button type="submit" class="btn btn-primary my-3 float-end ms-2 me-3" :disabled="loading">
                     <div v-if="loading">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading
                     </div>
                     <div v-if="!loading">
                        Simpan
                     </div>
                  </button>
                  <button type="button" @click="createOpenCloseFun()" data-bs-dismiss="modal"
                     class="btn btn-secondary my-3 float-end ">Cancel</button>
               </div>
            </form>
         </div>
      </div>
   </div>
   <createHasilHitung :data="dataSimpleks" :loading="loading" />
</template>



<script>
import { mapState, mapActions } from "vuex";
import createHasilHitung from './CreateHitung.vue'

export default {
   components: {
      createHasilHitung,
   },
   props: {
      persediaanBahanBakus: Object,
      kues: Object,
   },
   data() {
      return {
         data: {
            keterangan_hitung: '',
            persediaan_bahan_baku_id: '',
            persediaan_bahan_baku: {},
            dataHitungs: [
               { kue_id: '', kue: {} },
            ],
         },
         dataSimpleks: {},
         validation: {},
         dataGanda: null,
         loading: false,
      }
   },
   computed: {
      ...mapState(['data']),
   },
   methods: {
      ...mapActions('hitung', ['createDataHitung', 'getDataHasilHitung']),
      _resetForm() {
         this.data = {
            keterangan_hitung: '',
            persediaan_bahan_baku_id: '',
            dataHitungs: [
               { kue_id: '', kue: {} },
            ],
         }, this.dataSimpleks = {},
            this.validation = {},
            this.dataGanda = null
      },
      detailKue(index) {
         $('#detailKue' + index).collapse("toggle");
      },
      createOpenCloseFun() {
         this._resetForm()
         $('#createHitung').modal('hide');
      },
      async _getDataHasilHitung() {
         this.loading = true
         this.dataSimpleks = {},
            console.log(this.data)
         try {
            let hasil = await this.getDataHasilHitung(this.data)
            this.dataSimpleks = hasil.data
            this.loading = false
         } catch (e) {
            this.loading = false
            console.error(e)
         }
      },
      async _createDataHitung() {
         console.log(this.data)
         try {
            this.loading = true
            await this.createDataHitung(this.data)
            this.$emit('dataCreated')
            this.createOpenCloseFun()
            this.loading = false
         } catch (e) {
            console.error(e)
            if (e.response.data.errors) {
               this.validation = e.response.data.errors
               this.dataGanda = null
               this.loading = false
            } else if (e.response.data.data_ganda) {
               this.dataGanda = e.response.data.data_ganda
               this.validation = {}
               this.loading = false
            }
            console.log(this.validation)
            this.loading = false
         }
      },
      add() {
         this.data.dataHitungs.push({ kue_id: null, kue: {} })
      },
      remove(dataHitung, index) {
         this.data.dataHitungs.splice(index, 1)
      },
   },
   watch: {
      'data.persediaan_bahan_baku_id'(val) {
         this.persediaanBahanBakus.forEach(element => {
            if (element.id == val) {
               this.data.persediaan_bahan_baku = element
            }
         });
      },

      'data.dataHitungs': {
         handler(val) {
            for (let i = 0; i < val.length; i++) {
               this.kues.forEach(kue => {
                  if (kue.id == val[i].kue_id) {
                     val[i].kue = kue
                  }
               });
            }
         },
         deep: true
      }
   }
}

</script>