import router from './router'
import store from './store'

import NProgress from 'nprogress'
import { getToken } from './utils/auth'
import { isRelogin } from '@/utils/request'

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
                isRelogin.show = false
                // store.dispatch('GenerateRoutes').then(accessRoutes => {
                //     // 根据roles权限生成可访问的路由表
                //     router.addRoutes(accessRoutes) // 动态添加可访问路由表
                //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
                // })
                next()
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