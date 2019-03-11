<template>
  <div class="check-pas-page" v-wechat-title="$route.meta.title='修改密码'">
    <Header title='修改密码'/>
    <div class="check-bkg">
      <div class="check-area">
        <div class="left">
          <span>*</span>
          验证码
        </div>
        <div class="mid">
          <input type="phone" placeholder="请输入短信验证码" v-model="codeNum">
        </div>
        <div class="right" @click = getPhoneCode()>
          发送验证码
        </div>
      </div>
      <div class="post-btn" @click="postCheck">保存</div>
    </div>
    <!--提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :tipType="tipType" :alertText="alertText ? alertText : '验证码错误'" btn-one="关闭"/>
  </div>
</template>

<script>
  import Header from '../../../components/header.vue'
  import alertTip from '../../../components/common/alertTip'
  import {getUser, changePas} from '../../../server/api'
  import {mobileCode, mobilePasCode, checkPasCode} from '../../../server/api'

  export default {
    data() {
      return {
        phoneNum: null,
        codeNum: null,
        newPassword: null,
        repeatPassword: null,
        showAlert: false, // 显示提示组件
        alertText: null,// 提示的内容
        tipType: 'one',          //提示的内容
      }
    },
    mounted() {
      let phoneNum = this.$route.query.phoneNum
      this.phoneNum = phoneNum
    },
    computed: {

    },
    methods: {
      getPhoneCode(){
        mobilePasCode(this.phoneNum).then(res=>{
          if(res.status){
            this.showAlert = true
            this.alertText = '验证码发送成功'
          }else{
            this.showAlert = true
            this.alertText = res.msg
          }
        })
      },
      postCheck(){
        console.log('addd')
        if(!this.codeNum){
          this.showAlert = true
          this.alertText = '请填写验证码'
        }else{
          let postData = {
            mobile: this.phoneNum,
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
      alertTip
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
  .check-pas-page {
    /*背景固定不滚动*/
    background: url("../../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    height: 100%;
    min-height: 100vh;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    .check-bkg {
      margin: 15px;
      min-height: calc(100vh - 30px);
      background: #FFFFFF;
      border-radius: 15px;
      .check-area {
        width: 450px;
        margin: 0 auto;
        padding-top: 142px;
        display: flex;
        height: 48px;
        line-height: 48px;
        .left {
          flex: 1;
          font-size: 24px;
          color: rgb(58, 178, 237);
          text-align: right;
          padding-right: 12px;
          span{
            vertical-align: middle;
          }
        }
        .mid {
          background: #e1e1e1;
          color: #ffffff;
          outline: none;
          border-radius: 15px;
          input{
            outline: none;
            color: rgb(255,255,255);
            background: #e1e1e1;
            padding-left: 27px;
            &:-ms-input-placeholder {
              color: rgb(255,255,255);
              background: #e1e1e1;
            }
            &::-webkit-input-placeholder {
              color: rgb(255,255,255);
              background: #e1e1e1;
            }
          }

        }
        .right {
          flex: 1;
          padding-left: 10px;
          font-size: 18px;
          color: rgb(58, 178, 237);
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

