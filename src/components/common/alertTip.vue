<template>
  <div class="tip-page">
    <div class="alert-bkg"></div>
    <section class="tip-area">
      <div class="tip-title">提示</div>
      <!--<p class="tip_text">{{alertText}}</p>-->
      <p class="tip-text">{{alertText}}</p>
      <!--<p class="tip-text">{{tipType}}</p>-->
      <div class="confrim" @click="closeTip" v-if="(tipType == 'one')">{{btnOne ? btnOne : '确定' }}</div>
      <div class="confrim confirm-one" v-else-if="(tipType == 'two')">
        <div class="confirm-one-left confirm-one-item" @click="closeTip">关闭</div>
        <div class="confirm-one-mid"></div>
        <!--<div class="confirm-one-right confirm-one-item">去注册</div>-->
        <router-link to="/register" class="confirm-one-right confirm-one-item">去注册</router-link>
      </div>
      <div class="confrim confirm-one" v-else-if="(tipType == 'three')">
        <div class="confirm-one-left confirm-one-item" @click="closeTip">{{btnOne}}</div>
        <div class="confirm-one-mid"></div>
        <!--<div class="confirm-one-right confirm-one-item">去注册</div>-->
        <div class="confirm-one-right confirm-one-item" @click="confirmTip">{{btnTwo}}</div>
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
    props: ['alertText', 'tipType','btnOne','btnTwo'],
    methods: {
      closeTip() {
        this.$emit('closeTip')
      },
      confirmTip() {
        this.$emit('confirmTip')
        this.closeTip()
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
    /*position: absolute;*/
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
      top: 390px;
      left: calc(50% - 249.5px);
      width: 499px;
      height: 231px;
      overflow: hidden;
      animation: tipMove .4s;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 24px;
      text-align: center;
      .tip-title {
        height: 67px;
        line-height: 77px;
        font-size: 28px;
        color: rgb(134, 134, 134);
      }
      .tip-text {
        font-size: 25px;
        height: 96px;
        line-height: 76px;
        overflow: hidden;
      }
      .confrim {
        height: 65px;
        line-height: 65px;
        border-top: 0.5px solid #7e8c8d;
        color: rgb(58, 178, 237);
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
            height: 40px;
            margin-top: 12.5px;
            border-radius: 60%;
          }
        }
      }
    }
  }

</style>
