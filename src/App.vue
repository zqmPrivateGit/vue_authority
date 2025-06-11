<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: "App"
};
</script>

<style>
@import url('./assets/iconfont/iconfont.css');
@import url('./assets/css/resetG6.css');
html,body{
  margin: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-dialog__header {
  border-bottom: 1px solid #dedede;
}
.el-dialog__footer {
  border-top: 1px solid #dedede;
}
.amap-logo , .amap-copyright{
    visibility: hidden !important;
}
::-webkit-scrollbar {
  display: none;
}
</style>
