<template>
   <main>
      <!-- <loader v-if="loading" /> -->
      <div class="d-flex mb-3">
         <div class="input-group input-group-sm">
            <input v-model="cari" type="text" class="form-control form-control-sm rounded" placeholder="Pencarian kue"
               aria-label="Pencarian kue" aria-describedby="button-addon2">
            <template v-if="cari != ''">
               <button @click="cari = ''" type="button" class="btn btn-secondary"
                  style="margin-left: -30px; z-index: 100;">
                  <span style="font-size: 10pt; ">&#10005;</span>
               </button>
            </template>
         </div>
         <div class="ms-3">
            <button type="button" class="btn btn-sm btn-primary" @click="create()">
               Tambah
            </button>
            <createKue :bahanBakus="dataBahanBakus" @data-created="dataCreated" />
            <editKue :bahanBakus="dataBahanBakus" :data="dataKue" :loading="loading" @data-updated="dataUpdated" />
            <destroyKue :data="dataKue" :loading="loading" @data-destroyed="dataDestroyed" />
         </div>
      </div>
      <div class="border rounded p-3">
         <table class="table table-sm table-hover">
            <thead>
               <tr>
                  <th scope="col" width="45px" class="text-center">#</th>
                  <th scope="col">Kue</th>
                  <th scope="col">Kuentungan</th>
                  <th scope="col" width="140px" class="text-center">Aksi</th>
               </tr>
            </thead>
            <tbody>
               <template v-for="(kue, index) in kues.data">
                  <tr>
                     <th valign="middle" scope="row" class="text-center">{{ index + 1 }}</th>
                     <td valign="middle">{{ kue.nama_kue }}</td>
                     <td valign="middle">{{ kue.keuntungan_kue }}</td>
                     <td valign="middle" class="text-center">
                        <!-- <a class="btn btn-info me-2" @click="detail(index)"
                           style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;">
                           <span class="fw-bold" style="color: white;">Detail</span>
                        </a> -->

                        <button type="button" class="btn btn-info me-2" data-bs-toggle="collapse"
                           :data-bs-target="['#detail' + index]"
                           style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;"
                           aria-expanded="false" aria-controls="detail" @click="detail(index)">
                           <span class="fw-bold" style="color: white;">Detail</span>
                        </button>

                        <a class="btn btn-secondary me-2" @click="edit(kue.id)"
                           style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;">
                           <span class="fw-bold">Edit</span>
                        </a>
                        <a class="btn btn-danger" @click="destroy(kue.id)"
                           style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;">
                           <span class="fw-bold">Hapus</span>
                        </a>
                     </td>
                  </tr>
                  <tr class="collapse" :id="['detail' + index]">
                     <td colspan="4">
                        <div class="collapse" :id="['detail' + index]">
                           <div class="row ">
                              <div class="col" style="max-width: 45px;"></div>
                              <div class="col"><strong>Komposisi</strong></div>
                              <div class="col"><strong>Jumlah</strong></div>
                           </div>
                           <div class="row" v-for="(komposisiKue, index2) in kue.komposisiKues">
                              <div class="col" style="max-width: 45px;"></div>
                              <div class="col">{{ komposisiKue.nama_bb }}</div>
                              <div class="col">{{ komposisiKue.jumlah_bb }} g</div>
                           </div>
                        </div>
                     </td>
                  </tr>
               </template>
            </tbody>
         </table>
      </div>
      <div class="d-flex justify-content-center  mt-3" v-if="kues.last_page != 1">
         <nav aria-label="Page navigation example" v-if="typeof kues.data != 'undefined'">
            <ul class="pagination justify-content-center">
               <li v-bind:class="[kues.prev_page_url == null ? 'page-item disabled' : 'page-item']">
                  <button type="button" class="page-link" aria-label="Previous" @click="page -= 1">
                     <span aria-hidden="true">&laquo;</span>
                  </button>
               </li>

               <li v-for="(kue, index) in kues.links"
                  v-bind:class="[kues.current_page == kue.label ? 'page-item active' : 'page-item']">
                  <button type="button" class="page-link" @click="page = kue.label">
                     <span>{{ kue.label }}</span>
                  </button>
               </li>

               <li v-bind:class="[kues.next_page_url == null ? 'page-item disabled' : 'page-item']">
                  <button type="button" class="page-link" aria-label="Next" @click="page += 1">
                     <span aria-hidden="true">&raquo;</span>
                  </button>
               </li>
            </ul>
         </nav>
      </div>
   </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import createKue from '../components/kue/Create.vue'
import editKue from '../components/kue/Edit.vue'
import destroyKue from '../components/kue/Destroy.vue'
import loader from '../components/Loader.vue'
import _ from 'lodash';

export default {
   components: {
      loader,
      createKue,
      editKue,
      destroyKue,
   },
   data() {
      return {
         dataKue: {},
         loading: false,
         cari: "",
         dataBahanBakus: {},
      }
   },
   computed: {
      ...mapState('bahanBaku', ['bahanBakus']),
      ...mapState('kue', ['kues', 'data']),
      page: {
         get() {
            return this.$store.state.kue.page
         },
         set(val) {
            return this.$store.commit('kue/_set_page', val)
         }
      }
   },
   methods: {
      ...mapActions('kue', ['fetchDataKues', 'getDataKue']),
      ...mapActions('bahanBaku', ['fetchDropdownBahanBakus']),
      async _fetchDropdownBahanBakus() {
         try {
            let data = await this.fetchDropdownBahanBakus()
            this.dataBahanBakus = data.data
            window.scrollTo(0, 0);
         } catch (e) {
            alert(e)
         }
      },
      async _fetchDataKues() {
         try {
            await this.fetchDataKues(this.cari)
            window.scrollTo(0, 0);
         } catch (e) {
            alert(e)
         }
      },
      detail(index) {
         console.log($('#detail' + index))

         $('#detail' + index).collapse("toggle");

         // if ($('#detail' + index).collapse('show')) {
         //    $('#detail' + index).collapse('hide');
         // } else {
         //    $('#detail' + index).collapse('show');
         // }
      },
      create() {
         $('#createKue').modal('show');
      },
      dataCreated() {
         this._fetchDataKues()
      },
      async _getDataKue(id) {
         this.loading = true
         try {
            let pbb = await this.getDataKue(id)
            this.dataKue = pbb.data
            // console.log(this.dataKue)
            this.loading = false
         } catch (e) {
            console.error(e)
         }
      },
      edit(id) {
         this._getDataKue(id)
         $('#editKue').modal('show');
      },
      dataUpdated() {
         this._fetchDataKues()
      },
      destroy(id) {
         this._getDataKue(id)
         $('#destroyKue').modal('show');
      },
      dataDestroyed() {
         this._fetchDataKues()
      },
   },
   created() {
      this._fetchDataKues()
      this._fetchDropdownBahanBakus()
   },
   watch: {
      page() {
         this._fetchDataKues()
      },
      cari: _.debounce(function (value) {
         this._fetchDataKues()
      }, 500)
   }
}
</script>
