<template>
  <!--<div class="vote-option-page" v-wechat-title="$route.meta.title='{{voteData.name}}'">-->
  <div class="vote-option-page" v-wechat-title="$route.meta.title='投票选项详情'">
    <Header :title='voteData.name' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-option-area">
      <div class="header-area">
        <div class="title">
          {{voteData.name}}
        </div>
        <!--<div class="heart">-->
          <!--<img src="../../common/icon/icon-item-0@3x.png" alt="">-->
        <!--</div>-->
      </div>
      <div class="vote-main" v-html="voteData.content"></div>
      <div class="vote-btn" v-if="voteData.is_img == 1" @click="postVote">支持投票</div>
      <router-link v-else-if="voteData.is_img == 0" :to="'/postVote/' + voteData.vid " class="vote-btn" href="">
        支持投票
      </router-link>
    </div>
    <alert-tip v-if="showFalseAlert" @closeTip="showVoteFalseAlert" tipType="one" :alertText="this.falseMsg ? this.falseMsg : '请选择投票选项'" btnOne="返回"/>
  </div>
</template>

<script>
  import {getUse, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import alertTip from '../../components/common/alertTip'
  import {voteOptionMain, postVote} from '../../server/voteApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        optionId: '',
        voteData: '',
        enlistTip: false,
        showAlert: false,
        alertText: '待定义',
        showFalseAlert: false,
        falseMsg: null
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    mounted() {
      this.optionId = this.$route.params.voteId;
      let getData = {
        id: this.optionId
      }
      voteOptionMain(getData).then(res => {
        this.voteData = res.data
      })
    },
    methods: {
      postVote(){
        let postResult = new Array()
        postResult.push(this.optionId)
        postVote(this.voteData.vid, JSON.stringify(postResult)).then(res=>{
          console.log(res)
          if(res.status){ //提交成功
            console.log('提交投票成功')
            this.$router.push('/voteSuccess/' + this.voteData.vid);
          }else{
            this.showFalseAlert =!this.showFalseAlert
            this.falseMsg = res.msg
          }
        })
      },
      showVoteFalseAlert(){
        this.showFalseAlert = !this.showFalseAlert
      },
    },
    components: {
      Header,
      HomeIcon,
      alertTip
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
      .vote-main {
        font-size: 19px;
        line-height: 30px;
        padding-top: 44px;
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

