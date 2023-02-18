import axios from 'axios'

const state = () => ({
  kues: {},
  page: 1,
})

const mutations = {
  _assign_data_kues(state, payload) {
    state.kues = payload
  },
  _set_page(state, payload) {
    state.page = payload
  },
}

const actions = {
  fetchDataKues,
  fetchDropdownKues,
  createDataKue,
  getDataKue,
  updateDataKue,
  destroyDataKue,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

function fetchDataKues({ commit }, qCari) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = `kue?page=${state.page}&q=${qCari}`

      let network = await axios.get(link)
      commit('_assign_data_kues', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function fetchDropdownKues({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'kue'

      let network = await axios.get(link)
      commit('_assign_data_kues', network.data)

      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function createDataKue({ commit }, kue) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'kue'
      let network = await axios.post(link, kue)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function getDataKue({ commit }, kueId) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'kue/' + kueId
      let network = await axios.get(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

function updateDataKue({ commit }, kue) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'kue/' + kue.id
      let network = await axios.patch(link, kue)
      resolve(network.data)
    } catch (e) {
      reject(e)
    }
  })
}

function destroyDataKue({ commit }, kue) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'kue/' + kue.id

      let network = await axios.delete(link)
      resolve(network.data)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}
