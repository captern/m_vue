<template>
  <div class="index-page">
    <Header title='东部中心人才培养基地' noBackShow='noBackShow'/>
    <Search title='东部中心人才培养基地' noBackShow='noBackShow'/>
    <Slider/>
    <!--<mainList/>-->
    <div class="main-list-area">
      <div class="main-list">
        <router-link to="/newslist" class="list-item"><img src="../../common/image/link-one.png" alt=""></router-link>
        <router-link to="/newslist" class="list-item"><img src="../../common/image/link-two.png" alt=""></router-link>
        <router-link to="/newslist" class="list-item"><img src="../../common/image/link-three.png" alt=""></router-link>
        <router-link to="/newslist" class="list-item"><img src="../../common/image/link-four.png" alt=""></router-link>
        <router-link to="/newslist" class="list-item"><img src="../../common/image/link-five.png" alt=""></router-link>
        <router-link to="/newslist" class="list-item"><img src="../../common/image/link-six.png" alt=""></router-link>
        <router-link to="/newslist" class="list-item"><img src="../../common/image/link-seven.png" alt=""></router-link>
        <router-link to="/newslist" class="list-item"><img src="../../common/image/link-eight.png" alt=""></router-link>
      </div>
      <router-link to="/user" class="user-tip" v-if="userInfo">
        个人中心
      </router-link>
      <router-link to="/login" class="user-tip" v-else>
        登录
      </router-link>
      <!--<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"/>-->
    </div>
  </div>
</template>

<script>
  import {getBanner} from '../../server/api'
  import Slider from '../../base/slider/slider'
  import Header from '../../components/header.vue'
  import Search from '../../components/search.vue'
  import mainList from '../../components/mainList.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'
  import alertTip from '../../components/common/alertTip'

  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        recommends: [
          {
            linkUrl: 'http://y.qq.com/w/album.html?albummid=000zQSi93tJtgY',
            picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1075114.jpg'
          },
          {
            linkUrl: 'https://y.qq.com/m/act/TNTB/index.html?openinqqmusic=1&ADTAG=jiaodiantu',
            picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/983421.jpg'
          }
        ],
        showAlert: true,
      }
    },
    mounted() {
//      获取首页轮播图
      getBanner().then(res => {
        console.log(res)
      })
      // this.getUserInfo()
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ])
    },
    components: {
      Slider,
      Header,
      Search,
      mainList,
      alertTip,
      TwoLanguageTitle
    }
  }
</script>

<style lang="scss" scoped>
  .index-page {
    position: relative;
    top: 0;
    overflow: scroll;
    .main-list-area {
      min-height: 100%;
      margin: 28px 33px;
      background: #ffffff;
      border-radius: 24px;
      padding-bottom: 20px;
      .main-list {
        padding: 50px 34px;
        height: 673px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .list-item {
          width: 430px;
          height: 140px;
          line-height: 140px;
          border-radius: 24px;
          display: flex;
          color: #ffffff;
          img{
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
  }
</style>

