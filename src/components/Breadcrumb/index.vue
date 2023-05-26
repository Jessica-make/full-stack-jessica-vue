<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
      <span v-if="index === levelList.length-1 || item.redirect === 'noRedirect' ">{{ item.meta.title }}</span>
      <a v-else @click="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      this.getBreadCrumb();
    },
  },
  created(){
    this.getBreadCrumb();
  },
  methods: {
    getBreadCrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );

      //需要判断第0个path是不是首页,
      //如果不是首页,需要拼接为 首页/系统管理/用户管理
      const first=matched[0]
      if(!this.isDashBoard(first)){
         matched=[{path:'/index',meta:{title:'首页'}}].concat(matched)
      }

      this.levelList = matched;
    },

    handleLink(item){
      const {path}=item
      this.$router.push(path)
    },

    isDashBoard(route){
        const name=route && route.name
        //如果没有name 返回false
        if(!name){
          return false
        }
        return name.trim() === 'Index'
    }
  },
};
</script>

<style scoped lang="scss">
.app-breadcrumb .el-breadcrumb {
  font-size: 14px;
}
</style>