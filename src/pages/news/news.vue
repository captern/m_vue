<template>
  <div class="news-page">
    <Header :title='newsData.title'/>
    <div class="news-area">
      <div class="news-main">
        <div v-html="newsData.content"></div>
        <div v-html="newsData.content"></div>
        <div v-html="newsData.content"></div>
        <div v-html="newsData.content"></div>
        <div v-html="newsData.content"></div>
        <div v-html="newsData.content"></div>
        <div v-html="newsData.content"></div>
        <div v-html="newsData.content"></div>
        <div v-html="newsData.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/header.vue'
  import {newsMain} from '../../server/api'

  export default {
    data() {
      return {
        newsId: '',
        newsData: ''
      }
    },
    mounted() {
    },
    mounted() {
      this.newsId = this.$route.params.newsId;
      //获取当前城市名字
      newsMain(this.newsId).then(res => {
        this.newsData = res.data
        console.log(this.newsData)
      })
    },
    methods: {},
    components: {
      Header,
    }
  }
</script>

<style lang="scss" scoped>
  .news-page {
    position: relative;
    top:0;
    overflow: scroll;
    .news-area {
      /*position: absolute;*/
      width: calc(100% - 70px);
      min-height: calc(100% - 170px);
      background: #ffffff;
      border-radius: 24px;
      margin: 35px;
      .news-main {
        padding: 37px 37px 0;
        margin-bottom: 25px;
        display: block;
      }
    }

  }
</style>

