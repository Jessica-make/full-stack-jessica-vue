<template>
    <div class="sidebar-logo-container" :class="{'collapse':collapse}">
        <router-link v-if="collapse" to="/" class="sidebar-logo-link">
            <img  v-if="logo" :src="logo" class="sidebar-logo"/>
            <h1 v-else class="sidebar-title">{{ title }}</h1>
        </router-link>

        <router-link v-else to="/" class="sidebar-logo-link">
            <img :src="logo" class="sidebar-logo"/>
            <h1 class="sidebar-title">{{ title }}</h1>
        </router-link>
    </div>
</template>

<script>
import logoImg from '@/assets/logo/logo.png'
export default {
    name:'Logo',
    props:{
        collapse:{
            type:Boolean,
            require:true
        }
    },
    data(){
        return {
            logo:logoImg,
            title:"小龙管理系统"
        }
    }
}
</script>

<style scoped lang="scss">
  .sidebar-logo-container{
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;

    .sidebar-logo-link{
       width: 100%;
       height: 100%;
       display: inline-block;
       
       .sidebar-logo{
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 12px;
       }

       .sidebar-title{
        display: inline-block;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
       }
    }

     & .collapse{
        .sidebar-logo-link{
            .sidebar-logo{
            margin-right: 0px;
          }
        }
     }
  }

  
</style>