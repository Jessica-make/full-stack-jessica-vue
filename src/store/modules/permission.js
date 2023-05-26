import { getRouters } from '@/api/login'
import { constantRoutes } from '@/router'
import Layout from '@/layout/index.vue'

const permission = {
  state: {
    sidebarRouters: []
  },
  mutations: {
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resovle => {
        getRouters().then(res => {
          const rData = JSON.parse(JSON.stringify(res.data))
          const sData = JSON.parse(JSON.stringify(res.data))

          const rewriteRoutes = filterAsyncRouter(rData)
          const sidebarRoutes = filterAsyncRouter(sData)

          commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
          resovle(rewriteRoutes)
        })
      })
    }
  }
}

function filterAsyncRouter(asyncRouterList) {
  return asyncRouterList.filter(route => {
    if (route.component) {
      //这个组件不在views下面，需要特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        //将组件字符串，解析成带有路径的真实组件
        route.component = loadView(route.component)
      }

    }

    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function loadView(view) {
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default permission