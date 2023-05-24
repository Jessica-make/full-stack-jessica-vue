<template>
    <div class="app-wraper">
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
    }
}
</script>

<style lang="scss" scoped>
 @import '~@/assets/styles/variables.scss';

 .app-wraper{
    height: 100%;
 }


</style>