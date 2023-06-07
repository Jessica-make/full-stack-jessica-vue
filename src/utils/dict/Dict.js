import DictMeta from './DictMeta'
import Vue from 'vue'

export default class Dict{
    constructor(){
        this.type={

        }
    }

    init(options){
        if(options instanceof Array){
           const ps=[]
 
           //这里DictMeta会实例化，然后拿到 init(options) 的options参数
            this._dictMetas=options.map(item=>DictMeta.parse(item))
            // console.log('_dictMetas ',this._dictMetas);

            this._dictMetas.forEach(dictMeta=>{
                const type=dictMeta.type

                // console.log('this.type ',this.type);
                // console.log('type ',type);
                Vue.set(this.type,type,[])

                ps.push(loadDict(this,dictMeta))
            })

            return Promise.all(ps)
        }
    }
}

function loadDict(dict,dictMeta){
    //这里传进去的
  return dictMeta.request(dictMeta).then(response=>{
     const type=dictMeta.type

     let dicts=dictMeta.responseConverter(response,dictMeta)

     dict.type[type].splice(0,Number.MAX_SAFE_INTEGER,...dicts)

  })
}