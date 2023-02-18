import axios from 'axios'

const state = () => ({
  persediaanBahanBakus: {},
  page: 1,
})

const mutations = {
  _assign_data_persediaan_bahan_bakus(state, payload) {
    state.persediaanBahanBakus = payload
  },
  _set_page(state, payload) {
    state.page = payload
  },
}

const actions = {
  fetchDataPersediaanBahanBakus,
  fetchDropdownPersediaanBahanBakus,
  createDataPersediaanBahanBaku,
  getDataPersediaanBahanBaku,
  updateDataPersediaanBahanBaku,
  destroyDataPersediaanBahanBaku,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

function fetchDataPersediaanBahanBakus({ commit }, qCari) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = `pbb?page=${state.page}&q=${qCari}`
      let network = await axios.get(link)
      commit('_assign_data_persediaan_bahan_bakus', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function fetchDropdownPersediaanBahanBakus({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'pbb'

      let network = await axios.get(link)
      commit('_assign_data_persediaan_bahan_bakus', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function createDataPersediaanBahanBaku({ commit }, pbb) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'pbb'

      let network = await axios.post(link, pbb)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function getDataPersediaanBahanBaku({ commit }, pbbId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'pbb/' + pbbId
      let network = await axios.get(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function updateDataPersediaanBahanBaku({ commit }, pbb) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'pbb/' + pbb.id
      let network = await axios.patch(link, pbb)
      resolve(network.data)
    } catch (e) {
      reject(e)
    }
  })
}

function destroyDataPersediaanBahanBaku({ commit }, pbb) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'pbb/' + pbb.id

      let network = await axios.delete(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}
