<template>
  <div class="index-page" v-wechat-title="$route.meta.title='东部中心人才培养基地'">
    <Header title='东部中心人才培养基地' noBackShow='noBackShow'/>
    <!--<Search title='东部中心人才培养基地' noBackShow='noBackShow'/>-->
    <Slider v-if="this.banner" v-bind:banner='this.banner'></Slider>
    <!--<mainList/>-->
    <div class="main-list-area">
      <div class="main-list">
        <router-link to="/" class="list-item"><img src="../../common/image/link-one.png" alt=""></router-link>
        <router-link to="/" class="list-item"><img src="../../common/image/link-two.png" alt=""></router-link>
        <router-link to="/" class="list-item"><img src="../../common/image/link-three.png" alt=""></router-link>
        <router-link to="/" class="list-item"><img src="../../common/image/link-four.png" alt=""></router-link>
        <router-link to="/" class="list-item"><img src="../../common/image/link-five.png" alt=""></router-link>
        <router-link to="/" class="list-item"><img src="../../common/image/link-six.png" alt=""></router-link>
        <router-link to="/noticelist" class="list-item"><img src="../../common/image/link-seven.png" alt="">
        </router-link>
        <router-link to="/newslist" class="list-item"><img src="../../common/image/link-eight.png" alt=""></router-link>
      </div>
    </div>
    <div class="bottom-area">
      <div class="bottom-left" @click="showPop" v-bind:class="{ active: showBottomPop }">
        菜单
        <span class="bottom-left-icon">
          <!--<img src="../../common/icon/bottom-left-icon@3x.png" alt="">-->
        </span>
      </div>
      <div class="bottom-center">
        <img src="../../common/icon/space@3x.png" alt="">
      </div>
      <!--<router-link class="bottom-right" to="/login">-->
      <!--个人中心-->
      <!--</router-link>-->
      <router-link to="/user" class="bottom-right" v-if="this.userMsg">
        个人中心
      </router-link>
      <router-link to="/login" class="bottom-right" v-else>
        登录
      </router-link>
      <div class="bottom-pop" v-if="showBottomPop">
        <div class="bottom-pop-item" v-for="(menuItem, index) in menuList" :key="index"  @click="jumpUrl(menuItem.url, menuItem.source)">{{menuItem.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUser, getBanner, getIndexLink} from '../../server/api'
  import Slider from '../../components/common/slider'
  import Header from '../../components/header.vue'
  import Search from '../../components/search.vue'
  import mainList from '../../components/mainList.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'
  import alertTip from '../../components/common/alertTip'
  import {getStore} from '../../config/mUtils'

  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        banner: null,
        showAlert: true,
        getUid: false,
        userMsg: null,
        showBottomPop: false,
        indexList: [
          {
            source: '',
            url: '',
            title: ''
          }
        ],
        menuList: [
          {
            title: "",
            url: "",
            source: ''
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    mounted() {
      getBanner().then(res => {
        this.banner = res.data
      });
      // 获取首页链接信息
      getIndexLink().then(
        res => {
          console.log(res.data)
          this.indexList = res.data.index
          this.menuList = res.data.menu
        }
      )
      if (getStore('user_id')) {
        getUser().then(res => {
          if (res.status) {
            this.userMsg = res.data
          } else {
            console.log('用户信息获取失败')
          }
        })
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
      showPop() {
        this.showBottomPop = !this.showBottomPop
      },
      jumpUrl(url, source){
        console.log(url)
        console.log(source)
        if(source == 1){
          this.$router.push(url)
        }else if(source == 2){
          window.location.href=(url)
        }
      }
    },
    components: {
      Slider,
      Header,
      Search,
      mainList,
      alertTip,
      TwoLanguageTitle
    },
  }
</script>

<style lang="scss" scoped>
  .index-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    min-height: 100vh;
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .main-list-area {
      min-height: 100%;
      margin: 28px 33px;
      background: #ffffff;
      border-radius: 24px;
      padding-bottom: 20px;
      .main-list {
        padding: 32px 33px;
        /*height: 673px;*/
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .list-item {
          width: 241px;
          height: 83px;
          line-height: 140px;
          border-radius: 24px;
          display: flex;
          color: #ffffff;
          margin-top: 29px;
          img {
            width: 100%;
          }
        }
      }
      .user-tip {
        display: block;
        color: #ffffff;
        height: 105px;
        line-height: 105px;
        background: rgb(58, 178, 237);
        margin: -10px 34px 20px;
        border-radius: 24px;
        text-align: center;
      }
    }
    .bottom-area {
      height: 100px;
      background: #ffffff;
      width: 100%;
      line-height: 110px;
      position: fixed;
      bottom: 0;
      display: flex;
      .bottom-left, .bottom-right {
        flex: 1;
        text-align: center;
        font-size: 32px;
        color: rgb(53, 53, 53);
      }
      .bottom-left {
        .bottom-left-icon {
          display: inline-block;
          margin-left: 10px;
          border-width: 0 0 15px 15px;
          border-style: solid;
          border-color: transparent transparent #999999 transparent;
        }
        &.active {
          color: rgb(10, 91, 140);
          .bottom-left-icon {
            border-color: transparent transparent rgb(10, 91, 140) transparent;
          }
        }
      }
      .bottom-center {
        img {
          height: 100px;
          width: auto;
        }
      }
      .bottom-pop {
        position: fixed;
        bottom: 90px;
        left: 60px;
        background: #FFFFFF;
        width: 208px;
        height: 218px;
        box-shadow: 2px 2px 0 2px #f7f7f7;
        .bottom-pop-item {
          margin: 5px 10px 0;
          height: 67px;
          line-height: 67px;
          display: block;
          border-bottom: 1px solid #999999;
          font-size: 32px;
          text-align: center;
          color: rgb(53, 53, 53);
          &:last-child {
            border: none;
          }
        }
      }
    }
  }
</style>

