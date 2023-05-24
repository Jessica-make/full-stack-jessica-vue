import request from '../utils/request'

export function getCodeImg(){
    return request({
        url:"/captchaImage",
        method:"get",
        timeout:20000
    })
}


export function login(username,password,code,uuid){
    const data={
        username,
        password,
        code,
        uuid
    }
    return request({
        url:"/login",
        method:"post",
        timeout:20000,
        data
    })
}

// 获取用户详细信息
export function getInfo() {
    return request({
      url: '/getInfo',
      method: 'get'
    })
    
  }


  // 获取路由
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}

// 退出方法
export function logout() {
    return request({
      url: '/logout',
      method: 'post'
    })
  }  