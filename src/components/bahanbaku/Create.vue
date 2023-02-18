<template>
    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#createBahanBaku">
        Tambah
    </button> -->

    <!-- Modal -->
    <div class="modal fade" id="createBahanBaku" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Tambah Bahan Baku</h1>
                    <button type="button" @click="createOpenCloseFun()" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <form @submit.prevent="_createDataBahanBaku">
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
                        <button type="button" @click="createOpenCloseFun()" data-bs-dismiss="modal"
                            class="btn btn-secondary">Cancel</button>
                        <button type="submit" class="btn btn-primary" :disabled="loading">
                            <div v-if="loading">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading
                            </div>
                            <div v-if="!loading">
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

export default {
    data() {
        return {
            bahanBaku: {
                nama_bb: ''
            }, validation: {
                nama_bb: ''
            },
            loading: false,
        }
    },
    computed: {
        ...mapState('bahanBaku', ['bahanBakus'])
    },
    methods: {
        ...mapActions('bahanBaku', ['createDataBahanBaku']),
        _resetForm() {
            this.bahanBaku = {
                nama_bb: ''
            }, this.validation = {
                nama_bb: ''
            }
        },
        createOpenCloseFun() {
            this._resetForm()
            $('#createBahanBaku').modal('hide');
        },
        async _createDataBahanBaku() {
            this.loading = true
            try {
                await this.createDataBahanBaku(this.bahanBaku)
                this._resetForm()
                this.$emit('dataCreated')
                this.createOpenCloseFun()
                this.loading = false
            } catch (e) {
                this.validation = e.response.data.errors
                this.loading = false
            }
        },
    },
}

</script>