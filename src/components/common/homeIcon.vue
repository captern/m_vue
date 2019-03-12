<template>
  <div class="home-icon-page">
    <router-link to="/">
      <div class="home-link">
        <div class="border-one">首页</div>
      </div>
    </router-link>
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
    z-index: 3;
    /*padding-top: 20px;*/
    .home-link {
      box-sizing: border-box;
      float: right;
      color: #ffffff;
      width: 93px;
      /*height: 125px;*/
      height: 93px;
      line-height: 93px;
      text-align: center;
      border-radius: 50%;
      border: 6px solid #3092c2;
      .border-one{
        box-sizing: border-box;
        width: 81px;
        height: 81px;
        line-height: 71px;
        background: #3ab2ed;
        border-radius: 50%;
        border: 6px solid #37a8e0;
      }
    }
  }
</style>
