<template>
  <div class="register-page">
    <Header title='注册'/>
    <div class="register-form">
      <div class="name-area input-area">
        <div class="register-icon">*立即注册</div>
        <input class="name-input input" type="number" name="search" maxlength="11" placeholder="请输入手机号"
               v-model="registerPhoneNumber">
      </div>
      <div class="pas-area input-area">
        <div class="register-icon">*输入密码</div>
        <input class="pas-input input" type="password" name="search" placeholder="请输入密码" v-model="registerPassWord">
      </div>
      <div class="repeat-pas-area input-area">
        <div class="register-icon">*密码确认</div>
        <input class="pas-input input" type="password" name="search" placeholder="请再次输入密码" v-model="registerRepeatPas">
      </div>
      <div class="sex-area input-area">
        <div class="register-icon">*性别选择</div>
        <div class="sex-check input">
          <div class="sex-item">男</div>
          <div class="sex-item">女</div>
        </div>
      </div>
      <div class="login-container" @click="mobileLogin">注册</div>
    </div>
    <!--提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :tipType="tipType" :alertText="alertText"/>
  </div>
</template>

<script>
  // import {sliderItems, searchplace} from '../../server/api'
  import Header from '../../components/header.vue'
  import {mapMutations} from 'vuex'
  import alertTip from '../../components/common/alertTip'
  import {login} from '../../server/api'

  export default {
    data() {
      return {
        registerPhoneNumber: null, // 电话号码
        userInfo: null, // 获取到的用户信息
        registerPassWord: null, // 密码
        registerRepeatPas: null, // 重复密码
        showAlert: false, // 显示提示组件
        alertText: null,// 提示的内容
        tipType: 'one',          //提示的内容
      }
    },
    mounted() {
    },
    computed: {
      rightPhoneNumber: function () {
        return /^1\d{10}$/gi.test(this.registerPhoneNumber)
      },
      rightPas: function () {
        return this.registerPassWord === this.registerRepeatPas
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO',
      ]),
      async mobileLogin() {
        if (!this.registerPhoneNumber) {
          this.showAlert = true
          this.alertText = '请输入手机号'
          return
        } else if (!this.registerPassWord) {
          this.showAlert = true
          this.alertText = '请输入密码'
          return
        } else if (!this.registerRepeatPas) {
          this.showAlert = true
          this.alertText = '请输入密码'
          return
        } else if (!this.rightPhoneNumber) {
          this.showAlert = true
          this.alertText = '手机号码不正确'
          return
        } else if (!this.rightPas) {
          this.showAlert = true
          this.alertText = '手机号码不正确'
          return
        }
        let userInfoData = await login(this.phoneNumber, this.passWord)
        this.userInfo = userInfoData
        console.log(this.userInfo)

        this.RECORD_USERINFO(this.userInfo)
//        this.$router.go(-1);
      }
    },
    components: {
      Header,
      alertTip,
    }
  }
</script>

<style lang="scss" scoped>
  .register-page {
    .register-form {
      margin: 0 auto;
      width: 638px;
      .input-area {
        width: 100%;
        display: flex;
        height: 96px;
        line-height: 96px;
        margin-bottom: 16px;
        /*border-radius: 24px;*/
        .register-icon {
          flex: 1;
          text-align: left;
        }
        .input {
          flex: 2.6;
          color: #ffffff;
          outline: none;
          &:-ms-input-placeholder {
            color: #ffffff
          }
          &::-webkit-input-placeholder {
            color: #ffffff
          }
          border-radius: 24px;
          /*background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgb(182, 218, 250)), color-stop(100%, rgb(168, 209, 249)));*/
          background: rgb(155, 201, 248);
          padding-left: 20px;
        }
      }
      .sex-area {
        .sex-check {
          display: flex;
          background: none;
          .sex-item {
            flex: 1;
          }
        }
      }
      .login-container {
        height: 105px;
        line-height: 105px;
        background: rgb(58, 178, 237);
        border-radius: 24px;
        text-align: center;
      }
    }
  }
</style>

