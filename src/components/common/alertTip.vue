<template>
  <div class="tip-page">
    <div class="alert-bkg"></div>
    <section class="tip-area">
      <div class="tip-title">提示</div>
      <!--<p class="tip_text">{{alertText}}</p>-->
      <p class="tip-text">{{alertText}}</p>
      <!--<p class="tip-text">{{tipType}}</p>-->
      <div class="confrim" @click="closeTip" v-if="(tipType === 'one')">确认</div>
      <div class="confrim confirm-one" v-else-if="(tipType === 'two')">
        <div class="confirm-one-left confirm-one-item" @click="closeTip">关闭</div>
        <div class="confirm-one-mid"></div>
        <!--<div class="confirm-one-right confirm-one-item">去注册</div>-->
        <router-link to="/register" class="confirm-one-right confirm-one-item">去注册</router-link>
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
    props: ['alertText', 'tipType'],
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

  .tip-page {
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
      top: 715px;
      left: calc(50% - 410px);
      width: 820px;
      height: 379px;
      overflow: hidden;
      animation: tipMove .4s;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 24px;
      text-align: center;
      .tip-title {
        height: 126px;
        line-height: 126px;
        font-size: 48px;
        color: rgb(134, 134, 134);
      }
      .tip-text {
        font-size: 36px;
        height: 146px;
        line-height: 146px;
        overflow: hidden;
      }
      .confrim {
        height: 108px;
        line-height: 108px;
        border-top: 0.5px solid #7e8c8d;
        &.confirm-one {
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
  }

</style>
