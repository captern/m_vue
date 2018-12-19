<template>
  <div class="news-list-page" v-wechat-title="$route.meta.title='新闻列表'">
    <Header title='新闻'/>
    <div class="news" v-if="newsList">
      <!--<router-link :to="{path:'/news',query:{id:item.newsId}}" class="news-item" v-for="item in newsData"</router-link>-->
      <div class="news-item" v-for="(item, index) in newsList" :key="index" :newsId="item.id" @click="jumpLink(index)">
        <img class="news-img" :src='item.cover' alt="tupian">
        <div class="news-dec">
          <div class="news-title" v-html="item.content"></div>
          <!--<div class="news-title">{{item.content}}</div>-->
          <div class="news-time">{{item.updated_time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Slider from '../../components/common/slider'
  import Header from '../../components/header.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'
  import {newsList} from '../../server/api'
  import alertTip from '../../components/common/alertTip'

  export default {
    data() {
      return {
        newsList: ''
      }
    },
    mounted() {
      newsList().then(res => {
        if (res.status) {
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
        if(jumpType == 1){
          if(linkType == 1){
            this.$router.push('/news/'+ this.newsList[realIndex].id)
          }else if(linkType == 2){
            this.$router.push('/notice/'+ this.newsList[realIndex].id)
          }
        }else if(jumpType == 2){
          window.location.href=(this.newsList[realIndex].link)
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
    }
  }
</style>

