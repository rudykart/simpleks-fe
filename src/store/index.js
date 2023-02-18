import { createStore } from 'vuex'
import auth from './auth.store'
import bahanBaku from './bahanbaku.store'
import persediaanBahanBaku from './persediaanbahanbaku.store'
import kue from './kue.store'
import hitung from './hitung.store'

// export default Vuex.Store({
export default createStore({
  state: {
    access_token: localStorage.getItem('access_token'),
  },
  mutations: {
    _set_token(state, payload) {
      state.access_token = payload
    },
  },
  actions: {},
  getters: {
    isAuth: (state) => {
      if (state.access_token != '' && state.access_token != null) {
        return true
      } else {
        return false
      }
    },
  },
  modules: {
    auth,
    bahanBaku,
    persediaanBahanBaku,
    kue,
    hitung,
  },
})

// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
