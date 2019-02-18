<template>
  <div class="vote-option-page" v-wechat-title="$route.meta.title='{{voteData.title}}'">
    <Header :title='voteData.title' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-option-area">
      <div class="header-area">
        <div class="title">
          {{voteData.title}}
        </div>
        <!--<div class="heart">-->
          <!--<img src="../../common/icon/icon-item-0@3x.png" alt="">-->
        <!--</div>-->
      </div>
      <div class="vote-main" v-html="voteData.content"></div>
      <router-link :to="'/postVote/' + voteData.id" class="vote-btn">支持投票</router-link>
    </div>
  </div>
</template>

<script>
  import {getUse, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'

  import {voteOptionsMain} from '../../server/voteApi'

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
      voteOptionsMain(this.voteId).then(res => {
        console.log(res)
        this.voteData = res.data
      })
    },
    methods: {},
    components: {
      Header,
      HomeIcon
    },
  }
</script>

<style lang="scss" scoped>
  .vote-option-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-one.png");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .vote-option-area {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      min-height: calc(100vh - 180px);
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
      .vote-main {
        font-size: 19px;
        line-height: 30px;
        padding-top: 44px;
        color: #000000;
      }
      .vote-btn {
        display: block;
        margin: 57px auto 0;
        width: 100%;
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

