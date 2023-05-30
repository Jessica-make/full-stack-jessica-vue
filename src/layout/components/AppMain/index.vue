<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
        <!-- :include="cachedViews" 缓存路由 -->
      <keep-alive :include="cachedViews">
        <!-- v-if="!$route.meta.link" 表示没有外部连接 :key 读取的是路由的path -->
        <router-view v-if="!$route.meta.link" :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    key() {
      return this.$route.path
    }
  }
};
</script>