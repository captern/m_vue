<template>
  <div class="news-list-page" v-wechat-title="$route.meta.title='公告列表'">
    <Header title='公告'/>
    <HomeIcon></HomeIcon>
    <Search @parentMethod="changeSearch"></Search>
    <div class="news" v-if="newsList">
      <!--<router-link :to="{path:'/news',query:{id:item.newsId}}" class="news-item" v-for="item in newsData"-->
      <!--<router-link :to="'/notice/' + item.id" class="news-item" v-for="(item, index) in new" :key="index" :newsId="item.id"></router-link>-->
      <div class="news-item" v-for="(item, index) in newsList" :key="index" :newsId="item.id" @click="jumpLink(index)">
        <img class="news-img" :src='item.cover' alt="tupian">
        <div class="news-dec">
          <!--<div class="news-title" v-html="item.content"></div>-->
          <div class="news-title">{{item.title}}</div>
          <div class="news-time">{{item.updated_time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Slider from '../../components/common/slider'
  import Search from '../../components/search.vue'
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'
  import {newsNotice} from '../../server/api'
  import alertTip from '../../components/common/alertTip'

  export default {
    data() {
      return {
        newsList: '',
        searchVal: ''
      }
    },
    mounted() {
      this.typeId = this.$route.params.type;
      this.getData(this.typeId)
    },
    computed: {},
    methods: {
      changeSearch(val) {
        this.searchVal = val
        this.getData(this.typeId)
      },
      getData(typeId) {
        let getData = {
          type: 2,
          name: this.searchVal,
          group: this.typeId
        }
        newsNotice(getData).then(res => {
          if (res.status) {
            this.newsList = res.data.list
          }
        })
      },
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
      HomeIcon,
      Header,
      Search,
      alertTip,
      TwoLanguageTitle,
    }
  }
</script>

<style lang="scss" scoped>
  .news-list-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    min-height: 100vh;
    width: 100%;
    overflow: scroll;
    .news {
      margin: 24px;
      .news-item {
        background-color: #ffffff;
        padding: 20px 20px 0;
        border-radius: 24px;
        margin-bottom: 16px;
        /*height: 414px;*/
        display: block;
        .news-img {
          width: 100%;
          height: 339px;
          display: block;
        }
        .news-dec {
          height: 64px;
          line-height: 64px;
          display: flex;
          .news-title {
            font-size: 23px;
            color: rgb(35, 24, 12);
            flex: 7;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .news-time {
            flex: 3;
            font-size: 17px;
            color: rgb(178, 178, 179);
            text-align: right;
          }
        }
      }
    }
  }
</style>

