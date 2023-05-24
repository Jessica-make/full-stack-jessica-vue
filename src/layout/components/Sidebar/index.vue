<template>
    <div>
        <logo/>
        <el-scrollbar>
            <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :background-color="variables.menuBackground"
      text-color="#fff"
      :unique-opened="true"
      active-text-color="#ffd04b">
      <sidebar-item 
        v-for="(route,index) in sidebarRoutes"
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

 import { getRouters } from '@/api/login';

export default {
    name:"Sidebar",
    data(){
        return {
            variables,
            sidebarRoutes:[]
        }
    },
    components:{
        Logo,
        SidebarItem
    },
    created(){
      this.getRoutersList()
    },
    methods:{
        getRoutersList(){
            getRouters().then(res=>{
            this.sidebarRoutes=res.data
        })
      }
    }
}
</script>

<style scoped lang="scss">
  .el-scrollbar{
    height: calc(100% - 50px);
  }
</style>