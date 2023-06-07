import {getDicts} from "@/api/system/dict"
import dictConverter from "./DictConverter"

const options={
    metas : {
        '*' : {
            request(dictMeta){
              // console.log('dictMeta ',dictMeta);
                return getDicts(dictMeta.type).then(res=>res.data)
            },
            responseConverter
        }
    },
    DEFAULT_LABEL_FIELDS:['label','name','title']
}

function responseConverter(response,dictMeta){
  const dicts=response

  if(dicts === undefined){
    console.warn(`no dict data of ${dictMeta.type} found in the response`)
    return []
  }

  //将后台拿到的数据，然后把label 和value赋值到DictData对象
  return dicts.map(d=>dictConverter(d))

}

export default options