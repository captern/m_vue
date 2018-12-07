<template>
  <!--<div id="app" @touchmove.prevent>-->
  <div id="app">
    <!--keep-alive 为了将页面状态缓存，防止重新渲染-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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

  #app {
    /*background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgb(99, 152, 243)), color-stop(130%, rgb(207, 163, 92)));*/

    background: -moz-linear-gradient(top left, rgb(99, 152, 243) 0%, rgb(207, 163, 92) 130%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgb(99, 152, 243)), color-stop(130%, rgb(207, 163, 92)));
    background: -webkit-linear-gradient(top left, rgb(99, 152, 243) 0%, rgb(207, 163, 92) 130%);
    background: -o-linear-gradient(top left, rgb(99, 152, 243) 0%, rgb(207, 163, 92) 130%);
    background: -ms-linear-gradient(top left, rgb(99, 152, 243) 0%, rgb(207, 163, 92) 130%);
    background: linear-gradient(to bottom right, rgb(99, 152, 243) 0%, rgb(207, 163, 92) 130%);
    position: absolute;
    width: 100%;
    min-height: 100%;
  }
</style>
