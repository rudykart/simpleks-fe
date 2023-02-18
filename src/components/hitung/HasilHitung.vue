<template>
   <div class="modal fade" id="hasilHitung" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <!-- <loader v-if="loading" /> -->
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h1 class="modal-title fs-5" id="staticBackdropLabel">Hasil Perhitungan</h1>
               <button @click="openCloseFun()" type="button" class="btn-close"></button>
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
            <div v-if="!loading" class="modal-body">
               <div class="s" v-if="data.hasil != null">
                  <label class="mb-2">Keuntungan keseluruhan : {{
                     data.iterasi[data.iterasi.length - 1][0].pop()
                  }}</label>
                  <!-- {{ data.hasil.length }} -->

                  <br>
                  <label class="mb-2">Hasil Perhitungan Kue</label>
                  <div v-if="data.hasil != null" class="border rounded p-3 mb-4">
                     <table class="table table-sm table-hover mt-1">
                        <thead>
                           <tr>
                              <th valign="middle" width="55px" class="text-center">#</th>
                              <th valign="middle">Nama Kue</th>
                              <th valign="middle" class="text-center">Keuntungan Kue</th>
                              <th valign="middle" class="text-center">Jumlah Kue</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr v-for="(hasil, index) in data.hasil[data.hasil.length - 1]['kue']">
                              <th valign="middle" scope="row" class="text-center">{{ index + 1 }}</th>
                              <td valign="middle"> {{ hasil.namaKue }} </td>
                              <td valign="middle" class="text-center"> {{ hasil.keuntunganKue }} </td>
                              <td valign="middle" class="text-center"> {{ hasil.jumlahKue }} </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

                  <label class="mb-2">Hasil Perhitungan Bahan Baku</label>
                  <div v-if="data.hasil != null" class="border rounded p-3">
                     <table class="table table-sm table-hover mt-1">
                        <thead>
                           <tr>
                              <th valign="middle" width="55px" class="text-center">#</th>
                              <th valign="middle">Nama Bahan Baku</th>
                              <th valign="middle" class="text-center">Sisa Bahan Baku</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr v-for="(hasil, index) in data.hasil[data.hasil.length - 1]['bahanBaku']">
                              <th valign="middle" scope="row" class="text-center">{{ index + 1 }}</th>
                              <td valign="middle"> {{ hasil.namaBB }} </td>
                              <td valign="middle" class="text-center"> {{ hasil.sisaBB }} </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>

               <div v-else>
                  <h3 class="text-center mt-2">Harap lengkapi semua input</h3>
               </div>

            </div>
            <div class="modal-footer">
               <button type="button" @click="openCloseFun()" class="btn btn-secondary">
                  Cancel
               </button>
            </div>
         </div>
      </div>
   </div>

</template>

<script>
export default {
   props: {
      data: Array,
      loading: Boolean,
   },
   // computed: {
   //    ...mapState(['data']),
   // },
   methods: {
      resetFormHitung() {
         // this.data = ''
      },

      openCloseFun() {
         $('#hasilHitung').modal('hide');
      }
   },
   // watch: {
   //    data(newVal, oldVal) {
   //       this.data = newVal
   //    }
   // }
}
</script>