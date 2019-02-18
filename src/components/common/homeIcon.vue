<template>
  <div class="home-icon-page">
    <router-link to="/" class="home-link">首页</router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        positionY: 0,
        timer: null,
      }
    },
    mounted() {

    },
    props: ['alertText'],
    methods: {
      closeTip(type) {
        this.$emit('closeTip', type)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-icon-page{
    height: 93px;
    position: fixed;
    bottom: 177px;
    right: 44px;
    font-size: 24px;
    /*padding-top: 20px;*/
    .home-link {
      float: right;
      color: #ffffff;
      width: 93px;
      /*height: 125px;*/
      line-height: 93px;
      text-align: center;
      border-radius: 50%;
      background: #3ab2ed;
    }
  }
</style>
