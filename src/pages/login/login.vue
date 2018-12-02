<template>
  <div class="login-page">
    <Header title='登录'/>
    <p>{{this.userInfo}}</p>
    <div class="loginForm">
      <div class="name-area input-area">
        <div class="login-icon">ac</div>
        <!--<input class="name-input input" type="number" name="search" placeholder="手机号" v-model="phoneNumber">-->
        <input class="name-input input" type="number" name="search" placeholder="13122767084" v-model="phoneNumber">
      </div>
      <div class="pas-area input-area">
        <div class="login-icon">cas</div>
        <input class="pas-input input" type="password" name="search" placeholder="密码" v-model="passWord">
      </div>
      <div class="check-area">
        <div class="check">
          <input type="checkbox"/>记住密码
        </div>
        <div class="register-link">立即注册</div>
      </div>
      <div class="login-container" @click="mobileLogin">登录</div>
      {{userInfo}}
    </div>
  </div>
</template>

<script>
  import {sliderItems, searchplace} from '../../server/api'
  import Slider from '../../base/slider/slider'
  import Header from '../../components/header.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'
  import {mapState, mapMutations} from 'vuex'
  import {mobileCode, checkExsis, sendLogin, getcaptchas, login} from '../../server/api'

  export default {
    data() {
      return {
        showPassword: false,      // 是否显示密码
        phoneNumber: null,        //电话号码
        userInfo: null,           //获取到的用户信息
        userAccount: null,        //用户名
        passWord: null,           //密码
        showAlert: false,         //显示提示组件
        alertText: null,          //提示的内容
      }
    },
    mounted() {
    },
    computed: {
//      ...mapState([
////        'userInfo'
//        'RECORD_USERINFO',
//      ]),
      //检测手机号码
      rightPhoneNumber: function () {
        return /^1\d{10}$/gi.test(this.phoneNumber)
      }
    },
    methods: {
      ...mapMutations([
        'RECORD_USERINFO',
      ]),
      async mobileLogin() {
        if (!this.phoneNumber) {
          this.showAlert = true;
          this.alertText = '请输入手机号';
          alert('请输入手机号')
          return
        } else if (!this.passWord) {
          this.showAlert = true;
          this.alertText = '请输入密码';
          alert('请输入密码')
          return
        } else if (!this.rightPhoneNumber) {
          this.showAlert = true;
          this.alertText = '手机号码不正确';
          alert('手机号码不正确')
          return
        }
        //用户名登录
        let userInfoData = await login(this.phoneNumber, this.passWord);
        this.userInfo = userInfoData
        console.log(this.userInfo)

        this.RECORD_USERINFO(this.userInfo);
//        this.$router.go(-1);
      }
    },
    components: {
      Slider,
      Header,
      TwoLanguageTitle
    }
  }
</script>

<style lang="scss" scoped>
  .login-page {
    .loginForm {
      margin: 0 auto;
      width: 667px;
      .input-area {

        width: 100%;
        background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgb(182, 218, 250)), color-stop(100%, rgb(168, 209, 249)));
        display: flex;
        height: 106px;

        line-height: 106px;
        margin-bottom: 16px;
        border-radius: 24px;
        .login-icon {
          flex: 1;
          text-align: center;
        }
        .input {
          flex: 8;
          color: #ffffff;
          outline: none;
          background-color: rgba(255, 255, 255, 0);
          &:-ms-input-placeholder {
            color: #ffffff
          }
          &::-webkit-input-placeholder {
            color: #ffffff
          }
        }
      }
      .check-area {
        height: 106px;
        line-height: 106px;
        display: flex;
        .check, .register-link {
          flex: 1;
        }
        .register-link {
          text-align: right;
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

