<template>
  <div class="login-page" v-wechat-title="$route.meta.title='登录'">
    <Header title='登录'/>
    <div class="logo-area">
      <img class="logo" src="../../common/image/logo.png" alt="logo">
      <div class="logo-name"></div>
    </div>
    <div class="loginForm">
      <div class="name-area input-area">
        <div class="login-icon">
          <img class="icon phone" src="../../common/image/phone-icon.png"/>
        </div>
        <!--<input class="name-input input" type="number" name="search" placeholder="手机号" v-model="phoneNumber">-->
        <input class="name-input input" type="phone" name="search" maxlength="11" placeholder="手机号"
               v-model="phoneNumber" v-focus="this.focus">
      </div>
      <div class="pas-area input-area">
        <div class="login-icon">
          <img class="icon pas" src="../../common/image/pas-icon.png"/>
        </div>
        <input class="pas-input input" type="password" name="search" placeholder="密码" v-model="passWord"
               v-focus="this.focus">
      </div>
      <div class="check-area">
        <div class="check">
          <input class="rember-check" type="checkbox" checked/>记住密码
        </div>
        <router-link :to="'/forgetPas'" class="forget-pas-link">忘记密码</router-link>
        <!--<div class="register-link">立即注册</div>-->
      </div>
      <div class="login-container" @click="mobileLogin">登录</div>
      <div class="register-link">
        <router-link :to="'/register'">立即注册</router-link>
      </div>
    </div>
    <!--提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :tipType="tipType" :alertText="alertText"/>

  </div>
</template>

<script>
  import {sliderItems, searchplace} from '../../server/api'
  import Slider from '../../components/common/slider'
  import Header from '../../components/header.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import alertTip from '../../components/common/alertTip'
  import {mobileCode, checkExsis, getcaptchas, login} from '../../server/api'

  export default {
    data() {
      return {
        phoneNumber: null,        //电话号码
        userInfo: null,           //获取到的用户信息
        passWord: null,           //密码
        showAlert: false,         //显示提示组件
        alertText: null,          //提示的内容
        tipType: 'one',          //提示的内容
        focus: null
      }
    },
    mounted() {
    },
    computed: {
      //检测手机号码
      rightPhoneNumber: function () {
        return /^1\d{10}$/gi.test(this.phoneNumber)
      }
    },
    methods: {
      ...mapMutations([
        'GET_LOGIN',
      ]),
      ...mapActions([
        'getUserInfo'
      ]),
      async mobileLogin() {
        this.focus = ''
        if (!this.phoneNumber) {
          this.showAlert = true;
          this.alertText = '请输入手机号';
          return
        } else if (!this.passWord) {
          this.showAlert = true;
          this.alertText = '请输入密码';
          return
        } else if (!this.rightPhoneNumber) {
          this.showAlert = true;
          this.alertText = '手机号码不正确';
          return
        }
        //用户名登录
        let userLoginData = await login(this.phoneNumber, this.passWord);
        if (userLoginData.status) {
          //          设置登录状态为成功
          this.GET_LOGIN()
          this.getUserInfo();
          setTimeout(() => {
            this.$router.push('/index');
          }, 800)
          // this.$router.push('/index');
        } else if (!userLoginData.need_register) {
          this.showAlert = true
          this.tipType = 'one'
          this.alertText = userLoginData.msg
        } else {
          this.showAlert = true
          this.tipType = 'two'
          this.alertText = userLoginData.msg
        }
      }
    },
    components: {
      Slider,
      Header,
      alertTip,
      TwoLanguageTitle
    },
    // 自定义指令
    directives: {
      focus: {
        inserted: function (el, {value}) {
          if (value) {
            el.focus();
          }
        }
      }
    },


    watch: {
      showAlert: function (val, oldval) {
        if (val) {
          window.scrollTo(0, document.documentElement.clientHeight);
        }
      }
    },//以V-model绑定数据时使用的数据变化监测

  }
</script>

