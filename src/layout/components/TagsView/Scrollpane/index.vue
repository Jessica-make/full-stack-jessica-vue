<template>
  <el-scrollbar :vertical="false" class="scroll-container">
   <slot/>
  </el-scrollbar>
</template>

<script>
export default {
    name:'Scrollpane'
}
</script>

<style scoped lang="scss">
  .scroll-container{

  }
</style>