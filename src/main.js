import Vue from 'vue'

import Cookies from 'js-cookie'

import App from './App.vue'
import store from './store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './permission'
import './assets/icons'

import RightToolBar from './components/RightToolBar/index'

import '@/assets/styles/index.scss'
import '@/assets/styles/Jessica.scss'

import router from './router'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

//全局注册组件
Vue.component('RightToolBar',RightToolBar)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
