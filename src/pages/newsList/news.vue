<template>
  <div class="news-page" v-wechat-title="$route.meta.title='新闻'">
    <Header :title='newsData.title'/>
    <div class="news-area">
      <div class="news-main">
        <div class="header-area">
          {{newsData.title}}
        </div>
        <div class="auther-area">
          <div class="left">编辑：{{newsData.author}}</div>
          <div class="right">{{newsData.created_time}}</div>
        </div>
        <div v-html="newsData.content"></div>
        <div v-if="newsData.show_button === '1'" class="enlist-area" @click="showEnlist()">
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
    font-size: 32px;
    line-height: 40px;
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
        .header-area{
          margin-top: 20px;
          color: rgb(58, 178, 237);;
          padding-right: 204px;
          line-height: 55px;
          font-size: 42px;
          border-bottom: 1px solid rgb(199, 199, 199);
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
        .auther-area{
          display: flex;
          height: 50px;
          font-size: 34px;
          line-height: 50px;
          color: rgb(199, 199, 199);
          margin-bottom: 10px;
          .left,.right{
            flex: 1;
          }
          .left{
            text-align: left;
          }
          .right{
            text-align: right;
          }
        }
        .bottom-line{
          border-top: 1px solid rgb(199, 199, 199);
          height: 50px;
        }
      }
    }

  }
</style>

