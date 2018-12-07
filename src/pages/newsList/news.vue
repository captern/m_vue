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
        <div class="enlist-area" @click="showEnlist()">
          报名
        </div>
        <div class="bottom-line">&nbsp;</div>
      </div>
    </div>
    <!--提示框弹出部分-->
    <enlist-tip v-if="enlistTip" @closeTip="enlistTip = false" :tipType="tipType" :alertText="alertText"/>

  </div>
</template>

<script>
  import Header from '../../components/header.vue'
  import {newsDetail} from '../../server/api'
  import enlistTip from '../../components/common/enlistTip'

  export default {
    data() {
      return {
        newsId: '',
        newsData: '',
        enlistTip: false
      }
    },
    mounted() {
      this.newsId = this.$route.params.newsId;
      newsDetail(this.newsId).then(res => {
        this.newsData = res.data
      })
    },
    methods: {
      showEnlist(){
        this.enlistTip = !this.enlistTip
      }
    },
    components: {
      Header,
      enlistTip
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
        .enlist-area{
          width: 337px;
          height: 74px;
          margin: 70px auto 50px;
          background-color: rgb(192,50,48);
          color: #ffffff;
          text-align: center;
          line-height: 74px;
          border-radius: 24px;
        }
        .bottom-line{
          border-top: 1px solid rgb(199, 199, 199);
          height: 50px;
        }
      }
    }

  }
</style>

