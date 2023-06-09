import Vue from 'vue'

import Cookies from 'js-cookie'

import App from './App.vue'
import store from './store'


import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './permission'
import './assets/icons'
import plugins from './plugins'

import RightToolBar from './components/RightToolBar/index'
import Pagination from './components/Pagination/index'

import {resetForm} from '@/utils/formUtils'
import {addDateRange} from '@/utils/dateUtils'

import DictData from './components/DictData'

import '@/assets/styles/index.scss'
import '@/assets/styles/Jessica.scss'

import router from './router'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.use(plugins)

DictData.install()

Vue.config.productionTip = false

//全局注册组件
Vue.component('RightToolBar',RightToolBar)
Vue.component('Pagination',Pagination)

//全局挂载方法
Vue.prototype.resetForm=resetForm
Vue.prototype.addDateRange=addDateRange

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
