<template>
  <div class="vote-item-page" v-wechat-title="$route.meta.title='活动详情'">
    <Header title='活动详情' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-item-area">
      <div class="header-area">
        <div class="title">{{lessonData.name}}</div>
        <!--<div class="heart">-->
          <!--<Heart :activityId="lessonData.id" :heart=false v-if="lessonData.is_collect == 0"></Heart>-->
          <!--<Heart :activityId="lessonData.id" :heart=true v-else-if="lessonData.is_collect == 1"></Heart>-->
        <!--</div>-->
      </div>
      <div class="author-time">
        <div class="author">主讲人：{{lessonData.teacher}}</div>
        <div class="time">{{lessonData.start_time}}</div>
      </div>
      <!--<div class="vote-main" v-html="lessonData.desc"></div>-->
      <div class="vote-main" v-html="lessonData.introduction"></div>
      <div class="btns-area">
        <div class="vote-btn" @click="showCancelAlert">报名</div>
      </div>
    </div>
    <!--提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showCancelAlert" @confirmTip="cancelSignUp" tipType="three"
               alertText="是否报名本活动" btnOne="返回" btnTwo="报名"/>
    <alert-tip v-if="successAlert" @closeTip="showSuccessAlert"  tipType="one"
               :alertText="alertText ? alertText : '报名成功'" btnOne="返回"/>
  </div>
</template>

<script>
  import {hideVideo} from '../../common/js/util'
  import {getUser, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import alertTip from '../../components/common/alertTip'
  import Heart from '../../components/common/heart'
  import {mapState, mapActions} from 'vuex'
  import {activityMain, cancelActivity, activityRegister, cancelSignIn, registerCheck} from '../../server/myApi'
  import {getActivityDes, confirmActivity} from '../../server/activityApi'
  import wx from 'weixin-js-sdk';


  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        activityId: '',
        lessonData: '',
        enlistTip: false,
        showAlert: false,
        logOutTest: false,
        successAlert: false,
        alertText: null,
        myLocation: '',
        signPackage: ''
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    mounted() {
      this.activityId = this.$route.params.activityId;
      this.getData();
      this.addressDetail();
    },
    methods: {
      addressDetail() { //获取地理位置
        let _this = this;
        var vm = this;
//全局的this在方法中不能使用，需要重新定义一下
        var geolocation = new BMap.Geolocation();
        var gc = new BMap.Geocoder();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            const myGeo = new BMap.Geocoder()
            myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
              if (data.addressComponents) {
                const result = data.addressComponents
                const location = {
                  creditLongitude: r.point.lat, // 经度
                  creditLatitude: r.point.lng, // 纬度
//                  creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
                }
//                _this.myLocation = location.creditLongitude + ',' + location.creditLatitude
                _this.myLocation = location.creditLatitude + ',' + location.creditLongitude
                console.log(location)
              }
            })
          }
        })
      },
      getData() {
        let getData = {
          id: this.activityId
        }
//        myLessonMain(getData).then(res => {
        getActivityDes(getData).then(res => {
          this.lessonData = res.data;
          this.signPackage = res.signPackage;
            this.setShare();
        })

      },
      showCancelAlert() {
        this.showAlert = !this.showAlert
      },
      showSuccessAlert() {
        this.successAlert = !this.successAlert;
        this.$router.go(-1);
      },
      // 取消报名课程
      cancelSignUp() {
        let postData = {
          id: this.activityId
        }
        confirmActivity(postData).then(res => {
          if (res.status) {
            this.successAlert = !this.successAlert
            this.alertText = '报名成功'
          } else {
            this.successAlert = !this.successAlert
            this.alertText = res.msg
          }
        })
      },
      // 获取位置信息
//      签到部分
      registerCheck() {
        let postData = {
          id: this.activityId,
          coordinates: ''
        }
        activityRegister(postData).then(res => {
          if (res.status) {
            this.successAlert = !this.successAlert
            this.alertText = res.msg
            this.getData()
          } else {
            this.successAlert = !this.successAlert
            this.alertText = res.msg
          }
        })
      },
        setShare(){
            wx.config({
                debug: true,
                appId: this.signPackage.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                timestamp:this.signPackage.timestamp, // 必填，生成签名的时间戳
                nonceStr: this.signPackage.nonceStr, // 必填，生成签名的随机串
                signature: this.signPackage.signature,// 必填，签名，见附录1
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
                    title: this.lessonData.name, // 分享标题
                    link:  this.lessonData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: "", // 分享图标
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
                    title: this.lessonData.name, // 分享标题
                    desc: this.lessonData.desc, // 分享描述
                    link: this.lessonData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:'', // 分享图标
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
      alertTip,
      Heart
    },
    watch: {
      showAlert(newVal, oldVal) {
        hideVideo(newVal);
      },
      successAlert(newVal, oldVal) {
        hideVideo(newVal);
      }
    }
  }
</script>

<style lang="scss">
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
        /*font-size: 19px;*/
        /*line-height: 30px;*/
        /*color: #000000;*/
        padding-bottom: 100px;
        a{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }
        img{
          max-width: 100%;
        }
        video{
          width: 100%;
          height: auto;
        }
        iframe{
          width: 100%;
          height: auto;
        }
      }
      .btns-area {
        position: fixed;
        left: 46px;
        bottom: 55px;
        width: calc(100% - 92px);
        .vote-btn {
          margin: 17px auto 0;
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
  }
</style>

