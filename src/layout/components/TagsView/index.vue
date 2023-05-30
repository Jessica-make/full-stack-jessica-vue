<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path }"
        tag="span"
        class="tags-view-item"
      >
        {{ tag.title }}

        <!-- !isAffix 不是付着物，表示非首页，可以展示叉号 elementUI 自带关闭图标 -->
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import ScrollPane from "./Scrollpane/index";

export default {
  name: "TagsView",
  components: {
    ScrollPane,
  },
  mounted() {
    //页面初次加载，把首页放到 visitedViews里面去
    this.addTags();
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
  },
  watch: {
    //路由有变化 就会触发里面的方法
    $route() {
      this.addTags();
    },
  },
  methods: {
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
    },
    isActive(route) {
      //判断遍历的路由，找到和当前路由路径相等的，然后返回true
      return route.path === this.$route.path;
    },
    closeSelectedTag(tag) {
      this.$store.dispatch('tagsView/delView',tag).then(({visitedViews})=>{
        //如果当前标签是高亮状态，需要找到数组最后一个，然后路由到最后一个页面
        if(this.isActive(tag)){
            this.toLastView(visitedViews)
        }
      })
    },
    toLastView(visitedViews){
      //visitedViews.slice(-1) 返回的是最后一个值 不过在数组里面
      const latestView=visitedViews.slice(-1)[0]
      if(latestView){
        this.$router.push(latestView.fullPath)
      }
    },
    //首页是粘上的，不能删除
    isAffix(tag){
      return tag.meta && tag.meta.affix
    }
  },
};
</script>

<style scoped lang="scss">
.tags-view-container {
  height: 34px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      height: 26px;
      line-height: 26px;

      border: 1px solid #d8dce5;
      padding: 0 8px;
      margin-left: 5px;
      margin-top: 4px;
      color: #495060;
      background: #fff;
      font-size: 12px;
      cursor: pointer;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        //在元素前面加一个圆点
        &::before {
          content: "";
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 50%;
          margin-right: 2px;
          background-color: #fff;
        }
      }

      .el-icon-close {
        //把x图标调小
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        vertical-align: 2px;

        &::before{
          //缩放
           transform: scale(0.6);
           vertical-align: -2px;
        }

        &:hover{
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
}
</style>