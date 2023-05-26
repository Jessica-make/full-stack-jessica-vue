<template>
    <div class="app-wraper" :class="objClass">
       <side-bar class="sidebar-container"></side-bar>
       <div class="main-container">
          <div>
             <nav-bar></nav-bar>
             <tags-view></tags-view>
          </div>

          <app-main></app-main>
       </div>
    </div>
</template>


<script>
 import SideBar from './components/Sidebar/index'
 import NavBar from './components/Navbar/index'
 import TagsView from './components/TagsView/index'
 
 import AppMain from './components/AppMain/index'

export default {
    name:'Layout',
    components:{
        SideBar,
        NavBar,
        TagsView,
        AppMain
    },
    created(){
    },
    computed:{
      //由vue管理的 :class 需要返回一个对象
      objClass(){
          return {
            hideSidebar:true
          }
      }
    }
}
</script>

<style lang="scss" scoped>
 @import '~@/assets/styles/variables.scss';

 .app-wraper{
    height: 100%;
 }


</style>