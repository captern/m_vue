<template>
  <div class="vote-success-page" v-wechat-title="$route.meta.title='投票成功'">
    <Header title='投票成功' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-success-area">
      <div class="des-area">
        <img class="success-icon" src="../../common/image/activity/vote-success.png" alt="">
        <p class="success-des">投票成功</p>
        <div class="btn-area">
          <div class="btn">
            <router-link to="/vote"><span>更多投票活动</span></router-link>
          </div>
          <div class="btn" @click="sharePopFun()"><span>分享到朋友圈</span></div>
        </div>
      </div>
      <div class="ranking-area">
        <div class="title">
          <span>排行榜</span>
        </div>
        <div class="ranking-item-area">
          <router-link :to="'/voteOptionMain/' + item.id " class="ranking-item" v-for="(item, index) in voteOptions.list" :key="index">
            <div class="ranking-icon">{{index + 1}}</div>
            <img :src="item.img" alt="">
            <p class="option-dec">{{item.name}}</p>
            <p class="vote-num check" v-if="item.checked == 1">{{item.num}}票(已选)</p>
            <p class="vote-num" v-else>{{item.num}}票</p>
          </router-link>
        </div>
      </div>
    </div>
    <div class="share-pop" v-if="sharePop">
      <div class="alert-bkg" @click="sharePopFun()">
        <img class="share-icon" src="../../common/image/activity/share-icon.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import {getUse, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import {voteResult} from '../../server/voteApi'
  import wx from 'weixin-js-sdk';

  export default {
    data() {
      return {
        enlistTip: true, // 是否请求接口
        voteId: '',
        checkType: 2,    //checkType 表示选择的类型  1为单选 2 为多选
        voteOptions: '',
        showAlert: false,
        sharePop: false,
        checkedId: ['1'],
        options: [
          {
            id: '1',
            dec: '技师人才服务高级培训1号',
            progress: '10%'
          },
          {
            id: '2',
            dec: '技师人才服务高级培训2号',
            progress: '30%'
          },
          {
            id: '3',
            dec: '技师人才服务高级培训3号',
            progress: '20%'
          },
          {
            id: '4',
            dec: '技师人才服务高级培训4号',
            progress: '30%'
          }, {
            id: '5',
            dec: '技师人才服务高级培训5号',
            progress: '10%'
          }
        ]
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
      // this.voteId = 4;
      voteResult(getData).then(res => {
        this.voteOptions = res.data
      })
      // this.setShare();
    },
    methods: {
      sharePopFun(){
        this.sharePop = !this.sharePop
      },
      showVoteAlert(){
        this.showAlert =! this.showAlert
      },
      postVote(){
        console.log('发送选择')
        this.$router.push('/index');
      },
      setShare(){
        wx.config({
          debug: false,
          appId: appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
          timestamp:timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature,// 必填，签名，见附录1
          //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
          jsApiList: [
            'onMenuShareAppMessage','onMenuShareTimeline',
            // 'onMenuShareQQ','onMenuShareQZone'
          ]
        });
        //处理验证失败的信息
        wx.error(function (res) {
          logUtil.printLog('验证失败返回的信息:',res);
        });
        //处理验证成功的信息
        wx.ready(function () {
          //              alert(window.location.href.split('#')[0]);
          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: _this.newDetailObj.title, // 分享标题
            link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _this.newDetailObj.thu_image, // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              logUtil.printLog("分享到朋友圈成功返回的信息为:",res);
              _this.showMsg("分享成功!")
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              logUtil.printLog("取消分享到朋友圈返回的信息为:",res);
            }
          });
          //分享给朋友
          wx.onMenuShareAppMessage({
            title: _this.newDetailObj.title, // 分享标题
            desc: _this.desc, // 分享描述
            link: window.location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: _this.newDetailObj.thu_image, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (res) {
              // 用户确认分享后执行的回调函数
              logUtil.printLog("分享给朋友成功返回的信息为:",res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              logUtil.printLog("取消分享给朋友返回的信息为:",res);
            }
          });
        });
      }
    },
    components: {
      Header,
      HomeIcon,
    },
  }
</script>

<style lang="scss" scoped>
  .vote-success-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-one.png");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .vote-success-area {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      min-height: calc(100vh - 106px);
      .des-area{
        text-align: center;
        .success-icon{
          width: 91px;
          height: 91px;
          border-radius: 50%;
        }
        .success-des{
          font-size: 25px;
          color: #3ab2ed;
          padding-top: 25px;
          padding-bottom: 52px;
        }
        .btn-area{
          display: flex;
          .btn{
            flex: 1;
            text-align: center;
            span{
              background: #3ab2ed;
              color: #ffffff;
              padding: 3px 12px;
              border-radius: 10px;
              font-size: 20px;
            }
          }
        }
      }
      .ranking-area{
        .title{
          height: 13.5px;
          border-bottom: 1px solid #dcdddd;
          text-align: center;
          margin-top: 63px;
          span{
            background: #ffffff;
            padding: 0 10px;
            font-size: 27px;
            color: #34aedd;
          }
        }
        .ranking-item-area{
          display: flex;
          flex-wrap: wrap;
          flex-flow: row wrap;
          padding-top: 32px;
          /*width: 104%;*/
        }
        .ranking-item{
          flex: 0 0 176px;
          text-align: center;
          background: #f6f6f6;
          margin-right: 10px;
          margin-bottom: 15px;
          &:nth-child(3n){
            margin-right: 0;
          }
          img{
            width: 176px;
            height: 176px;
          }
          .ranking-icon{
            position: absolute;
            font-size: 18px;
            width: 29px;
            height: 29px;
            line-height: 29px;
            color: #ffffff;
            background: #3ab3ed;
          }
          .option-dec{
            font-size: 17px;
            height: 27px;
            line-height: 27px;
            color: #231815;
            padding: 0 10px;
            overflow: hidden;
          }
          .vote-num{
            font-size: 21px;
            line-height: 27px;

            padding-bottom: 5px;
            &.check{
              color: #3ab2ed;
            }
          }
        }
      }
    }
    .share-pop{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 200;
      width: 100%;
      height: 100%;
      .alert-bkg {
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0.3;
        .share-icon{
          width: 162px;
          height: 247px;
          position: absolute;
          right: 74px;
          top: 10px;
        }
      }
    }
  }
</style>

