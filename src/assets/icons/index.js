import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon',SvgIcon)

//第二个参数 不需要遍历子级 我们这里只有一级图标
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)