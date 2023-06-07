import Vue from 'vue'
import DataDict from '@/utils/dict'

function install(){
  //DataDict 里面是一个函数，它会直接把这个函数当成install方法执行
  Vue.use(DataDict,{
  })
}

export default {
    install
}