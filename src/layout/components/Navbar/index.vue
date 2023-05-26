<template>
  <div class="navbar">
    <hamburger class="hamburger-container" :is-active="sidebar.opened" @toggleClick="toggleSideBar"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
        right
    </div>
  </div>
</template>

<script>
 import Hamburger from '@/components/Hamburger/index'
 import Breadcrumb from '@/components/Breadcrumb/index'

 import { mapGetters } from 'vuex';

export default {
  name: "NavBar",
  components:{
    Hamburger,
    Breadcrumb
  },
  methods:{
    toggleSideBar(){
       this.$store.dispatch('app/toggleSideBar')
    }
  },
  computed:{
    ...mapGetters(['sidebar'])
  }
};
</script>

<style scoped>
.navbar {
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.hamburger-container{
    height: 100%;
    line-height: 46px;
    float: left;
    padding: 0 15px;
    cursor: pointer;
}

.breadcrumb-container{
    height: 100%;
    line-height: 50px;
    float: left;
    margin-left: 8px;
}

.right-menu{
    float: right;
    height: 100%;
    line-height: 46px;
}
</style>