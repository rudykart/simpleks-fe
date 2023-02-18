import axios from 'axios'

const state = () => ({
  hitungs: {},
  page: 1,
})

const mutations = {
  _assign_data_hitungs(state, payload) {
    state.hitungs = payload
  },
  _set_page(state, payload) {
    state.page = payload
  },
}

const actions = {
  fetchDataHitungs,
  createDataHitung,
  getDataHitung,
  getDataHasilHitung,
  updateDataHitung,
  destroyDataHitung,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

function fetchDataHitungs({ commit }, qCari) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = `hitung?page=${state.page}&q=${qCari}`

      let network = await axios.get(link)
      commit('_assign_data_hitungs', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function createDataHitung({ commit }, hitung) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'hitung'
      let network = await axios.post(link, hitung)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function getDataHasilHitung({ commit }, hitung) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'perhitungansimpleks'
      let network = await axios.post(link, hitung)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function getDataHitung({ commit }, kueId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'hitung/' + kueId
      let network = await axios.get(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function updateDataHitung({ commit }, kue) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'hitung/' + kue.id
      let network = await axios.patch(link, kue)
      resolve(network.data)
    } catch (e) {
      reject(e)
    }
  })
}

function destroyDataHitung({ commit }, kue) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'hitung/' + kue.id

      let network = await axios.delete(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}
