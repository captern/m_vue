<template>
  <div class="enlist-page">
    <div class="alert-bkg"></div>
    <section class="tip-area">
      <img class="enlist-title" src="../../common/image/enlist.png" alt="">
      <div class="enlist-main">
        <div class="one line">
          <div class="left">名称 : </div>
          <div class="right">{{lessonData.name}}</div>
        </div>
        <div class="two line">
          <div class="left">时间 :</div>
          <div class="right">{{lessonData.study_time}}</div>
        </div>
        <div class="three line">
          <div class="left">地点 :</div>
          <div class="right">{{lessonData.study_addr}}</div>
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
  import {lessonMain, signLesson} from '../../server/lessonApi'
  export default {
    data() {
      return {
        positionY: 0,
        timer: null,
        lessonData: '',
      }
    },
    mounted() {
      this.getMain();
    },
    props: ['alertText', 'couId'],
    methods: {
      getMain(){
        let getData = {
          id: this.couId
        }
        lessonMain(getData).then(res => {
          this.lessonData = res.data
        })
      },
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
      top: calc(50% - 268px);
      left: calc(50% - 247px);
      width: 494px;
      overflow: hidden;
      animation: tipMove .4s;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 24px;
      text-align: center;
      .enlist-title {
        width: 100%;
        height: 74px;
      }
      .enlist-main {
        width: 384px;
        border-top:1px solid #7e8c8d;
        margin: 56px auto 44px;
        .line{
          height: 53px;
          line-height: 53px;
          display: flex;
          font-size: 23px;
          text-align: center;
          border-bottom: 1px solid #7e8c8d;
          .left{
            flex: 1;
            color: rgb(58, 178, 237);
          }
          .right{
            text-align: left;
            flex: 4;
            color: rgb(35, 24, 21);
            overflow: hidden;
          }
          &.three{
            padding-top: 20px;
            padding-bottom: 20px;
            line-height: 28px;
          }
        }
      }
      .confirm-text{
        font-size: 28px;
        color: rgb(58, 178, 237);
        padding-bottom: 48px;
      }
      .confrim-area {
        height: 78px;
        line-height: 78px;
        border-top: 0.5px solid #7e8c8d;
        color: rgb(58, 178, 237);
        font-size: 28px;
        display: flex;
        .confirm-one-item {
          flex: 10;
          color: rgb(58, 178, 237);
        }
        .confirm-one-mid {
          flex: 0.15;
          background-color: rgb(58, 178, 237);
          height: 40px;
          margin-top: 18px;
          border-radius: 60%;
        }
      }
    }
  }

</style>
