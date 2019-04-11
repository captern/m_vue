<template>
  <div class="news-page" v-wechat-title="$route.meta.title='公告'">
    <Header :title='newsData.title'/>
    <div class="news-area">
      <div class="news-main">
        <div class="header-area" :style="{color:newsData.color}">
          {{newsData.title}}
        </div>
        <div class="auther-area">
          <!--<div class="left">编辑：{{newsData.author}}</div>-->
          <!--<div class="right">{{newsData.created_time}}</div>-->
          <div class="left">编辑：{{newsData.created_time}}</div>
        </div>
        <div class="text-area" v-html="newsData.content"></div>
        <div v-if="newsData.show_button === '1'" class="enlist-area" @click="showEnlist()">
          点击报名
        </div>
        <div class="bottom-line">&nbsp;</div>
      </div>
    </div>
    <!--提示框弹出部分-->
    <enlist-tip v-if="enlistTip" @closeTip="hideEnlist" :alertText="alertText" :couId = 'newsData.cou_id'/>
    <!--<enlist-tip v-if="enlistTip" @closeTip="hideEnlist" :alertText="alertText" :couId = '31'/>-->
    <!--确定取消提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" tipType="one" :alertText=" alertText ? alertText : '报名成功'"/>


  </div>
</template>

<script>
  import {hideVideo} from '../../common/js/util'
  import Header from '../../components/header.vue'
  import {newsDetail} from '../../server/api'
  import enlistTip from '../../components/common/enlistTip'
  import alertTip from '../../components/common/alertTip'
  import {lessonMain, signLesson} from '../../server/lessonApi'

  export default {
    data() {
      return {
        newsId: '',
        newsData: '',
        enlistTip: false,
        showAlert: false,
        alertText:'待定义'
      }
    },
    mounted() {
      this.newsId = this.$route.params.noticeId;
      this.getData();
    },
    methods: {
      getData(){
        newsDetail(this.newsId).then(res => {
          this.newsData = res.data
        })
      },
      showEnlist(){
        this.enlistTip = !this.enlistTip
      },
      hideEnlist(type){
        this.enlistTip = !this.enlistTip
        if(type){
          this.confirmRegister();
        }else{
        }
      },
      confirmRegister(){
        let postData = {
          id:this.newsData.cou_id
        }
        signLesson(postData).then(res => {
          if(res.status){
            this.showAlert = true
            this.getData();
          }else{
            this.showAlert = true
            this.alertText = res.msg
          }
        })
      }
    },
    components: {
      Header,
      enlistTip,
      alertTip
    },
    watch: {
      enlistTip(newVal, oldVal) {
        hideVideo(newVal);
      },
      showAlert(newVal, oldVal) {
        hideVideo(newVal);
      }
    }
  }
</script>

<style lang="scss">
  .news-page {
    background: url("../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    min-height: 100vh;
    width: 100%;
    overflow: scroll;
    .news-area {
      /*position: absolute;*/
      width: calc(100% - 70px);
      min-height: calc(100% - 170px);
      background: #ffffff;
      border-radius: 24px;
      margin: 35px;
      .news-main {
        padding: 37px 37px 130px;
        margin-bottom: 25px;
        display: block;
        .enlist-area{
          /*width: 337px;*/
          /*height: 74px;*/
          /*margin: 70px auto 50px;*/
          /*background-color: rgb(192,50,48);*/
          /*color: #ffffff;*/
          /*text-align: center;*/
          /*line-height: 74px;*/
          /*border-radius: 24px;*/

          position: fixed;
          bottom: 56px;
          width: 497px;
          height: 66px;
          line-height: 66px;
          margin: 0 auto;
          background-color: rgb(58, 178, 237);
          color: #ffffff;
          text-align: center;
          border-radius: 24px;
        }
        .header-area{
          margin-top: 20px;
          color: rgb(58, 178, 237);;
          /*padding-right: 204px;*/
          line-height: 37px;
          font-size: 31px;
          border-bottom: 1px solid rgb(199, 199, 199);
          padding-bottom: 13px;
        }
        .auther-area{
          display: flex;
          height: 17px;
          font-size: 17px;
          line-height: 50px;
          color: rgb(178, 178, 179);
          margin-bottom: 35px;
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
        .text-area {
          /*font-size: 19px;*/
          /*line-height: 25px;*/
          /*color: rgb(0, 0, 0);*/
          img {
            width: 100%;
            height: auto;
          }
          video{
            width: 100%;
            height: auto;
          }
          a{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
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

