<template>
    <svg :class="svgClass" aria-hidden="true">
       <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
export default {
    name:'SvgIcon',
    props:{
      className:{
        type:String,
        default:''
      },
      iconClass:{
        type:String,
        require:true
      }
    },
    computed:{
        svgClass(){
          if(this.className){
            return 'svg-icon '+this.className
          }else{
            //如果没有传className样式，直接返回
            return 'svg-icon'
          }
        },
        iconName(){
            return `#icon-${this.iconClass}`
        } 
    }
}
</script>

<style scoped>
   .svg-icon{
    width: 1em;
    height: 1em;
    /* 和字体颜色保持一致 */
    fill: currentColor;
   }
</style>