import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'
import axios from 'axios'
import apiUrl from '../api'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { needAuth: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { needAuth: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/Register.vue'),
    meta: { needAuth: false },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue'),
    meta: { needAuth: false },
  },
  {
    path: '/bahanbaku',
    name: 'bahanbaku.index',
    component: () => import('../views/BahanBakuView.vue'),
    meta: { needAuth: true },
  },
  {
    path: '/persediaanbahanbaku',
    name: 'persediaanbahanbaku.index',
    component: () => import('../views/PersediaanBahanBakuView.vue'),
    meta: { needAuth: true },
  },
  {
    path: '/kue',
    name: 'kue.index',
    component: () => import('../views/KueView.vue'),
    meta: { needAuth: true },
  },
  {
    path: '/hitung',
    name: 'hitung.index',
    component: () => import('../views/HitungView.vue'),
    meta: { needAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.needAuth)) {
//     let isAuth = store.getters.isAuth
//     if (to.name !== 'login' && !isAuth) {
//       next({ name: 'login' })
//     }
//     if (to.name === 'login' && isAuth) {
//       next({ name: 'bahanbaku.index' })
//     } else {
//       next()
//       console.log(isAuth)
//       // console.log(to)
//       // console.log(from)
//     }
//   } else {
//     next()
//   }
// })

router.beforeEach((to, from, next) => {
  let isAuth = store.getters.isAuth
  if (to.matched.some((record) => record.meta.needAuth)) {
    if (!isAuth) {
      next({ name: 'login' })
    } else {
      console.log(to.matched[0].name)
      next()
    }
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   let isAuth = store.getters.isAuth
//   if (to.matched.some((record) => record.meta.needAuth)) {
//     if (!isAuth) {
//       next({ name: 'login' })
//     } else {
//       // console.log(to.matched)
//       next()
//     }
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   // console.log(axios.defaults)
//   // console.log(apiUrl + 'asa')
//   if (to.matched.some((record) => record.meta.needAuth)) {
//     let isAuth = store.getters.isAuth
//     // if (isAuth) {
//     if (isAuth == false && isAuth == '') {
//       next({ name: 'login' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//     // next({ name: 'home' })
//   }
//   // let isAuth = store.getters.isAuth
//   // if (!isAuth) {
//   //   console.error(isAuth)
//   //   next({ name: 'login' })
//   // } else {
//   //   next()
//   // }
// })

export default router
