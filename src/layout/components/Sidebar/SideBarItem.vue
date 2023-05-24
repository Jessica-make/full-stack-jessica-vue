<template>
  <div v-if="!item.hidden">
    <template v-if="!item.children">
      <app-link :to="basePath">
        <el-menu-item index="basePath">
          <menu-item
            :icon="item.meta.icon"
            :title="item.meta.title"
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
  },
};
</script>

<style lang="sass" scoped>
</style>