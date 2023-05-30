const tagsView={
    state:{
            visitedViews:[],
            cachedViews: [],
    },
    mutations:{
       ADD_VISITED_VIEW:(state,view)=>{
        //如果标签数组里面 已经有了这个路由路径，就不要传入了
       if(state.visitedViews.some(v=>v.path === view.path)){
          return 
       }

       //推送到标签数组之前，赋值到一个新的对象，加了一个属性 title
        state.visitedViews.push(Object.assign({},view,{
            title:view.meta.title || 'no-name'
        }))

       },
       DEL_VISITED_VIEW:(state,view)=>{
        //js 增强for循环
           for(const [index,value] of state.visitedViews.entries()){
                if(value.path ===view.path){
                    //找到这个索引，删除一个
                    state.visitedViews.splice(index,1)
                    break //删除后，退出循环，节省时间
                }
           }
       }
    },
    actions:{
      addView({dispatch},view){
         dispatch('addVisitedView',view)
      },
      addVisitedView({commit},view){
          commit('ADD_VISITED_VIEW',view)
      },
      delView({dispatch,state},view){
        return new Promise((resolve)=>{
            dispatch('delVisitedView',view)
            resolve({
                visitedViews:[...state.visitedViews]
            })
        })
      },
      delVisitedView({commit},view){
        commit('DEL_VISITED_VIEW',view)
      },
    }
 }
 
 export default {
    namespaced: true,
    ...tagsView
  }