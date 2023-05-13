import Vue from 'vue'

import Cookies from 'js-cookie'

import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
