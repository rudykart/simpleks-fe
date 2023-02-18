<template>
    <div class="modal fade" id="editBahanBaku" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Bahan Baku</h1>
                    <button type="button" class="btn-close" @click="editOpenCloseFun()" aria-label="Close"></button>
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
                <form v-if="!loading" @submit.prevent="_updateDataBahanBaku">
                    <div class="modal-body">
                        <div class="mb-2">
                            <label for="" class="form-label">Nama Bahan Baku</label>
                            <input v-model="bahanBaku.nama_bb" type="text" name=""
                                :class="[validation.nama_bb ? 'form-control is-invalid' : 'form-control']">
                            <span v-if="validation.nama_bb" id="helpId" class="form-text text-danger">
                                {{ validation.nama_bb[0] }}
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="editOpenCloseFun()" class="btn btn-secondary"
                            data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" :disabled="loadingUpdate">
                            <div v-if="loadingUpdate">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading
                            </div>
                            <div v-if="!loadingUpdate">
                                Simpan
                            </div>
                        </button>
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
            bahanBaku: {},
            validation: {
                nama_bb: ''
            },
            loadingUpdate: false
        }
    },
    computed: {
        ...mapState('bahanBaku', ['bahanBakus'])
    },
    methods: {
        ...mapActions('bahanBaku', ['createDataBahanBaku', 'updateDataBahanBaku']),
        _resetForm() {
            this.bahanBaku = {
                id: '',
                nama_bb: '',
                user_id: '',
            }, this.validation = {
                nama_bb: ''
            }
            // this.bbId.value = 0
        },
        editOpenCloseFun() {
            this._resetForm()
            $('#editBahanBaku').modal('hide');
        },
        setDataBahanBaku() {
            // this.loading = true
            this.bahanBaku = this.data
            // this.loading = false
        },
        async _updateDataBahanBaku() {
            this.loadingUpdate = true
            try {
                await this.updateDataBahanBaku(this.bahanBaku)
                this.$emit('dataUpdated')
                this.editOpenCloseFun()
                this._resetForm()
                this.loadingUpdate = false
            } catch (e) {
                console.log(e)
                this.validation = e.response.data.errors
                this.loadingUpdate = false
            }
        },
    },

    created() {
        this.setDataBahanBaku()
    },

    updated() {
        this.setDataBahanBaku()
    },

    // watch: {
    //     data: function (newVal, oldVal) {
    //         this.data = newVal
    //         console.log('new' + newVal + '==' + oldVal)
    //     }
    // }
}
</script>