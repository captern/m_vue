<template>
  <div class="register-page" v-wechat-title="$route.meta.title='用户中心'">
    <Header title='个人中心'/>
    <div class="user-page">
      <div class="section-one">
        <img v-if="this.sex =='1'" class="avatar" src="" alt="男的">
        <img v-else class="avatar" src="" alt="女的">
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
  import {logOut} from '../../server/api'

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
        // console.log('执行1次')
        if (this.userInfo && this.userInfo.id) {
          this.userName = this.userInfo.userName
          this.mobile = this.userInfo.mobile
          this.sex = this.userInfo.sex
        }
      },
      //退出登录
      async outLogin() {
        this.OUT_LOGIN();
        removeStore('user_id')
        logOut().then(res => {

        })
        setTimeout(()=>{
          this.$router.push('/index');
        },800)
        // this.$router.push('/index');
        // await signout();
      },
    },
    components: {
      Header
    },
    // watch: {
    //   userInfo: function (value) {
    //     if (value && value.id){
    //       this.initData()
    //     }
    //   }
    // }
  }
</script>

<style lang="scss" scoped>
  .user-page {
    margin-top: 113px;
    .section-one {
      text-align: center;
      .avatar {
        display: inline-block;
        width: 242px;
        height: 242px;
        border-radius: 50%;
      }
      .phone {
        margin-top: 55px;
        font-size: 40px;
        color: #ffffff;
      }
    }
    .section-two {
      width: 959px;
      height: 1084px;
      background: #ffffff;
      border-radius: 24px;
      margin: 112px auto 0;
      .link-items-area {
        width: 615px;
        margin: 0 auto;
        padding-top: 149px;
        .link-item {
          font-size: 38px;
          height: 109px;
          line-height: 119px;
          display: block;
          background: rgb(134, 193, 248);
          margin-bottom: 35px;
          border-radius: 24px;
          color: #ffffff;
          padding: 0 37px 0 45px;
          .icon {
            float: right;
            vertical-align: middle;
            img{
              width: 20px;
              height: auto;
            }
          }
        }

      }
      .home-link-area {
        width: 100%;
        height: 125px;
        padding-top: 20px;
        .home-link {
          float: right;
          margin-right: 45px;
          color: #ffffff;
          width: 125px;
          /*height: 125px;*/
          line-height: 125px;
          text-align: center;
          border-radius: 50%;
          background: rgb(134, 193, 248);
        }
      }
      .logout {
        color: #ffffff;
        font-size: 52px;
        width: 879px;
        height: 105px;
        text-align: center;
        margin: 45px auto 0;
        line-height: 105px;
        border-radius: 24px;
        background: rgb(68, 178, 237);
      }
    }
  }
</style>

