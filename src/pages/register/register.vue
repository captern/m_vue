<template>
  <div class="register-page" v-wechat-title="$route.meta.title='注册'">
    <Header title='注册'/>
    <div class="register-form">
      <div class="name-area input-area">
        <div class="register-icon"><span>*</span>立即注册</div>
        <input class="name-input input" type="phone" name="search" maxlength="11" placeholder="请输入手机号"
               v-model="registerPhoneNumber" v-focus="this.focus">
      </div>
      <div class="pas-area input-area">
        <div class="register-icon"><span>*</span>输入密码</div>
        <input class="pas-input input" type="password" name="search" placeholder="请输入密码" v-model="registerPassWord" v-focus="this.focus">
      </div>
      <div class="repeat-pas-area input-area">
        <div class="register-icon"><span>*</span>密码确认</div>
        <input class="pas-input input" type="password" name="search" placeholder="请再次输入密码" v-model="registerRepeatPas" v-focus="this.focus">
      </div>
      <div class="sex-area input-area">
        <div class="register-icon"><span>*</span>性别选择</div>
        <div class="sex-check input">
          <div class="sex-item" @click="changeSex()">
            <span class="sex-icon">
              <img v-if="this.sex === '1'" src="../../common/image/sex-check.png" alt="">
              <img v-else src="../../common/image/sex-no.png" alt="">
            </span>
            男
          </div>
          <div class="sex-item" @click="changeSex()">
            <span class="sex-icon">
              <img v-if="this.sex === '1'" src="../../common/image/sex-no.png" alt="">
              <img v-else src="../../common/image/sex-check.png" alt="">
            </span>
            女
          </div>
        </div>
      </div>
      <div class="register-container" @click="mobileRegister">注册</div>
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
  import {register} from '../../server/api'

  export default {
    data() {
      return {
        registerPhoneNumber: null, // 电话号码
        userInfo: null, // 获取到的用户信息
        registerPassWord: null, // 密码
        registerRepeatPas: null, // 重复密码
        sex: '1',           //性别
        showAlert: false, // 显示提示组件
        alertText: null,// 提示的内容
        tipType: 'one',          //提示的内容
        focus: null
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
        'GET_LOGIN',
        'RECORD_USERINFO',
      ]),
      changeSex() {
        if (this.sex === '1') {
          this.sex = '2'
        } else if (this.sex === '2') {
          this.sex = '1'
        }
      },
      async mobileRegister() {
        this.focus = ''
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
        let userRegisterData = await register(this.registerPhoneNumber, this.registerPassWord, this.sex)
        console.log(userRegisterData)
        if (userRegisterData.status) {
//          设置登录状态为成功
          this.GET_LOGIN()
          this.$router.push('/index');
        } else {
          this.showAlert = true
          this.alertText = userRegisterData.msg
        }
      }
    },
    components: {
      Header,
      alertTip,
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
  }
</script>

<style lang="scss" scoped>
  .register-page {
    .register-form {
      margin: 250px auto 0;
      width: 638px;
      .input-area {
        width: 100%;
        display: flex;
        height: 96px;
        line-height: 96px;
        margin-bottom: 22px;
        font-size: 0;
        /*border-radius: 24px;*/
        .register-icon {
          flex: 1.2;
          text-align: left;
          color: #ffffff;
          font-size: 36px;
          span {
            display: inline-block;
            font-size: 50px;
            vertical-align: middle;
            padding-top: 8px;
            padding-right: 4px;
          }
        }
        .input {
          flex: 2.6;
          color: #ffffff;
          outline: none;
          font-size: 30px;
          &:-ms-input-placeholder {
            color: #ffffff
          }
          &::-webkit-input-placeholder {
            color: #ffffff
          }
          border-radius: 24px;
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
            .sex-icon {
              vertical-align: middle;
              font-size: 0;
              img {
                width: 30px;
                height: 30px;
                vertical-align: middle;
                margin-top: -2px;
              }
            }
          }
        }
      }
      .register-container {
        height: 105px;
        line-height: 105px;
        background: rgb(58, 178, 237);
        font-size: 42px;
        color: #ffffff;
        border-radius: 24px;
        text-align: center;
        margin-top: 40px;
      }
    }
  }
</style>

