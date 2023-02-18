import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

//import bootstrap css & js
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min.js'
import 'jquery/dist/jquery.js'
import 'popper.js/dist/popper.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

// window.$ = window.jQuery = require('jquery');
// createApp(App).use(store).use(router).mount('#app')
createApp(App).use(store).use(router).mount('#app')
