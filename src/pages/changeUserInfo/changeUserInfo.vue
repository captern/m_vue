<template>
  <div class="change-info-page">
    <Header title='修改个人资料'/>
    <div class="change-area">
      <div class="name-area input-area">
        <div class="register-icon">*立即注册</div>
        <input class="name-input input" type="number" name="search" placeholder="请输入手机号" v-model="registerPhoneNumber">
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
  </div>
</template>

<script>
  import Header from '../../components/header.vue'
  import {mapState, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        userName: null,          //电话号码
//        userInfo: null,                     //获取到的用户信息
      }
    },
    mounted() {
      this.initData()
    },
    computed: {
      ...mapState([
        'userInfo',
      ]),
    },
    methods: {
      initData() {
//        this.userName = this.userInfo.userInfo.userName
      }
    },
    components: {
      Header,
    }
  }
</script>

<style lang="scss" scoped>
  .change-info-page {
    .change-area {
      position: absolute;
      margin: 40px;
      width: calc(100% - 80px);
      height: calc(100% - 180px);;
      background: #ffffff;
      border-radius: 24px;
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

