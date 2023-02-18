<template>
   <main>
      <div class="d-flex mb-3">
         <div class="input-group input-group-sm">
            <input v-model="cari" type="text" class="form-control form-control-sm rounded"
               placeholder="Pencarian bahan baku" aria-label="Pencarian bahan baku" aria-describedby="button-addon2">
            <template v-if="cari != ''">
               <button @click="cari = ''" type="button" class="btn btn-secondary"
                  style="margin-left: -30px; z-index: 100;">
                  <span style="font-size: 10pt; ">&#10005;</span>
               </button>
            </template>
         </div>


         <!--     <div class="input-group input-group-sm rounded shadow-sm" style="max-width: 500px;height: 25pt;">
            <input wire:model='cari' type="text" class="form-control rounded" placeholder="Cari sesuatu..."
                aria-label="cari" aria-describedby="button-addon2" style="max-width: 500px;height: 25pt;">
            @if ($cari != null)
                <a wire:click='delCari' type="button" class="btn bg-transparent"
                    style="margin-left: -30px; z-index: 100; margin-top: 2pt;">
                    <i class="fa-solid fa-xmark"></i>
                </a>
            @endif
        </div> -->


         <div class="ms-3">
            <button type="button" class="btn btn-sm btn-primary" @click="create()">
               Tambah
            </button>
            <createBahanBaku @data-created="dataCreated" />
            <editBahanBaku :data="dataBahanBaku" :loading="loading" @data-updated="dataUpdated" />
            <destroyBahanBaku :data="dataBahanBaku" :loading="loading" @data-destroyed="dataDestroyed" />
         </div>
      </div>
      <!-- <h1>{{ dataBahanBaku }}</h1> -->
      <div class="border rounded p-3">
         <table class="table table-sm table-hover">
            <thead>
               <tr>
                  <th scope="col" width="45px" class="text-center">#</th>
                  <th scope="col">Bahan Baku</th>
                  <th scope="col" width="140px" class="text-center">Aksi</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="(bahanBaku, index) in bahanBakus.data">
                  <th valign="middle" scope="row" class="text-center">{{ index + 1 }}</th>
                  <td valign="middle">{{ bahanBaku.nama_bb }}</td>
                  <td valign="middle" class="text-center">
                     <a class="btn btn-secondary me-2" @click="edit(bahanBaku.id)"
                        style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;">
                        <span class="fw-bold">Edit</span>
                     </a>
                     <a class="btn btn-danger" @click="destroy(bahanBaku.id)"
                        style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;">
                        <span class="fw-bold">Hapus</span>
                     </a>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>

      <div class="d-flex justify-content-center  mt-3" v-if="bahanBakus.last_page != 1">
         <nav aria-label="Page navigation example" v-if="typeof bahanBakus.data != 'undefined'">
            <ul class="pagination justify-content-center">
               <li v-bind:class="[bahanBakus.prev_page_url == null ? 'page-item disabled' : 'page-item']">
                  <button type="button" class="page-link" aria-label="Previous" @click="page -= 1">
                     <span aria-hidden="true">&laquo;</span>
                  </button>
               </li>

               <li v-for="(bahanBaku, index) in bahanBakus.links"
                  v-bind:class="[bahanBakus.current_page == bahanBaku.label ? 'page-item active' : 'page-item']">
                  <button type="button" class="page-link" @click="page = bahanBaku.label">
                     <span>{{ bahanBaku.label }}</span>
                  </button>
               </li>

               <li v-bind:class="[bahanBakus.next_page_url == null ? 'page-item disabled' : 'page-item']">
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
import _ from 'lodash';
import createBahanBaku from '../components/bahanbaku/Create.vue'
import editBahanBaku from '../components/bahanbaku/Edit.vue'
import destroyBahanBaku from '../components/bahanbaku/Destroy.vue'

export default {
   components: {
      createBahanBaku,
      editBahanBaku,
      destroyBahanBaku,
   },
   data() {
      return {
         dataBahanBaku: {},
         loading: false,
         cari: "",
      }
   },
   computed: {
      ...mapState('bahanBaku', ['bahanBakus', 'data']),
      page: {
         get() {
            return this.$store.state.bahanBaku.page
         },
         set(val) {
            return this.$store.commit('bahanBaku/_set_page', val)
         }
      }
   },
   methods: {
      ...mapActions('bahanBaku', ['fetchDataBahanBakus', 'deleteDataBahanBaku', 'getDataBahanBaku']),
      async _fetchDataBahanBakus() {
         try {
            await this.fetchDataBahanBakus(this.cari)
            window.scrollTo(0, 0);
         } catch (e) {
            alert(e)
         }
      },
      create() {
         $('#createBahanBaku').modal('show');
      },
      dataCreated() {
         this._fetchDataBahanBakus()
      },
      async _getDataBahanBaku(id) {
         this.loading = true
         try {
            let bahanBaku = await this.getDataBahanBaku(id)
            // this.dataBahanBaku.id = bahanBaku.data.id
            // this.dataBahanBaku.nama_bb = bahanBaku.data.nama_bb
            // this.dataBahanBaku.user_id = bahanBaku.data.user_id
            this.dataBahanBaku = bahanBaku.data
            this.loading = false
         } catch (e) {
            console.error(e)
         }
      },
      edit(id) {
         this._getDataBahanBaku(id)
         $('#editBahanBaku').modal('show');
      },
      dataUpdated() {
         this._fetchDataBahanBakus()
      },
      destroy(id) {
         this._getDataBahanBaku(id)
         $('#destroyBahanBaku').modal('show');
      },
      dataDestroyed() {
         this._fetchDataBahanBakus()
      },
   },
   created() {
      this._fetchDataBahanBakus()
   },
   watch: {
      page() {
         this._fetchDataBahanBakus()
      },
      cari: _.debounce(function (value) {
         this._fetchDataBahanBakus()
      }, 500)
   }
}
</script>
