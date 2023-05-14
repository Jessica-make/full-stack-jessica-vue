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