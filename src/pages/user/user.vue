<template>
  <div class="register-page" v-wechat-title="$route.meta.title='用户中心'">
    <Header title='个人中心'/>
    <HomeIcon></HomeIcon>
    <div class="user-page">
      <div class="section-one">
        <!--<img v-if="this.sex =='1'" class="avatar" src="../../common/image/man.jpeg" alt="默认头像">-->
        <img v-if="this.sex =='1'" class="avatar" :src="head_img?head_img:require('../../common/image/man.jpeg')" alt="">
        <!--<img v-else class="avatar" src="../../common/image/woman.jpeg" alt="默认头像">-->
        <img v-else class="avatar" :src="head_img?head_img:require('../../common/image/woman.jpeg')" alt="">
        <p class="phone">{{this.mobile}}</p>
        <p class="phone">{{this.userName}}</p>
      </div>
      <div class="section-two">
        <div class="link-items-area">
          <router-link to="/changeuserinfo" class="link-item">
            修改个人资料
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
          <!--<router-link to="/changepascheck" class="link-item">-->
          <router-link :to="{ path: '/changepascheck', query: { phoneNum: this.mobile }}" class="link-item">
            修改密码
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
          <router-link to="/myLesson" class="link-item">
            我的课程
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
          <router-link to="/myCollect" class="link-item">
            我的收藏
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
          <router-link to="/myTest" class="link-item">
            我的测试
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
          <router-link to="/myVote" class="link-item">
            我的投票
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
          <router-link to="/myActivity" class="link-item">
            我的活动
            <span class="icon"><img src="../../common/image/right-icon.png" alt=""></span>
          </router-link>
          <div class="logout" @click="outLogin">退出登录</div>
        </div>
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
  import HomeIcon from '../../components/common/homeIcon.vue'

  export default {
    data() {
      return {
        userName: null,
        mobile: null,
        sex: null,
        head_img: null
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
              this.head_img = res.data.head_img
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
      Header,
      HomeIcon
    },
  }
</script>

<style lang="scss" scoped>
  .user-page {
    background: url("../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    height: 100%;
    min-height: 100vh;
    /*background-position: fixed;*/
    /*position: fixed;*/
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*margin-top: 113px;*/
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
      background: #ffffff;
      border-radius: 15px;
      margin: 24px;
      .link-items-area {
        width: 328px;
        margin: 0 auto;
        padding-top: 55px;
        padding-bottom: 45px;
        .link-item {
          font-size: 26px;
          height: 68px;
          line-height: 74px;
          display: block;
          background: rgb(134, 193, 248);
          margin-bottom: 22px;
          border-radius: 15px;
          color: #ffffff;
          padding: 0 24px 0 18px;
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
        .logout {
          display: block;
          margin-top: 70px;
          color: #ffffff;
          font-size: 32px;
          width: 545px;
          text-align: center;
          margin-left: -108.5px;
          line-height: 66px;
          border-radius: 15px;
          background: rgb(68, 178, 237);
        }
      }
    }
  }
</style>

