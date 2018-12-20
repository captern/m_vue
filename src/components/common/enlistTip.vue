<template>
  <div class="enlist-page">
    <div class="alert-bkg"></div>
    <section class="tip-area">
      <img class="enlist-title" src="../../common/image/enlist.png" alt="">
      <div class="enlist-main">
        <div class="one line">
          <div class="left">名称 :</div>
          <div class="right">技术服务人才中高级培训课程</div>
        </div>
        <div class="two line">
          <div class="left">时间 :</div>
          <div class="right">2018年11月15日(周四)</div>
        </div>
        <div class="three line">
          <div class="left">地点 :</div>
          <div class="right">上海市徐汇区小木桥路681号外经大厦21楼会议室</div>
        </div>
      </div>
      <p class="confirm-text">您是否要报名</p>
      <div class="confrim-area">
        <div class="confirm-one-left confirm-one-item" @click="closeTip(true)">是</div>
        <div class="confirm-one-mid"></div>
        <!--<div class="confirm-one-right confirm-one-item">去注册</div>-->
        <div class="confirm-one-left confirm-one-item" @click="closeTip(false)">否</div>
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
      closeTip(type) {
        this.$emit('closeTip', type)
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
        border:1px solid #7e8c8d;
        margin: 92px auto 74px;
        .line{
          height: 80px;
          line-height: 80px;
          display: flex;
          font-size: 34px;
          text-align: center;
          border-bottom: 1px solid #7e8c8d;
          .left{
            flex: 1;
            color: rgb(58, 178, 237);
          }
          .right{
            text-align: left;
            flex: 4;
          }
          &.three{
            border-bottom: none;
            padding-top: 20px;
            line-height: 50px;
          }
        }
      }
      .confirm-text{
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
