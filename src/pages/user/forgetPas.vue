<template>
  <div class="register-page" v-wechat-title="$route.meta.title='忘记密码'">
    <Header title='忘记密码'/>
    <div class="register-form">
      <div class="name-area input-area">
        <div class="register-icon"><span>*</span>手机号码</div>
        <input class="name-input input" type="phone" name="search" maxlength="11" placeholder="请输入手机号"
               v-model="registerPhoneNumber" v-focus="this.focus">
      </div>
      <div class="code-area input-area">
        <div class="register-icon"><span>*</span>短信验证码</div>
        <div class="code-btn-area">
          <input class="code-input" type="phone" name="search" maxlength="11" placeholder="请输入验证码"
                 v-model="codeNum" v-focus="this.focus">
          <div class="code-btn" @click="getCode">{{code.text}}</div>
        </div>

      </div>
      <div class="post-btn" @click="postCheck">下一步</div>
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
  import {register, mobilePasCode, checkPasCode} from '../../server/api'

  export default {
    data() {
      return {
        registerPhoneNumber: null, // 电话号码
        showAlert: false, // 显示提示组件
        alertText: null,// 提示的内容
        tipType: 'one',          //提示的内容
        codeNum: "",
        getCodeLock: '',
        code: {
          disabled: false,
          text: "获取验证码"
        },
        focus: null
      }
    },
    mounted() {
    },
    computed: {
      rightPhoneNumber: function () {
        return /^1\d{10}$/gi.test(this.registerPhoneNumber)
      },
    },
    methods: {
      ...mapMutations([
        'GET_LOGIN',
        'RECORD_USERINFO',
      ]),
      getCode() {
        if(!this.getCodeLock){
          if(this.rightPhoneNumber){
            mobilePasCode(this.registerPhoneNumber).then(res=> {
              if(res.status){
                this.showAlert = true
                this.alertText = '验证码发送成功'
              }else{
                this.showAlert = true
                this.alertText = res.msg
              }
            })
            this.setTime()
            this.getCodeLock = true
          }else{
            this.showAlert = true
            this.alertText = '手机号码不正确'
          }
        }

      },
      // 倒计时
      setTime(timelimit = 60) {
        if(!this.getCodeLock){
          let self = this;
          self.countdown = timelimit;
          self.timer = setInterval(() => {
            self.countdown--;
            self.code = {
              disabled: true,
              text: "等待" + self.countdown + "秒"
            };
            if (self.countdown === 0) {
              clearInterval(self.timer);
              self.timer = null;
              self.countdown = 60;
              self.getCodeLock = false;
              self.code = {
                disabled: false,
                text: "重新发送"
              };
            }
          }, 1000);
        }
      },
      postCheck(){
        if(!this.codeNum){
          this.showAlert = true
          this.alertText = '请填写验证码'
        }else{
          let postData = {
            mobile: this.registerPhoneNumber,
            code: this.codeNum
          }
          checkPasCode(postData).then(res=>{
            if(res.status){
              this.$router.push('/changePas')
            }else{
              this.showAlert = true
              this.alertText = '请填写验证码'
            }
          })
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
    background: url("../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    height: 100%;
    min-height: 100vh;
    /*background-position: fixed;*/
    /*position: fixed;*/
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    .register-form {
      /*margin: 250px auto 0;*/
      margin: 156px auto 0;
      /*width: 638px;*/
      width: 413px;
      .input-area {
        width: 100%;
        display: flex;
        /*height: 96px;*/
        height: 60px;
        /*line-height: 96px;*/
        line-height: 60px;
        /*margin-bottom: 22px;*/
        margin-bottom: 14px;
        /*border-radius: 24px;*/
        .register-icon {
          flex: 1;
          text-align: right;
          color: #ffffff;
          /*font-size: 36px;*/
          font-size: 23px;
          padding-right: 14px;
          span {
            display: inline-block;
            font-size: 32px;
            /*font-size: 50px;*/
            vertical-align: middle;
            padding-top: 5px;
            padding-right: 2.5px;
          }
        }
        .input {
          flex: 1.95;
          color: #ffffff;
          outline: none;
          font-size: 17px;
          &:-ms-input-placeholder {
            color: #ffffff
          }
          &::-webkit-input-placeholder {
            color: #ffffff
          }
          border-radius: 15px;
          background: #9497ad;
          padding-left: 12.5px;
        }
      }
      .code-area{
        display: flex;
        .register-icon{
          flex: 1;
        }
        .code-btn-area{
          flex: 1.95;
          display: flex;
          font-size: 17px;
          .code-input{
            display: inline-block;
            flex: 1;
            width: 100px;
            outline: none;
            &:-ms-input-placeholder {
              color: #ffffff
            }
            &::-webkit-input-placeholder {
              color: #ffffff
            }
            background: #9497ad;
            border-radius: 15px;
            padding-left: 12.5px;
            margin-left: -5px;
          }
          .code-btn{
            flex: 0.85;
            margin-left: 12px;
            text-align: center;
            background: rgb(58, 178, 237);
            border-radius: 15px;
            padding: 0 10px;
            color: #ffffff;
          }
        }
      }
      .post-btn{
        font-size: 33px;
        color: #ffffff;
        text-align: center;
        width: 405px;
        height: 66px;
        line-height: 66px;
        border-radius: 15px;
        background: #3ab2ed;
        margin: 95px auto 0;
      }
    }
  }
</style>

