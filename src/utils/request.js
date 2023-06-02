import axios from 'axios'

import {Message,MessageBox } from 'element-ui'
import store from '@/store'

import {transParams} from '@/utils/paramsUtils'

import { getToken } from '@/utils/auth'

// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service =axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout:10000  
})

//请求拦截器
service.interceptors.request.use(config=>{
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }

  //日期参数处理
  if(config.method === 'get' && config.params){
    //拼接url
    var url=config.url + '?' + transParams(config.params)
    url = url.slice(0, -1);

    //参数填充到url 后面以后，需要清空config.params,防止下次继续拼接重复的
    config.params={}
    config.url=url
  }

   return config
})



//响应拦截器
service.interceptors.response.use(res=>{
  const code=res.data.code
  const msg=res.data.msg

  if(code === 500){
    Message({ message: msg, type: 'error' })
    return Promise.reject(new Error(msg))
  }else if(code === 401){
    if (!isRelogin.show) {
      isRelogin.show = true;
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning' }).then(() => {
        isRelogin.show = false;
        store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
    }).catch(() => {
      isRelogin.show = false;
    });
  }
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
  }else{
    return res.data
    
  }
},
//后台如果没有启动，需要把错误展示到页面
error => {
  let { message } = error;
  if (message == "Network Error") {
    message = "后端接口连接异常";
  } else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  } else if (message.includes("Request failed with status code")) {
    message = "系统接口" + message.substr(message.length - 3) + "异常";
  }
  Message({ message: message, type: 'error', duration: 5 * 1000 })
  return Promise.reject(error)
 }
)

export default service