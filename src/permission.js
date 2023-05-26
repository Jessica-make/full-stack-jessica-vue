import router from './router'
import store from './store'

import NProgress from 'nprogress'
import { getToken } from './utils/auth'

const whiteList = ['/login', 'register']

router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) {
        //如果有token，然后用户输入了 /login,跳到登录页面
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            if (store.getters.roles.length === 0) {
                // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetInfo').then(() => {
                   store.dispatch('GenerateRoutes').then(accessRoutes => {
                     router.addRoutes(accessRoutes)
                    //确保动态路由添加已完成，然后才能放行 2023-05-26
                    next({ ...to, replace: true }) 
                })
              })
            } else {
                next()
            }

        }

    } else {
        //js 也是遵守驼峰语法的，注意这个indexOf!!!!!!!!!!!
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
            NProgress.done()
        }
    }
})