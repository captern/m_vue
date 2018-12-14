<template>
  <div class="change-info-page" v-wechat-title="$route.meta.title='修改个人信息'">
    <Header title='修改个人资料'/>
    <div class="change-area">
      <div class="change-form">
        <div class="phone-area change-item">
          <div class="item-left">
            <span>*</span>
            手机号 ：
          </div>
          <div class="item-right phone-number">{{phoneNumber}}</div>
        </div>
        <div class="sex-area change-item">
          <div class="item-left">
            <span>*</span>
            性&nbsp;&nbsp;&nbsp;别 ：
          </div>
          <div class="item-right sex-check">
            <div class="sex-item" @click="changeSex()">
            <span class="sex-icon">
              <img v-if="this.sex === 1" src="../../../common/image/change-sex-check.png" alt="">
              <img v-else src="../../../common/image/change-sex-no.png" alt="">
            </span>
              男
            </div>
            <div class="sex-item" @click="changeSex()">
            <span class="sex-icon">
              <img v-if="this.sex === 1" src="../../../common/image/change-sex-no.png" alt="">
              <img v-else src="../../../common/image/change-sex-check.png" alt="">
            </span>
              女
            </div>
          </div>
        </div>
        <div class="name-area change-item">
          <div class="item-left">姓&nbsp;&nbsp;&nbsp;名 ：</div>
          <input class="item-right" type="text" name="name" placeholder="请输入姓名" v-model="userName" v-focus="this.focus">
        </div>
        <div class="IdCard-area change-item">
          <div class="item-left">身份证号码 ：</div>
          <input class="item-right" type="number" name="IdCard" placeholder="请输入身份证号码" v-model="IdCard"
                 v-focus="this.focus">
        </div>
        <div class="work-area change-item">
          <div class="item-left">工作单位 ：</div>
          <input class="item-right" type="text" name="workSpace" placeholder="请输入工作单位" v-model="workSpace"
                 v-focus="this.focus">
        </div>

        <div class="change-info" @click="changeInfo">保存</div>
        <!--<div class="login-container">保存</div>-->
      </div>
    </div>
    <!--提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :tipType="tipType" :alertText="alertText"/>
  </div>
</template>

<script>
  import Header from '../../../components/header.vue'
  import alertTip from '../../../components/common/alertTip'
  import {mapMutations, mapState} from 'vuex'
  import {getUser, changeInfo} from '../../../server/api'
  import {getStore} from '../../../config/mUtils'

  export default {
    data() {
      return {
        user_id: null,
        phoneNumber: null,
        userName: null,
        IdCard: null,
        showAlert: false,
        tipType: 'one',
        sex: '1',           //性别
        workSpace: null,
        focus: null
      }
    },
    mounted() {
      this.initData()
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
      rightIdCard: function () {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IdCard)
      }
    },
    methods: {
      initData() {
        if (getStore('user_id')) {
          getUser().then(res => {
            if (res.status) {
              this.user_id = res.data.id
              this.phoneNumber = res.data.mobile
              this.sex = res.data.sex
            } else {
              console.log('用户信息获取失败')
            }
          })
        } else {
          console.log('用户未登录')
          this.$router.push('/index');
        }
        // if (this.userInfo) {
        //   this.user_id = this.userInfo.id
        //   this.phoneNumber = this.userInfo.mobile
        //   this.sex = this.userInfo.sex
        // }
      },
      changeSex() {
        if (this.sex === '1') {
          this.sex = '2'
        } else if (this.sex === '2') {
          this.sex = '1'
        }
      },
      async changeInfo() {
        this.focus = ''
        if (!this.userName) {
          this.showAlert = true;
          this.alertText = '请输入用户名';
          return
        } else if (!this.IdCard) {
          this.showAlert = true;
          this.alertText = '请输入身份证号码';
          return
        } else if (!this.rightIdCard) {
          this.showAlert = true;
          this.alertText = '身份证号码输入错误';
          return
        } else if (!this.workSpace) {
          this.showAlert = true;
          this.alertText = '请输入工作地点';
          return
        }
        // 发送重置信息
        let res = await changeInfo(this.userName, this.IdCard, this.sex, this.workSpace);
        if (res.status) {
          this.showAlert = true;
          this.alertText = '用户信息修改成功';
          setTimeout(() => {
              this.$router.go(-1);
            }, 1000
          )
          return
        } else {
          this.showAlert = true;
          this.alertText = res.msg;
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
            flex: 2;
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

