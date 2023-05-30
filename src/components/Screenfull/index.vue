<template>
    <div>
        <svg-icon :icon-class="isFullScreen?'exit-fullscreen':'fullscreen'"></svg-icon>
    </div>
</template>

<script>
export default {
    name:'ScreenFull',
    data(){
      return {
        isFullScreen:false
      }
    },
    methods:{

    }
}
</script>