<template>
  <div class="navbar">
    <hamburger
      class="hamburger-container"
      :is-active="sidebar.opened"
      @toggleClick="toggleSideBar"
    ></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>

    <div class="right-menu">
      <header-search class="right-menu-item" />
      <el-tooltip content="源码地址" placement="bottom" effect="dark">
        <jessica-git class="right-menu-item"></jessica-git>
      </el-tooltip>

      <screen-full class="right-menu-item"></screen-full>

      <el-tooltip content="布局大小" placement="bottom" effect="dark">
        <size-select class="right-menu-item"></size-select>
      </el-tooltip>

      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" alt="" />
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>

          <el-dropdown-item>
            <span>布局设置</span>
          </el-dropdown-item>

          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from "@/components/Hamburger/index";
import Breadcrumb from "@/components/Breadcrumb/index";
import HeaderSearch from "@/components/HeaderSearch/index";

import JessicaGit from "@/components/JessicaGit/index";
import ScreenFull from "@/components/Screenfull/index";
import SizeSelect from "@/components/SizeSelect/index";

import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  components: {
    Hamburger,
    Breadcrumb,
    HeaderSearch,
    JessicaGit,
    ScreenFull,
    SizeSelect,
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout(){
      this.$confirm('确定注销并退出登录','提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$store.dispatch('LogOut').then(()=>{
          window.location.href='/'
        })
      })
    }
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
};
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.hamburger-container {
  height: 100%;
  line-height: 46px;
  float: left;
  padding: 0 15px;
  cursor: pointer;
}

.breadcrumb-container {
  height: 100%;
  line-height: 50px;
  float: left;
  margin-left: 8px;
}

.right-menu {
  float: right;
  height: 100%;
  line-height: 46px;

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    vertical-align: text-bottom; //基于底座对齐
  }

  .avatar-container {
    margin-right: 30px;
    .avatar-wrapper {
      margin-top: 5px;
      .user-avatar {
        width: 40px;
        height: 40px;
        cursor: pointer;
        border-radius: 10px;
        // padding: 5px 0;
      }
    }
  }
}
</style>