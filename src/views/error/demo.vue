<template>
    <div>
      <button @click="handleClick">左键点击</button>
      <button v-on:click.middle.native="handleMiddleClick">中间按钮点击</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      handleClick() {
        console.log('左键点击');
      },
      handleMiddleClick() {
        console.log('中间按钮点击');
      }
    }
  }
  </script>
  