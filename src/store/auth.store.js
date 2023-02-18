import axios from 'axios'

const state = () => ({
  users: {},
})

const mutations = {
  _assign_data_user(state, payload) {
    state.users = payload
  },
}

const actions = {
  login,
  logout,
  getUser,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

function login({ commit }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let network = await axios.post('login', payload)
      localStorage.setItem('access_token', network.data.token)
      commit('_set_token', network.data.token, { root: true })
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + network.data.token
      resolve(network)
    } catch (e) {
      // console.log(axios.defaults.baseURL)
      // console.error(e)
      // console.error(e.response.status)
      reject(e)
    }
  })
}

// function login({ commit }, payload) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let network = await axios.post('login', payload)
//       // let network = axios.post('login', payload)
//       // axios.create({
//       //   headers: {
//       //     Accept: 'application/json',
//       //     Authorization: `Bearer ${network.data}`,
//       //   },
//       // })
//       localStorage.setItem('access_token', network.data)
//       // axios.defaults.headers.common['Authorization'] =
//       //   'Bearer ' + localStorage.getItem('access_token')
//       // commit('_set_token', network.data, { root: true })
//       resolve(network)
//     } catch (e) {
//       // console.log(axios.defaults.baseURL)
//       // console.error(e)
//       // console.error(e.response.status)
//       reject(e)
//     }
//   })
// }

function logout({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      // axios.defaults.headers.common['Authorization']
      let token = localStorage.getItem('access_token')
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      let network = await axios.post('logout')
      // localStorage.removeItem('access_token')

      // localStorage.removeItem('access_token')
      // delete axios.defaults.headers.common['Authorization']
      // let network = await axios.post('logout')
      resolve(network.data)
    } catch (e) {
      reject(e)
    }
  })
}

function getUser({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let link = 'me'
      let network = await axios.get(link)
      //   commit('_assign_data_user', network.data)
      // commit('_assign_data_user', network)
      resolve(network)
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}
