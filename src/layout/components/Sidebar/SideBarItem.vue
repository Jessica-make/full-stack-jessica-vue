<template>
  <div v-if="!item.hidden">
    <!-- 这里不能用这个 v-if="!item.children"
      因为 path: '',有children,
      如果有这个，path: ''会走到下面去，然后展开上下级，path的children有图标直接展示
      而path: '' 本身没有icon图标，然后就爆红了


      正确解法，如果只有一个children,那么只展示一层，也就是父子合并
      如果没有children，也只展示一层，就展示本身meta的元素
    -->
    <template v-if="hasOneShowChild(item.children,item)">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <menu-item
            :icon="onlyOneChild.meta.icon"
            :title="onlyOneChild.meta.title"
          ></menu-item>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :index="basePath">
     <template slot="title">
        <menu-item :icon="item.meta.icon" :title="item.meta.title"></menu-item>
      </template> 

      <sidebar-item
        v-for="(child, index) in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      ></sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import {isExternal} from '@/utils/validate'
import MenuItem from "./Item.vue";
import AppLink from "./Link.vue";
import path from 'path'

export default {
  name: "SidebarItem",
  components: {
    MenuItem,
    AppLink,
  },
  props: {
    item: {
      type: Object,
      require: true,
    },
    //将父级 /system 与子级/user拼接成 /system/user
    basePath:{
      type:String,
      default:''
    }
  },
  data(){
    this.onlyOneChild=null
    return {
      
    }
  },
  methods: {
    resolvePath(routePath) {
      //如果是 http://vue.js.org.com不需要拼接
      if(isExternal(routePath)){
        return routePath
      }

      //如果是 http://vue.js.org.com不需要拼接
      if(isExternal(this.basePath)){
        return this.basePath
      }

      return path.resolve(this.basePath, routePath);
    },

    hasOneShowChild(children,parent){
      //如果没有children，赋值一个空数组
      if(!children){
        children=[]
      }

       const showChild=children.filter(item=>{
        //这里会把没有hidden 或者hidden=false的过滤出来
        //返回的是 首页那个数组 和 后端查询的
         if(item.hidden){
            return false
         }else{
            this.onlyOneChild=item
            return true
         }
       })

       if(showChild.length ===1){
          return true
       }

       if(showChild.length ===0){
        //没有children,onlyOneChild 需要将父级数据复制给onlyOneChild
        //也就是父子合并

        //不过父子合并的时候，需要注意
        //如用户管理 它的上一级是系统管理，在进入用户管理页面之前，它的to路径已经被
        //拼接成 /system/user 需要把
         this.onlyOneChild={
            ...parent,
            path:''
         }
         return true
       }
       return false
    }
  },
};
</script>

<style lang="sass" scoped>
</style>