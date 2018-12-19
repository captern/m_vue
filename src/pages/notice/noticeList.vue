<template>
  <div class="news-list-page" v-wechat-title="$route.meta.title='公告列表'">
    <Header title='公告'/>
    <div class="news" v-if="newsList">
      <!--<router-link :to="{path:'/news',query:{id:item.newsId}}" class="news-item" v-for="item in newsData"-->
      <!--<router-link :to="'/notice/' + item.id" class="news-item" v-for="(item, index) in newsList" :key="index" :newsId="item.id"></router-link>-->
      <div class="news-item" v-for="(item, index) in newsList" :key="index" :newsId="item.id" @click="jumpLink(index)">
        <img class="news-img" :src='item.cover' alt="tupian">
        <div class="news-dec">
          <div class="news-title" v-html="item.content"></div>
          <!--<div class="news-title">{{item.content}}</div>-->
          <div class="news-time">{{item.updated_time}}</div>
        </div>
      </div>

      <div class="home-link-area">
        <router-link to="/" class="home-link">首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Slider from '../../components/common/slider'
  import Header from '../../components/header.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'
  import {newsNotice} from '../../server/api'
  import alertTip from '../../components/common/alertTip'

  export default {
    data() {
      return {
        newsList: ''
      }
    },
    mounted() {
      newsNotice().then(res => {
        if (res.status) {
          console.log(res.data.list)
          this.newsList = res.data.list
        }
      })
    },
    computed: {},
    methods: {
      jumpLink(realIndex) {
        // source  为1 表示内部连接   2表示外部链接
        let jumpType = this.newsList[realIndex].source
        // type 为1 表示是新闻  2是公告
        let linkType = this.newsList[realIndex].type
        if (jumpType == 1) {
          if (linkType == 1) {
            this.$router.push('/news/' + this.newsList[realIndex].id)
          } else if (linkType == 2) {
            this.$router.push('/notice/' + this.newsList[realIndex].id)
          }
        } else if (jumpType == 2) {
          console.log(this.newsList[realIndex].link)
          window.location.href = (this.newsList[realIndex].link)
        }
      }
    },
    components: {
      Slider,
      Header,
      alertTip,
      TwoLanguageTitle
    }
  }
</script>

<style lang="scss" scoped>
  .news-list-page {
    .news {
      margin: 35px;
      .news-item {
        background-color: #ffffff;
        padding: 37px 37px 0;
        border-radius: 24px;
        margin-bottom: 25px;
        display: block;
        .news-img {
          width: 884px;
          height: 377px;
          display: block;
        }
        .news-dec {
          height: 102px;
          line-height: 102px;
          display: flex;
          .news-title {
            flex: 7;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .news-time {
            flex: 3;
            color: rgb(178, 178, 178);
            text-align: right;
          }
        }
      }
      .home-link-area {
        width: 100%;
        height: 125px;
        position: fixed;
        bottom: 213px;
        right: 81px;
        /*padding-top: 20px;*/
        .home-link {
          float: right;
          color: #ffffff;
          width: 125px;
          /*height: 125px;*/
          line-height: 125px;
          text-align: center;
          border-radius: 50%;
          background: rgb(134, 193, 248);
        }
      }
    }
  }
</style>

