import model from "./model"
export default {
    install(Vue){
        Vue.prototype.$model=model
    }
}