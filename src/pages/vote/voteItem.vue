<template>
  <div class="vote-item-page" v-wechat-title="$route.meta.title='投票详情'">
    <Header title='投票详情' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-item-area">
      <div class="header-area">
        <div class="title">{{voteData.name}}</div>
        <!--<div class="heart">-->
          <!--<img src="../../common/icon/icon-item-0@3x.png" alt="">-->
        <!--</div>-->
      </div>
      <div class="author-time">
        <div class="author">编辑：{{voteData.author}}</div>
        <div class="time">{{voteData.time}}</div>
      </div>
      <div class="vote-main" v-html="voteData.content"></div>
      <!--跳转 费图片-->
      <router-link v-if="voteData.is_img == 0" :to="'/postVote/'+ voteData.id" class="vote-btn">参与投票</router-link>
      <!--跳转图片-->
      <router-link v-else-if="voteData.is_img == 1" :to="'/voteOption/'+ voteData.id" class="vote-btn">参与投票</router-link>
    </div>
  </div>
</template>

<script>
  import {getUse, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'

  import {voteMain} from '../../server/voteApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        voteId: '',
        voteData: '',
        enlistTip: false,
        showAlert: false,
        alertText: '待定义'
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    mounted() {
     this.voteId = this.$route.params.voteId;
     let getData = {
       id: this.voteId
     }
      voteMain(getData).then(res => {
        this.voteData = res.data
      })
    },
    methods: {
    },
    components: {
      Header,
      HomeIcon
    },
  }
</script>

<style lang="scss" scoped>
  .vote-item-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-one.png");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .vote-item-area {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      min-height: calc(100vh - 106px);
      .header-area {
        display: flex;
        padding-bottom: 12px;
        border-bottom: 1px solid rgb(199, 199, 199);
        .title {
          flex: 3;
          font-size: 31px;
          line-height: 39px;
          color: #3ab2ed;
        }
        .heart {
          flex: 1;
          text-align: right;
          vertical-align: top;
          img {
            width: 59px;
            height: 59px;
          }
        }
      }
      .author-time {
        display: flex;
        .author, .time {
          flex: 1;
          font-size: 17px;
          line-height: 26px;
          color: #b2b2b3;
          margin: 10px 0 15px;
        }
        .time {
          text-align: right;
        }
      }
      .vote-main {
        font-size: 19px;
        line-height: 30px;
        color: #000000;
        padding-bottom: 111px;
      }
      .vote-btn {
        position: fixed;
        left: 46px;
        bottom: 55px;
        width: calc(100% - 92px);
        height: 66px;
        line-height: 66px;
        font-size: 30px;
        background: #3ab2ed;
        text-align: center;
        color: #ffffff;
        border-radius: 10px;
      }
    }
  }
</style>

