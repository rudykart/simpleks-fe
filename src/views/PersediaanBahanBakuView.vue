<template>
    <main>
        <!-- <loader v-if="loading" /> -->
        <div class="d-flex mb-3">
            <div class="input-group input-group-sm">
                <input v-model="cari" type="text" class="form-control form-control-sm rounded"
                    placeholder="Pencarian persediaan bahan baku" aria-label="Pencarian persediaan bahan baku"
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
                <createPersediaanBahanBaku :bahanBakus="dataBahanBakus" @data-created="dataCreated" />
                <editPersediaanBahanBaku :data="dataPBB" :bahanBakus="dataBahanBakus" :loading="loading"
                    @data-updated="dataUpdated" />
                <destroyPersediaanBahanBaku :data="dataPBB" :loading="loading" @data-destroyed="dataDestroyed" />
            </div>
        </div>
        <!-- <h1>{{ dataBahanBaku }}</h1> -->
        <div class="border rounded p-3">
            <table class="table table-sm table-hover">
                <thead>
                    <tr>
                        <th scope="col" width="45px" class="text-center">#</th>
                        <th scope="col">Persediaan Bahan Baku</th>
                        <th scope="col" width="140px" class="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(persediaanBahanBaku, index) in persediaanBahanBakus.data">
                        <tr>
                            <th valign="middle" scope="row" class="text-center">{{ index + 1 }}</th>
                            <td valign="middle">{{ persediaanBahanBaku.keterangan_pbb }}</td>
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

                                <a class="btn btn-secondary me-2" @click="edit(persediaanBahanBaku.id)"
                                    style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;">
                                    <span class="fw-bold">Edit</span>
                                </a>
                                <a class="btn btn-danger" @click="destroy(persediaanBahanBaku.id)"
                                    style="--bs-btn-padding-y: 0.5pt; --bs-btn-padding-x: 2pt; --bs-btn-font-size: .75rem;">
                                    <span class="fw-bold">Hapus</span>
                                </a>
                            </td>
                        </tr>
                        <tr class="collapse" :id="['detail' + index]">
                            <td colspan="3">
                                <div class="collapse" :id="['detail' + index]">
                                    <div class="row ">
                                        <div class="col" style="max-width: 45px;"></div>
                                        <div class="col"><strong>Bahan Baku</strong></div>
                                        <div class="col"><strong>Jumlah</strong></div>
                                    </div>
                                    <div class="row"
                                        v-for="(stokBahanBaku, index2) in persediaanBahanBaku.stokBahanBakus">
                                        <div class="col" style="max-width: 45px;"></div>
                                        <div class="col">{{ stokBahanBaku.nama_bb }}</div>
                                        <div class="col">{{ stokBahanBaku.stok_bb }} g</div>
                                    </div>

                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="d-flex justify-content-center  mt-3" v-if="persediaanBahanBakus.last_page != 1">
            <nav aria-label="Page navigation example" v-if="typeof persediaanBahanBakus.data != 'undefined'">
                <ul class="pagination justify-content-center">
                    <li
                        v-bind:class="[persediaanBahanBakus.prev_page_url == null ? 'page-item disabled' : 'page-item']">
                        <button type="button" class="page-link" aria-label="Previous" @click="page -= 1">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>

                    <li v-for="(persediaanBahanBaku, index) in persediaanBahanBakus.links"
                        v-bind:class="[persediaanBahanBakus.current_page == persediaanBahanBaku.label ? 'page-item active' : 'page-item']">
                        <button type="button" class="page-link" @click="page = persediaanBahanBaku.label">
                            <span>{{ persediaanBahanBaku.label }}</span>
                        </button>
                    </li>

                    <li
                        v-bind:class="[persediaanBahanBakus.next_page_url == null ? 'page-item disabled' : 'page-item']">
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
import createPersediaanBahanBaku from '../components/persediaanbahanbaku/Create.vue'
import editPersediaanBahanBaku from '../components/persediaanbahanbaku/Edit.vue'
import destroyPersediaanBahanBaku from '../components/persediaanbahanbaku/Destroy.vue'
import loader from '../components/Loader.vue'
import _ from 'lodash';

export default {
    components: {
        loader,
        createPersediaanBahanBaku,
        editPersediaanBahanBaku,
        destroyPersediaanBahanBaku,
    },
    data() {
        return {
            dataPBB: {},
            loading: false,
            cari: "",
            dataBahanBakus: {},
        }
    },
    computed: {
        ...mapState('persediaanBahanBaku', ['persediaanBahanBakus', 'data']),
        ...mapState('bahanBaku', ['bahanBakus']),
        page: {
            get() {
                return this.$store.state.persediaanBahanBaku.page
            },
            set(val) {
                return this.$store.commit('persediaanBahanBaku/_set_page', val)
            }
        }
    },
    methods: {
        ...mapActions('persediaanBahanBaku', ['fetchDataPersediaanBahanBakus', 'getDataPersediaanBahanBaku']),
        ...mapActions('bahanBaku', ['fetchDropdownBahanBakus']),
        async _fetchDataPersediaanBahanBakus() {
            try {
                await this.fetchDataPersediaanBahanBakus(this.cari)
                window.scrollTo(0, 0);
            } catch (e) {
                alert(e)
            }
        },
        async _fetchDropdownBahanBakus() {
            try {
                let data = await this.fetchDropdownBahanBakus()
                this.dataBahanBakus = data.data
                // console.log(data.data)
                window.scrollTo(0, 0);
            } catch (e) {
                alert(e)
            }
        },
        detail(index) {
            $('#detail' + index).collapse("toggle");
        },
        create() {
            $('#createPersediaanBahanBaku').modal('show');
        },
        dataCreated() {
            this._fetchDataPersediaanBahanBakus()
        },
        async _getDataPersediaanBahanBaku(id) {
            this.loading = true
            try {
                let pbb = await this.getDataPersediaanBahanBaku(id)
                this.dataPBB = pbb.data
                // console.log(dataPBB)
                this.loading = false
            } catch (e) {
                console.error(e)
            }
        },
        edit(id) {
            this._getDataPersediaanBahanBaku(id)
            $('#editPersediaanBahanBaku').modal('show');
        },
        dataUpdated() {
            this._fetchDataPersediaanBahanBakus()
        },
        destroy(id) {
            this._getDataPersediaanBahanBaku(id)
            $('#destroyPersediaanBahanBaku').modal('show');
        },
        dataDestroyed() {
            this._fetchDataPersediaanBahanBakus()
        },
    },
    created() {
        this._fetchDataPersediaanBahanBakus()
        this._fetchDropdownBahanBakus()
    },
    watch: {
        page() {
            this._fetchDataPersediaanBahanBakus()
        },
        cari: _.debounce(function (value) {
            this._fetchDataPersediaanBahanBakus()
        }, 500)
    }
}
</script>
