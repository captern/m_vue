<template>
  <div class="change-info-page" v-wechat-title="$route.meta.title='修改个人信息'">
    <Header title='修改个人资料'/>
    <div class="change-area">
      <div class="change-form">
        <div class="avatar-area change-item">
          <div class="item-left">
            修改头像 ：
          </div>
          <div class="item-right">
            <div class="avatar-input-area">
              <img class="avatar-icon" :src="avatar?avatar:require('../../../common/image/user-icon.png')" alt="">
              <input type="file" class="avatar-input" name="avatar" placeholder="点击更改" ref="" @change="changeImage"
                     accept="image/gif,image/jpeg,image/jpg,image/png">
            </div>
          </div>
        </div>
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
              <img v-if="this.sex == 1" src="../../../common/image/change-sex-check.png" alt="">
              <img v-else src="../../../common/image/change-sex-no.png" alt="">
            </span>
              男
            </div>
            <div class="sex-item" @click="changeSex()">
            <span class="sex-icon">
              <img v-if="this.sex == 1" src="../../../common/image/change-sex-no.png" alt="">
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
        <div class="work-area change-item">
          <div class="item-left">职 位 ：</div>
          <input class="item-right" type="text" name="workSpace" placeholder="请输入职位" v-model="workLevel"
                 v-focus="this.focus">
        </div>
        <div class="change-info" @click="changeInfo">保存</div>
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
  import {getUser, changeInfo, postAvatar} from '../../../server/api'
  import {getStore} from '../../../config/mUtils'

  export default {
    data() {
      return {
        avatar: '',
        file: '',
        user_id: null,
        phoneNumber: null,
        userName: null,
        IdCard: null,
        showAlert: false,
        tipType: 'one',
        sex: 1,           //性别
        workSpace: null,
        workLevel: null,
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
            console.log(res)
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
        if (this.sex == 1) {
          this.sex = 2
        } else if (this.sex == 2) {
          this.sex = 1
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
        else if (!this.workLevel) {
          this.showAlert = true;
          this.alertText = '请输入工作职位';
          return
        }
        // 发送重置信息
        let res = await changeInfo(this.userName, this.IdCard, this.sex, this.workSpace, this.workLevel);
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
      },
      changeImage: function (e) {
        let file = e.target.files[0];
        if (file) {
          this.file = file
          let reader = new FileReader()
          let that = this
          reader.readAsDataURL(file)
          reader.onload = function (e) {
            // 这里的this 指向reader
            that.upload()
            that.avatar = this.result
          }
        }
      },
      // 上传用户头像部分
      upload: function(){
        postAvatar(this.avatar).then(res => {
          if (res.status) {
            console.log('修改用户头像成功')
          } else {
            console.log('修改用户头像失败')
          }
        })
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
  .change-info-page {
    .change-area {
      position: absolute;
      margin: 25px;
      width: calc(100% - 50px);
      height: calc(100% - 112.5px);
      background: #ffffff;
      border-radius: 15px;
      .change-form {
        width: 418px;
        margin: 144px auto 0;
        color: rgb(58, 178, 237);
        .change-item {
          width: 100%;
          display: flex;
          height: 60px;
          line-height: 60px;
          margin-bottom: 10px;
          .item-left {
            flex: 1.2;
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
            margin-left: 6.5px;
            flex: 2;
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
                .sex-icon {
                  vertical-align: middle;
                  font-size: 0;
                  img {
                    width: 19px;
                    /*width: 30px;*/
                    /*width: 30px;*/
                    height: 19px;
                    vertical-align: middle;
                    margin-top: -1.5px;
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
        .phone-area, .sex-area {
          height: 35px;
          line-height: 35px;
        }
        .avatar-area {
          height: auto;
          margin-bottom: 10px;
          .item-right {
            background: none;
            .avatar-input-area {
              width: 88px;
              height: 88px;
              background-color:#e1e1e1;
              .avatar-icon {
                width: 88px;
                height: 88px;
                border-radius: 50%;
                position: absolute;
              }
              .avatar-input {
                position: absolute;
                width: 88px;
                z-index: 3;
                height: 88px;
                opacity: 0;
              }
            }
          }
        }
      }
      .change-info {
        color: rgb(255, 255, 255);
        height: 68px;
        line-height: 68px;
        text-align: center;
        background: rgb(58, 178, 237);
        font-size: 33px;
        border-radius: 24px;
        margin-top: 87px;
      }
    }
  }
</style>

