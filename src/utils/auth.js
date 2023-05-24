import Cookies from 'js-cookie'

const TokenKey="Jessica-admin-token"

export function setToken(token){
    Cookies.set(TokenKey,token)
}

export function getToken(){
   return Cookies.get(TokenKey)
}

export function removeToken(){
    Cookies.remove(TokenKey)
}