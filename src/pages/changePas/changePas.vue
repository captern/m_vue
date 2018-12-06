<template>
  <div class="change-info-page">
    <Header title='修改密码'/>
    <div class="change-area">
      <div class="change-form">
        <div class="name-area change-item">
          <div class="item-left"><span>*</span>旧 密 码 ：</div>
          <input class="item-right" type="password" name="name" placeholder="请输入旧密码" v-model="newPassword">
        </div>
        <div class="IdCard-area change-item">
          <div class="item-left"><span>*</span>确认密码 ：</div>
          <input class="item-right" type="password" name="IdCard" placeholder="请再次输入密码" v-model="repeatPassword">
        </div>

        <div class="change-info" @click="changePas">保存</div>
        <!--<div class="login-container">保存</div>-->
      </div>
    </div>
    <!--提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :tipType="tipType" :alertText="alertText"/>

  </div>
</template>

<script>
  import Header from '../../components/header.vue'
  import {mapMutations, mapState} from 'vuex'
  import alertTip from '../../components/common/alertTip'
  import {changePas} from '../../server/api'

  export default {
    data() {
      return {
        user_id: null,
        newPassword: null,
        repeatPassword: null,
        showAlert: false, // 显示提示组件
        alertText: null,// 提示的内容
        tipType: 'one',          //提示的内容
      }
    },
    mounted() {
      this.initData()
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
      rightPas: function () {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IdCard)
      }
    },
    methods: {
      initData() {
        if (this.userInfo) {
          console.log(this.userInfo)
          this.user_id = this.userInfo.user_id
        }
      },
      async changePas() {
        if (!this.newPassword) {
          this.showAlert = true;
          this.alertText = '请输入旧密码';
          return
        } else if (!this.repeatPassword) {
          this.showAlert = true;
          this.alertText = '请输入新密码';
          return
        }
//        else if (this.newPassword !== this.repeatPassword) {
//          this.showAlert = true;
//          this.alertText = '两次输入密码不一致';
//          return
//        }
        // 发送重置信息
        let res = await changePas(this.newPassword, this.repeatPassword);
        console.log(res)
        if (res.status) {
          this.showAlert = true;
          this.alertText = '密码修改成功';
          setTimeout(function () {
            this.$router.go(-1);
          },1000)
          return
        }else{
          this.showAlert = true;
          this.alertText = res.msg;
          return
        }
      }
    },
    components: {
      Header,
      alertTip
    },
    watch: {
      userInfo: function (value) {
        this.initData()
      }
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
      .change-form {
        width: 669px;
        margin: 231px auto 0;
        color: rgb(58, 178, 237);
        .change-item {
          width: 100%;
          display: flex;
          height: 96px;
          line-height: 96px;
          margin-bottom: 16px;
          /*border-radius: 24px;*/
          .item-left {
            flex: 1.2;
            text-align: right;
            font-size: 36px;
            span {
              display: inline-block;
              font-size: 50px;
              vertical-align: middle;
              padding-top: 8px;
              padding-right: 4px;
            }
          }
          .item-right {
            margin-left: 10px;
            flex: 2.2;
            color: #ffffff;
            outline: none;
            &:-ms-input-placeholder {
              color: #ffffff
            }
            &::-webkit-input-placeholder {
              color: #ffffff
            }
            border-radius: 24px;
            background: rgb(225, 225, 225);
            padding-left: 20px;
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
        height: 105px;
        line-height: 105px;
        text-align: center;
        background: rgb(58, 178, 237);
        border-radius: 24px;
        margin-top: 123px;
      }
    }
  }
</style>

