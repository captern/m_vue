<template>
  <div class="enlist-page">
    <div class="alert-bkg"></div>
    <section class="tip-area">
      <img class="enlist-title" src="../../common/image/enlist.png" alt="">
      <div class="enlist-main">

      </div>
      <p>您是否要报名</p>
      <div class="confrim-area">
        <div class="confirm-one-left confirm-one-item" @click="closeTip">是</div>
        <div class="confirm-one-mid"></div>
        <!--<div class="confirm-one-right confirm-one-item">去注册</div>-->
        <div class="confirm-one-left confirm-one-item" @click="closeTip">否</div>
      </div>
    </section>
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
      closeTip() {
        this.$emit('closeTip')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes tipMove {
    0% {
      transform: scale(1)
    }
    35% {
      transform: scale(.8)
    }
    70% {
      transform: scale(1.1)
    }
    100% {
      transform: scale(1)
    }
  }

  .alert-bkg {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
  }

  .enlist-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    width: 100%;
    height: 100%;
    border-radius: 24px;
    .tip-area {
      position: absolute;
      top: calc(50% - 368px);
      left: calc(50% - 410px);
      width: 820px;
      height: 842px;
      overflow: hidden;
      animation: tipMove .4s;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 24px;
      text-align: center;
      .enlist-title {
        width: 100%;
        height: 138px;
      }
      .enlist-main {
        width: 639px;
        height: 297px;
        background: red;
        margin: 92px auto 74px;
      }
      p{
        font-size: 38px;
        color: rgb(58, 178, 237);
        height: 46px;
        line-height: 46px;
        margin-bottom: 78px;
      }
      .confrim-area {
        height: 108px;
        line-height: 108px;
        border-top: 0.5px solid #7e8c8d;
        color: rgb(58, 178, 237);
        display: flex;
        .confirm-one-item {
          flex: 10;
          color: rgb(58, 178, 237);
        }
        .confirm-one-mid {
          flex: 0.15;
          background-color: rgb(58, 178, 237);
          height: 70px;
          margin-top: 18px;
          border-radius: 60%;
        }
      }
    }
  }

</style>
