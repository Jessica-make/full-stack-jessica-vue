<template>
    <div>
      <svg-icon icon-class="github" @click="goto"></svg-icon>
    </div>
</template>

<script>
export default {
    name:'JessicaGit',
    methods:{
        goto(){
            window.open('https://github.com/Jessica-make/full-stack-jessica-vue')
        }
    }
}
</script>

<style scoped>

</style>