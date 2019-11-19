import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(BootstrapVue)
Vue.use(VueAxios)

Vue.config.productionTip = false
Vue.prototype.$http = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
