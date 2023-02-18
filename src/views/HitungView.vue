<template>
    <main>
        <div class="d-flex mb-3">
            <div class="input-group input-group-sm">
                <input v-model="cari" type="text" class="form-control form-control-sm rounded"
                    placeholder="Pencarian data perhitungan" aria-label="Pencarian data perhitungan"
                    aria-describedby="button-addon2">
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
                <createHitung :persediaanBahanBakus="dataPersediaanBahanBakus" :kues="dataKues"
                    @data-created="dataCreated" />
                <editHitung :persediaanBahanBakus="dataPersediaanBahanBakus" :kues="dataKues" :data="dataHitung"
                    :loading="loading" @data-updated="dataUpdated" />
                <destroyHitung :persediaanBahanBakus="dataPersediaanBahanBakus" :data="dataHitung" :loading="loading"
                    @data-destroyed="dataDestroyed" />
            </div>
        </div>
        <div class="border rounded p-3">
            <table class="table table-sm table-hover">
                <thead>
                    <tr>
                        <th scope="col" width="45px" class="text-center">#</th>
                        <th scope="col">Keterangan Hitung</th>
                        <th scope="col" width="140px" class="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(hitung, index) in hitungs.data">
                        <tr>
                            <th valign="middle" scope="row" class="text-center">{{ index + 1 }}</th>
                            <td valign="middle">{{ hitung.keterangan_hitung }}</td>
                            <td valign="middle" class="text-center">

                                <button type="button" class="btn btn-info me-2" data-bs-toggle="collapse"
                                    :data-bs-target="['#detail' + index]"
                                    style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;"
                                    aria-expanded="false" aria-controls="detail" @click="detail(index)">
                                    <span class="fw-bold" style="color: white;">Detail</span>
                                </button>

                                <a class="btn btn-secondary me-2" @click="edit(hitung.id)"
                                    style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;">
                                    <span class="fw-bold">Edit</span>
                                </a>
                                <a class="btn btn-danger" @click="destroy(hitung.id)"
                                    style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;">
                                    <span class="fw-bold">Hapus</span>
                                </a>
                            </td>
                        </tr>
                        <tr class="collapse" :id="['detail' + index]">
                            <td colspan="4">
                                <div class="collapse" :id="['detail' + index]">
                                    <div class="row">
                                        <div class="col" style="max-width: 45px;"></div>
                                        <div class="col">
                                            <div class="row">

                                                <div class="row ">
                                                    <div class="col"><strong>Kue</strong></div>

                                                    <div class="col">

                                                        <button type="button" class="btn btn-primary float-end"
                                                            @click="hasilHitung(hitung)"
                                                            style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;"
                                                            aria-expanded="false" aria-controls="detail">
                                                            <span class="fw-bold" style="color: white;">Hasil
                                                                Perhitungan</span>
                                                        </button>
                                                    </div>


                                                </div>
                                                <div class="row ">
                                                    <div class="col border-top border-bottom" style="max-width: 25px;">
                                                        <strong>#</strong>
                                                    </div>
                                                    <div class="col border-top border-bottom">
                                                        <strong>Nama Kue</strong>
                                                    </div>
                                                    <div class="col border-top border-bottom">
                                                        <strong>Keuntungan</strong>
                                                    </div>
                                                    <div class="col border-top border-bottom">
                                                        <strong>Komposisi Kue</strong>
                                                    </div>
                                                    <div class="col border-top border-bottom">
                                                        <strong>Jumlah</strong>
                                                    </div>
                                                </div>
                                                <div class="row" v-for="(kue, indexKue) in hitung.dataHitungs">
                                                    <div class="col" style="max-width: 25px;">
                                                        <strong>{{ indexKue + 1 }}</strong>
                                                    </div>
                                                    <div class="col">{{ kue.kue.nama_kue }}</div>
                                                    <div class="col">{{ kue.kue.keuntungan_kue }}</div>
                                                    <div class="col">
                                                        <div class="row ms-1"
                                                            v-for="(kompBahan, i) in kue.kue.komposisiKues">
                                                            {{ kompBahan.nama_bb }}</div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="row ms-1"
                                                            v-for="(kompBahan, i) in kue.kue.komposisiKues">
                                                            {{ kompBahan.jumlah_bb }} g</div>
                                                    </div>
                                                </div>
                                                <div class="my-2" />
                                                <div class="row ">
                                                    <div class="col"><strong>Persediaan Bahan Baku</strong></div>
                                                </div>
                                                <div class="row ">
                                                    <div class="col border-top border-bottom" style="max-width: 25px;">
                                                        <strong>#</strong>
                                                    </div>
                                                    <div class="col border-top border-bottom"><strong>Nama Bahan
                                                            Baku</strong></div>
                                                    <div class="col border-top border-bottom"><strong>Stok</strong>
                                                    </div>
                                                </div>
                                                <div class="row"
                                                    v-for="(stokBahanBaku, index2) in hitung.persediaanBahanBaku['stokBahanBakus']">
                                                    <div class="col" style="max-width: 25px;">
                                                        <strong>{{ index2 + 1 }}</strong>
                                                    </div>
                                                    <div class="col">{{ stokBahanBaku.nama_bb }}</div>
                                                    <div class="col">{{ stokBahanBaku.stok_bb }} g</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center  mt-3" v-if="hitungs.last_page != 1">
            <nav aria-label="Page navigation example" v-if="typeof hitungs.data != 'undefined'">
                <ul class="pagination justify-content-center">
                    <li v-bind:class="[hitungs.prev_page_url == null ? 'page-item disabled' : 'page-item']">
                        <button type="button" class="page-link" aria-label="Previous" @click="page -= 1">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>

                    <li v-for="(hitung, index) in hitungs.links"
                        v-bind:class="[hitungs.current_page == hitung.label ? 'page-item active' : 'page-item']">
                        <button type="button" class="page-link" @click="page = hitung.label">
                            <span>{{ hitung.label }}</span>
                        </button>
                    </li>

                    <li v-bind:class="[hitungs.next_page_url == null ? 'page-item disabled' : 'page-item']">
                        <button type="button" class="page-link" aria-label="Next" @click="page += 1">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        <hasilHitung :data="dataHitung" :loading="loading" />
    </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
