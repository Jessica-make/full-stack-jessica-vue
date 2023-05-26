<template>
    <div>
        <logo :collapse="isCollapse"/>
        <el-scrollbar>
            <el-menu
      default-active="2"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      :background-color="variables.menuBackground"
      text-color="#fff"
      :unique-opened="true"
      active-text-color="#ffd04b">
      <sidebar-item 
        v-for="(route,index) in sidebarRouters"
        :item="route"
        :key="route.path + index"
        :base-path="route.path"
      >
      </sidebar-item>
    </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
 import Logo from './Logo.vue'
 import variables from '@/assets/styles/variables.scss'
 import SidebarItem from './SideBarItem.vue'
 import { mapGetters } from 'vuex'


export default {
    name:"Sidebar",
    data(){
        return {
            variables
        }
    },
    components:{
        Logo,
        SidebarItem
    },
    computed:{
      ...mapGetters(['sidebarRouters','sidebar']),
      isCollapse(){
        return !this.sidebar.opened
      }
    }
}
</script>

<style scoped lang="scss">
  .el-scrollbar{
    height: calc(100% - 50px);
  }
</style>