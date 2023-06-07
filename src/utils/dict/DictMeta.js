import DictOptions from "./DictOptions"

export default class DictMeta{
    constructor(options){
       this.type=options.type
       this.request=options.request
       this.responseConverter=options.responseConverter
    }
}

DictMeta.parse=function(options){
    let opts=null

    if(typeof options === 'string'){
        opts = DictOptions.metas['*']
        opts.type=options

        //opts 一共有3个值，DictOptions.metas['*'] 有两个值，下面一个值
        //总共3个值，然后传递给 new DictMeta(opts)
    }

   return new DictMeta(opts)
}