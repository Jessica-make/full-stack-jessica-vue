import { login } from '@/api/login'

const user={
    state:{
      token:''
    },
    mutations:{
      SET_TOKEN(state,token){
        state.token=token
      }
    },
    actions:{
      Login({commit},userInfo){
        const username = userInfo.username.trim();
        const password = userInfo.password;
        const code = userInfo.code;
        const uuid = userInfo.uuid;

        //需要使用Promise 传递已经处理完的状态
        return new Promise((resolve,reject)=>{
            login(username, password, code, uuid).then((res) => {
                commit('SET_TOKEN',res.token)
                resolve()
              }).catch(error => {
                reject(error)
              })
        })
      }
    }
}

export default user