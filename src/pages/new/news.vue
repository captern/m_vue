<template>
  <div class="news-page" v-wechat-title="$route.meta.title='公告'">
    <Header :title='newsData.title'/>
    <HomeIcon/>
    <div class="news-area">
      <div class="news-main">
        <div class="header-area">
          {{newsData.title}}
        </div>
        <div class="auther-area">
          <div class="left">编辑：{{newsData.created_time}}</div>
          <!--<div class="left">编辑：{{newsData.author}}</div>-->
          <!--<div class="right">{{newsData.created_time}}</div>-->
        </div>
        <div class="text-area" v-html="newsData.content"></div>
        <div v-if="newsData.show_button === '1'" class="enlist-area" @click="showEnlist()">
          点击报名
        </div>
      </div>
    </div>
    <!--提示框弹出部分-->
    <enlist-tip v-if="enlistTip" @closeTip="hideEnlist" :alertText="alertText"/>
    <!--确定取消提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" tipType="one" alertText="报名成功"/>


  </div>
</template>

<script>
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import {newsDetail} from '../../server/api'
  import enlistTip from '../../components/common/enlistTip'
  import alertTip from '../../components/common/alertTip'

  export default {
    data() {
      return {
        newsId: '',
        newsData: '',
        enlistTip: false,
        showAlert: false,
        alertText: '待定义'
      }
    },
    mounted() {
      this.newsId = this.$route.params.newsId;
      newsDetail(this.newsId).then(res => {
        this.newsData = res.data
      })
    },
    methods: {
      showEnlist() {
        this.enlistTip = !this.enlistTip
      },
      hideEnlist(type) {
        this.enlistTip = !this.enlistTip
        if (type) {
          this.showAlert = true
        } else {
        }
      }
    },
    components: {
      Header,
      enlistTip,
      alertTip,
      HomeIcon
    }
  }
</script>

<style lang="scss" scoped>
  .news-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    min-height: 100vh;
    width: 100%;
    overflow: scroll;
    .news-area {
      margin: 22.5px;
      background: #ffffff;
      border-radius: 24px;
      .news-main {
        padding: 40px 35px 130px;
        display: block;
        .header-area {
          color: rgb(58, 178, 237);;
          padding-right: 204px;
          font-size: 31px;
          line-height: 35px;
          border-bottom: 1px solid rgb(199, 199, 199);
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
        .auther-area {
          display: flex;
          height: 20px;
          font-size: 17px;
          line-height: 20px;
          color: rgb(178, 178, 179);
          margin-bottom: 20px;
          .left, .right {
            flex: 1;
          }
          .left {
            text-align: left;
          }
          .right {
            text-align: right;
          }
        }
        .text-area {
          font-size: 19px;
          line-height: 25px;
          color: rgb(0, 0, 0);
          img{
            width: 100%;
            height: auto;
          }
        }
        .enlist-area {
          position: fixed;
          bottom: 56px;
          width: 517px;
          height: 66px;
          line-height: 66px;
          margin: 0 auto;
          background-color: rgb(58, 178, 237);
          color: #ffffff;
          text-align: center;
          border-radius: 24px;
        }
      }
    }

  }
</style>

