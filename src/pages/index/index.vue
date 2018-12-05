<template>
  <div class="index-page">
    <Header title='东部中心人才培养基地' noBackShow='noBackShow'/>
    <Search title='东部中心人才培养基地' noBackShow='noBackShow'/>
    <Slider/>
    <!--<mainList/>-->
    <div class="main-list-area">
      <img src="../../common/image/link-one.png" alt="">
      <div class="main-list">
        <router-link :to="listitem.link" class="list-item" :class="listitem.subscript" v-for="(listitem, index) in linkList" :key="index">
          <div class="link-icon">{{index}}</div>
          <div class="link-name">{{listitem.name}}</div>
        </router-link>
      </div>
      <router-link to="/user" class="user-tip" v-if="userInfo">
        个人中心
      </router-link>
      <router-link to="/login" class="user-tip" v-else>
        登录
      </router-link>
      <!--<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"/>-->

      <!--{{userInfo}}-->
    </div>
    <!--<TwoLanguageTitle english='Product' chinese='产品' linkTitle='查看更多' link="/title"></TwoLanguageTitle>-->
    <!--<TwoLanguageTitle english='Walkthrough' chinese='攻略'></TwoLanguageTitle>-->
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
        linkList: [
          {
            name: '课程报名',
            link: '',
            icon: '',
            subscript: 'one'

          },
          {
            name: '在线观看',
            link: '',
            icon: '',
            subscript: 'two'
          },
          {
            name: '上课签到',
            link: '',
            icon: '',
            subscript: 'three'
          },
          {
            name: '下课签退',
            link: '',
            icon: '',
            subscript: 'four'
          },
          {
            name: '课程反馈',
            link: '',
            icon: '',
            subscript: 'five'
          },
          {
            name: '在线测试',
            link: '',
            icon: '',
            subscript: 'six'
          },
          {
            name: '公告',
            link: '',
            icon: '',
            subscript: 'seven'
          },
          {
            name: '新闻',
            link: '/newslist',
            icon: '',
            subscript: 'eight'
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
          .link-icon {
            flex: 1;
            text-align: right;
            padding-right: 20px;
          }
        ;
          .link-name {
            flex: 2;
          }
          &.one {
            background: rgb(134, 193, 248);
          }
          &.two {
            background: rgb(160, 207, 242);
          }
          &.three {
            background: rgb(113, 208, 247);
          }
          &.four {
            background: rgb(169, 199, 211);
          }
          &.five {
            background: rgb(178, 196, 224);
          }
          &.six {
            background: rgb(134, 193, 248);
          }
          &.seven {
            background: rgb(164, 214, 221);
          }
          &.eight {
            background: rgb(172, 209, 229);
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

