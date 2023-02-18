import axios from 'axios'
// import $http from 'axios'
// import axios from '../api'
// import $http from 'axios'

const state = () => ({
  bahanBakus: {},
  page: 1,
})

const mutations = {
  _assign_data_bahan_bakus(state, payload) {
    state.bahanBakus = payload
  },
  _set_page(state, payload) {
    state.page = payload
  },
}

const actions = {
  fetchDropdownBahanBakus,
  fetchDataBahanBakus,
  createDataBahanBaku,
  getDataBahanBaku,
  updateDataBahanBaku,
  destroyDataBahanBaku,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

function fetchDataBahanBakus({ commit, state }, qCari) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = `bahanbaku?page=${state.page}&q=${qCari}`
      let network = await axios.get(link)
      commit('_assign_data_bahan_bakus', network.data)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function fetchDropdownBahanBakus({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'bahanbaku'

      let network = await axios.get(link)
      commit('_assign_data_bahan_bakus', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function createDataBahanBaku({ commit }, bahanBaku) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'bahanbaku'

      let network = await axios.post(link, bahanBaku)

      resolve(network.data)
    } catch (e) {
      // console.log(e)
      console.error(e)
      // console.error(e.response.status)
      reject(e)
    }
  })
}

function getDataBahanBaku({ commit }, bahanBakuId) {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(bahanBakuId)
      let link = 'bahanbaku/' + bahanBakuId
      let network = await axios.get(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function updateDataBahanBaku({ commit }, bahanbaku) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'bahanbaku/' + bahanbaku.id

      let network = await axios.patch(link, bahanbaku)

      resolve(network.data)
    } catch (e) {
      reject(e)
    }
  })
}

function destroyDataBahanBaku({ commit }, bahanBakuId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'bahanbaku/' + bahanBakuId

      let network = await axios.delete(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}