<style lang="scss" scoped>
  .login-page {
    background: url("../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    height: 100%;
    min-height: 100vh;
    /*background-position: fixed;*/
    /*position: fixed;*/
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    .logo-area {
      /*margin: 259px 0 77px;*/
      margin: 162px 0 48px;
      text-align: center;
      .logo {
        /*width: 390px;*/
        width: 244px;
        /*height: 273px;*/
        height: 170px;
        display: inline-block;
        /*background-color: red;*/
      }
    }
    .loginForm {
      margin: 0 auto;
      /*width: 667px;*/
      width: 417px;
      .input-area {
        width: 100%;
        /*background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgb(182, 218, 250)), color-stop(100%, rgb(168, 209, 249)));*/
        background: -moz-linear-gradient(top left, rgb(182, 218, 250) 0%, rgb(168, 209, 249) 130%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgb(182, 218, 250)), color-stop(130%, rgb(168, 209, 249)));
        background: -webkit-linear-gradient(top left, rgb(182, 218, 250) 0%, rgb(168, 209, 249) 130%);
        background: -o-linear-gradient(top left, rgb(182, 218, 250) 0%, rgb(168, 209, 249) 130%);
        background: -ms-linear-gradient(top left, rgb(182, 218, 250) 0%, rgb(168, 209, 249) 130%);
        background: linear-gradient(to bottom right, rgb(182, 218, 250) 0%, rgb(168, 209, 249) 130%);
        display: flex;
        /*height: 106px;*/
        height: 66px;
        /*line-height: 106px;*/
        line-height: 66px;
        /*margin-bottom: 16px;*/
        margin-bottom: 10px;
        /*border-radius: 24px;*/
        border-radius: 15px;
        .login-icon {
          flex: 1;
          text-align: center;
          font-size: 0;
          .icon {
            /*height: 40px;*/
            height: 25px;
            vertical-align: middle;
            &.phone {
              /*width: 60px;*/
              width: 37.5px;
            }
            &.pas {
              /*width: 45px;*/
              width: 28px;
            }
          }
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
        /*height: 106px;*/
        height: 66px;
        /*line-height: 106px;*/
        line-height: 66px;
        display: flex;
        .check, .forget-pas-link {
          flex: 1;
          color: rgb(114, 113, 113);
        }
        .check {
          .rember-check {
            /*margin-top: -8px;*/
            margin-top: -5px;
            /*margin-right: 10px;*/
            margin-right: 6.25px;
            /*margin-left: 10px;*/
            margin-left: 6.25px;
          }
        }
        .forget-pas-link {
          text-align: right;
        }
      }
      .login-container {
        /*height: 105px;*/
        height: 65px;
        /*line-height: 105px;*/
        line-height: 65px;
        background: rgb(58, 178, 237);
        /*border-radius: 24px;*/
        border-radius: 15px;
        text-align: center;
        color: rgb(255,255,255);
        /*font-size: 42px;*/
        font-size: 26px;
      }
      .register-link{
        width: 100%;
        display: block;
        margin: 21px auto;
        text-align: center;
        a{
          color: rgb(77,77,77);
          font-size: 21px;
        }
      }
    }
  }

  /*input的选中和未选中样式修改*/
  input[type="checkbox"] {
    -webkit-appearance: none;
    vertical-align: middle;
    margin-top: 0;
    background: rgb(114, 113, 113);
    /*border: #ffffff solid 2px;*/
    border: rgb(114, 113, 113) solid 1px;
    /*border-radius: 3px;*/
    border-radius: 1.5px;
    height: 17.5px;
    /*height: 28px;*/
    width: 17.5px;
    /*width: 28px;*/
  }

  input[type="checkbox"]:checked {
    background: rgb(114, 113, 113);
    /*background: #3ab2ed;*/
    position: relative;
  }

  input[type=checkbox]:checked::after {
    content: '';
    top: 1.5px;
    /*top: 3px;*/
    /*left: 3px;*/
    left: 1.5px;
    position: absolute;
    background: transparent;
    /*border: #fff solid 4px;*/
    border: #3ab2ed solid 2.5px;
    border-top: none;
    border-right: none;
    /*height: 8px;*/
    height: 5px;
    /*width: 16px;*/
    width: 10px;
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

</style>

