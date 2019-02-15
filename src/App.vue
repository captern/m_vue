<template>
  <!--<div id="app" @touchmove.prevent>-->
  <div id="app">
    <!--keep-alive 为了将页面状态缓存，防止重新渲染-->
    <!--<keep-alive>-->
      <!--<router-view></router-view>-->
    <!--</keep-alive>-->
    <router-view></router-view>
    <!--<router-link to="/recommend">cdascdscsacs</router-link>-->
  </div>
</template>

<script>
  export default {
    components: {}
  }
</script>

<style lang="scss">
  @import "common/stylus/index";

  /*#app {*/
    /*background: url("./common/image/bkg.png");*/
    /*background-size: 100% 100%;*/
    /*height: 100%;*/
    /*position: fixed;*/
    /*width: 100%;*/
    /*overflow: scroll;*/
  /*}*/
</style>
