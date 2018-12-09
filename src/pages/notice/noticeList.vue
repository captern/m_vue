<template>
  <div class="news-list-page">
    <Header title='公告'/>
    <div class="news" v-if="newsList">
      <!--<router-link :to="{path:'/news',query:{id:item.newsId}}" class="news-item" v-for="item in newsData"-->
      <router-link :to="'/notice/' + item.id" class="news-item" v-for="(item, index) in newsList"
                   :key="index" :newsId="item.id">
        <img class="news-img" :src='item.cover' alt="tupian">
        <div class="news-dec">
          <div class="news-title" v-html="item.content"></div>
          <!--<div class="news-title">{{item.content}}</div>-->
          <div class="news-time">{{item.updated_time}}</div>
        </div>
      </router-link>
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
        console.log(res)
        if (res.status) {
          this.newsList = res.data.list
        }
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
    }
  }
</style>

