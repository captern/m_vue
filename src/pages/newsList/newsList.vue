<template>
  <div class="news-page">
    <Header title='新闻'/>
    <div class="news" v-if="newsData">
      <!--<router-link to="/news" class="news-item" v-for="item in newsData" :key="item.newsId" :newsId="item.newsId">-->
      <router-link :to="{path:'/news',query:{id:item.newsId}}" class="news-item" v-for="item in newsData"
                   :key="item.newsId" :newsId="item.newsId">
        <img class="news-img" :src='item.img' alt="tupian ">
        <div class="news-dec">
          <div class="news-title">{{item.title}}</div>
          <div class="news-time">{{item.time}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Slider from '../../base/slider/slider'
  import Header from '../../components/header.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'
  import {newsList} from '../../server/api'
  import alertTip from '../../components/common/alertTip'

  export default {
    data() {
      return {
        newsData: ''
      }
    },
    mounted() {
      newsList().then(res => {
        this.newsData = res.data.news
      })
    },
    computed: {},
    methods: {},
    components: {
      Slider,
      Header,
      alertTip,
      TwoLanguageTitle
    }
  }
</script>

<style lang="scss" scoped>
  .news-page {
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
    }
  }
</style>