import createHitung from '../components/hitung/Create.vue'
import editHitung from '../components/hitung/Edit.vue'
import destroyHitung from '../components/hitung/Destroy.vue'
import hasilHitung from '../components/hitung/HasilHitung.vue'
import _ from 'lodash';

export default {
    components: {
        createHitung,
        editHitung,
        destroyHitung,
        hasilHitung,
    },
    data() {
        return {
            dataHitung: {},
            loading: false,
            cari: "",
            dataPersediaanBahanBakus: {},
            dataKues: {}
        }
    },
    computed: {
        ...mapState('hitung', ['hitungs', 'data']),
        page: {
            get() {
                return this.$store.state.hitung.page
            },
            set(val) {
                return this.$store.commit('hitung/_set_page', val)
            }
        }
    },
    methods: {
        ...mapActions('hitung', ['fetchDataHitungs', 'getDataHitung', 'getDataHasilHitung']),
        ...mapActions('persediaanBahanBaku', ['fetchDropdownPersediaanBahanBakus']),
        ...mapActions('kue', ['fetchDropdownKues']),
        async _fetchDropdownPersediaanBahanBakus() {
            try {
                let data = await this.fetchDropdownPersediaanBahanBakus()
                this.dataPersediaanBahanBakus = data.data
                window.scrollTo(0, 0);
            } catch (e) {
                // alert(e)
                console.error(e)
            }
        },
        async _fetchDropdownKues() {
            try {
                let data = await this.fetchDropdownKues()
                this.dataKues = data.data
                window.scrollTo(0, 0);
            } catch (e) {
                console.error(e)
            }
        },
        async _fetchDataHitungs() {
            try {
                await this.fetchDataHitungs(this.cari)
                window.scrollTo(0, 0);
            } catch (e) {
                alert(e)
            }
        },
        async _getDataHitung(id) {
            this.loading = true
            try {
                let value = await this.getDataHitung(id)
                this.dataHitung = value.data
                this.dataHitung.persediaan_bahan_baku_id = value.data.persediaanBahanBaku.id
                this.dataHitung.persediaan_bahan_baku = {}
                // console.log(this.dataHitung)
                this.loading = false
            } catch (e) {
                console.error(e)
                this.loading = false
            }
        },
        async hasilHitung(data) {
            console.log(data)
            this.loading = true
            $('#hasilHitung').modal('show');

            let value = {
                persediaan_bahan_baku_id: data.persediaanBahanBaku.id,
                dataHitungs: data.dataHitungs
            }

            try {
                let hasil = await this.getDataHasilHitung(value)
                this.dataHitung = hasil.data
                this.loading = false
                console.log(this.dataHitung)
            } catch (e) {
                this.loading = false
                console.error(e)
            }
        },
        detail(index) {
            $('#detail' + index).collapse("toggle");
        },
        create() {
            $('#createHitung').modal('show');
        },
        dataCreated() {
            this._fetchDataHitungs()
        },

        edit(id) {
            this._getDataHitung(id)
            $('#editHitung').modal('show');
        },
        dataUpdated() {
            this._fetchDataHitungs()
        },
        destroy(id) {
            this._getDataHitung(id)
            $('#destroyHitung').modal('show');
        },
        dataDestroyed() {
            this._fetchDataHitungs()
        },
    },
    created() {
        this._fetchDataHitungs()
        this._fetchDropdownPersediaanBahanBakus()
        this._fetchDropdownKues()
    },
    watch: {
        page() {
            this._fetchDataHitungs()
        },
        cari: _.debounce(function (value) {
            this._fetchDataHitungs()
        }, 500)
    }
}
</script>
