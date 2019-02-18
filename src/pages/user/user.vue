<template>
  <div class="register-page" v-wechat-title="$route.meta.title='用户中心'">
    <Header title='个人中心'/>
    <div class="user-page">
      <div class="section-one">
        <img v-if="this.sex =='1'" class="avatar" src="../../common/image/man.jpeg" alt="默认头像">
        <img v-else class="avatar" src="../../common/image/woman.jpeg" alt="默认头像">
        <p class="phone">{{this.mobile}}</p>
        <p class="phone">{{this.userName}}</p>
      </div>
      <div class="section-two">
        <div class="link-items-area">
          <router-link to="/changeuserinfo" class="link-item">
            修改个人资料
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
          <router-link to="/changepas" class="link-item">
            修改密码
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
          <router-link to="" class="link-item">
            我的课程
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
          <router-link to="" class="link-item">
            我的收藏
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
        </div>
        <div class="home-link-area">
          <router-link to="/" class="home-link">首页</router-link>
        </div>
        <div class="logout" @click="outLogin">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/header.vue'
  import {mapMutations, mapState} from 'vuex'
  import {removeStore} from '../../config/mUtils'
  import {getUser, logOut} from '../../server/api'
  import {getStore} from '../../config/mUtils'

  export default {
    data() {
      return {
        userName: null,
        mobile: null,
        sex: null
        // 电话号码
      }
    },
    mounted() {
      this.initData()
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      ...mapMutations([
        'OUT_LOGIN'
      ]),
      initData() {
        if (getStore('user_id')) {
          getUser().then(res => {
            if (res.status) {
              this.userName = res.data.userName
              this.mobile = res.data.mobile
              this.sex = res.data.sex
            } else {
              console.log('用户信息获取失败')
            }
          })
        }else{
          console.log('用户未登录')
          this.$router.push('/index');
        }
      },
      //退出登录
      async outLogin() {
        this.OUT_LOGIN();
        removeStore('user_id')
        logOut().then(res => {

        })
        setTimeout(() => {
          this.$router.push('/index');
        }, 800)
        // this.$router.push('/index');
        // await signout();
      },
    },
    components: {
      Header
    },
  }
</script>

<style lang="scss" scoped>
  .user-page {
    /*margin-top: 113px;*/
    margin-top: 70px;
    .section-one {
      text-align: center;
      .avatar {
        display: inline-block;
        width: 151px;
        /*width: 242px;*/
        /*height: 242px;*/
        height: 151px;
        border-radius: 50%;
      }
      .phone {
        margin-top: 34px;
        /*margin-top: 55px;*/
        /*font-size: 40px;*/
        font-size: 25px;
        color: #ffffff;
      }
    }
    .section-two {
      width: 599px;
      /*width: 959px;*/
      /*height: 1084px;*/
      height: 677px;
      background: #ffffff;
      /*border-radius: 24px;*/
      border-radius: 15px;
      /*margin: 112px auto 0;*/
      margin: 70px auto 0;
      .link-items-area {
        width: 384px;
        /*width: 615px;*/
        margin: 0 auto;
        /*padding-top: 149px;*/
        padding-top: 93px;
        .link-item {
          /*font-size: 38px;*/
          font-size: 24px;
          height: 68px;
          /*height: 109px;*/
          /*line-height: 119px;*/
          line-height: 74px;
          display: block;
          background: rgb(134, 193, 248);
          margin-bottom: 22px;
          /*margin-bottom: 35px;*/
          /*border-radius: 24px;*/
          border-radius: 15px;
          color: #ffffff;
          /*padding: 0 37px 0 45px;*/
          padding: 0 23px 0 28px;
          .icon {
            float: right;
            vertical-align: middle;
            img {
              /*width: 20px;*/
              width: 12.5px;
              height: auto;
            }
          }
        }

      }
      .home-link-area {
        width: 100%;
        /*height: 125px;*/
        height: 78px;
        /*padding-top: 20px;*/
        padding-top: 12.5px;
        .home-link {
          float: right;
          /*margin-right: 45px;*/
          margin-right: 28px;
          color: #ffffff;
          /*width: 125px;*/
          width: 78px;
          /*height: 125px;*/
          /*line-height: 125px;*/
          line-height: 78px;
          text-align: center;
          border-radius: 50%;
          background: rgb(134, 193, 248);
        }
      }
      .logout {
        color: #ffffff;
        font-size: 32px;
        /*font-size: 52px;*/
        /*width: 879px;*/
        width: 555px;
        height: 66px;
        /*height: 105px;*/
        text-align: center;
        /*margin: 45px auto 0;*/
        margin: 28px auto 0;
        /*line-height: 105px;*/
        line-height: 66px;
        /*border-radius: 24px;*/
        border-radius: 15px;
        background: rgb(68, 178, 237);
      }
    }
  }
</style>

