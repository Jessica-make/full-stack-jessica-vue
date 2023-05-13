import request from '../utils/request'

export function getCodeImg(){
    return request({
        url:"/captchaImage",
        method:"GET",
        timeout:20000
    })
}