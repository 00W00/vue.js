import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueRouter from 'vue-router'
import routerConfig from './router_config'
Vue.prototype.$ajax = axios
Vue.use(VueRouter)
const router = new VueRouter(routerConfig)
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
