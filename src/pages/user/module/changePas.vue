<template>
  <div class="change-info-page" v-wechat-title="$route.meta.title='修改密码'">
    <Header title='修改密码'/>
    <div class="change-area">
      <div class="change-form">
        <div class="name-area change-item">
          <div class="item-left"><span>*</span>密 码 ：</div>
          <input class="item-right" type="password" name="name" placeholder="输入新密码" v-model="newPassword">
        </div>
        <div class="IdCard-area change-item">
          <div class="item-left"><span>*</span>确认密码 ：</div>
          <input class="item-right" type="password" name="IdCard" placeholder="输入新密码再次确认" v-model="repeatPassword">
        </div>

        <div class="change-info" @click="changePas">保存</div>
        <!--<div class="login-container">保存</div>-->
      </div>
    </div>
    <!--提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :tipType="tipType" :alertText="alertText"/>
    <alert-tip v-if="showSuccessAlert" @closeTip="changeSucess" :tipType="tipType" :alertText="alertText"/>

  </div>
</template>

<script>
  import Header from '../../../components/header.vue'
  import {mapMutations, mapState} from 'vuex'
  import alertTip from '../../../components/common/alertTip'
  import {getUser, changePas} from '../../../server/api'
  import {getStore} from '../../../config/mUtils'

  export default {
    data() {
      return {
        user_id: null,
        newPassword: null,
        repeatPassword: null,
        showAlert: false, // 显示提示组件
        showSuccessAlert: false, // 显示提示组件
        alertText: null,// 提示的内容
        tipType: 'one',          //提示的内容
        phoneNum: '',
      }
    },
    mounted() {
      this.phoneNum = this.$route.params.phoneNum;
      console.log(this.phoneNum)
      this.initData()
    },
    computed: {
      rightPas: function () {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IdCard)
      }
    },
    methods: {
      initData() {
        if (getStore('user_id')) {
          // 修改密码无个人信息展示型东西，估 不用获取，  因为后台cookie 自带用户信息
          // getUser().then(res => {})
        }else{
//          console.log('用户未登录')
//          this.$router.push('/index');
        }
      },
      changeSucess(){   // 控制修改成功之后,返回个人中心
        // this.$router.go(-1);
        this.$router.push('/user');
      },
      async changePas() {
        if (!this.newPassword) {
          this.showAlert = true;
          this.alertText = '请输入新密码';
          return
        } else if (!this.repeatPassword) {
          this.showAlert = true;
          this.alertText = '输入新密码再次确认';
          return
        }
//        else if (this.newPassword !== this.repeatPassword) {
//          this.showAlert = true;
//          this.alertText = '两次输入密码不一致';
//          return
//        }
        // 发送重置信息
        let res = await changePas(this.newPassword, this.repeatPassword, this.phoneNum ? this.phoneNum : '');
        if (res.status) {
          this.showSuccessAlert = true;
          this.alertText = '密码修改成功';
          // setTimeout(function () {
          //
          // },500)
        }else{
          this.showAlert = true;
          this.alertText = res.msg;
        }
      }
    },
    components: {
      Header,
      alertTip
    },
    watch:{
      showAlert:function(val,oldval){
        if(val){
          window.scrollTo(0, document.documentElement.clientHeight);
        }
      }
    },//以V-model绑定数据时使用的数据变化监测
  }
</script>

<style lang="scss" scoped>
  .change-info-page {
    background: url("../../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    height: 100%;
    min-height: 100vh;
    /*background-position: fixed;*/
    /*position: fixed;*/
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    .change-area {
      position: absolute;
      /*margin: 40px;*/
      margin: 25px;
      width: calc(100% - 50px);
      /*width: calc(100% - 80px);*/
      /*height: calc(100% - 180px);;*/
      height: calc(100% - 56px);
      background: #ffffff;
      /*border-radius: 24px;*/
      border-radius: 15px;
      .change-form {
        /*width: 669px;*/
        width: 440px;
        /*margin: 231px auto 0;*/
        margin: 144px auto 0;
        color: rgb(58, 178, 237);
        .change-item {
          width: 100%;
          display: flex;
          /*height: 96px;*/
          height: 60px;
          /*line-height: 96px;*/
          line-height: 60px;
          /*margin-bottom: 16px;*/
          margin-bottom: 10px;
          /*border-radius: 24px;*/
          .item-left {
            flex: 1.4;
            text-align: right;
            /*font-size: 36px;*/
            font-size: 22px;
            span {
              display: inline-block;
              /*font-size: 50px;*/
              font-size: 31px;
              vertical-align: middle;
              padding-top: 5px;
              /*padding-top: 8px;*/
              /*padding-right: 4px;*/
              padding-right: 2.5px;
            }
          }
          .item-right {
            /*margin-left: 10px;*/
            margin-left: 6.5px;
            flex: 2.2;
            color: #ffffff;
            outline: none;
            &:-ms-input-placeholder {
              color: #ffffff
            }
            &::-webkit-input-placeholder {
              color: #ffffff
            }
            /*border-radius: 24px;*/
            border-radius: 15px;
            background: rgb(225, 225, 225);
            /*padding-left: 20px;*/
            padding-left: 12.5px;
            &.sex-check {
              color: rgb(58, 178, 237);
              display: flex;
              background: none;
              .sex-item {
                flex: 1;
              }
            }
          }
          .phone-number {
            background: none;
            color: rgb(58, 178, 237);
          }
        }
      }
      .change-info {
        color: #ffffff;
        height: 66px;
        /*height: 105px;*/
        /*line-height: 105px;*/
        line-height: 66px;
        text-align: center;
        background: rgb(58, 178, 237);
        border-radius: 15px;
        /*border-radius: 24px;*/
        /*margin-top: 123px;*/
        margin-top: 77px;
      }
    }
  }
</style>

