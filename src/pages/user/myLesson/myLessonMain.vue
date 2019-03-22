<template>
  <div class="vote-item-page" v-wechat-title="$route.meta.title='课程详情'">
    <Header title='课程详情' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-item-area">
      <div class="check-icon">已参与</div>
      <div class="header-area">
        <div class="title">{{lessonData.name}}</div>
        <div class="heart">
          <Heart :lessonId="lessonData.id" :heart=false v-if="lessonData.is_collect == 0"></Heart>
          <Heart :lessonId="lessonData.id" :heart=true v-else-if="lessonData.is_collect == 1"></Heart>
        </div>
      </div>
      <div class="author-time">
        <div class="author">主讲人：{{lessonData.teacher}}</div>
        <div class="time">{{lessonData.created_time}}</div>
      </div>
      <div class="vote-main" v-html="lessonData.introduction"></div>
      <div class="btns-area">
        <router-link :to="'/myLessonMain/evaluate/' +lessonData.id" v-if="lessonData.CanAppraise">
          <div class="vote-btn">课程评价</div>
        </router-link>
        <router-link :to="'/myLessonMain/coursewareList/' +lessonData.id"
                     v-if="lessonData.files && lessonData.files.length > 0">
          <div class="vote-btn">课件预览</div>
        </router-link>
        <div v-if="lessonData.type == '1'">
          <div v-if="lessonData.test_id && !lessonData.is_test" class="vote-btn" @click="goTest">课后测试</div>
          <router-link v-else-if="lessonData.test_id" :to="'/testFail/' + lessonData.test_id + '/' + lessonId">
            <div class="vote-btn">查看错题</div>
          </router-link>
        </div>
        <div v-else-if="lessonData.type == '2'">
          <div v-if="lessonData.test_id && !lessonData.is_test && lessonData.test_id!= '0'" class="vote-btn"
               @click="goTest">课后测试
          </div>
          <router-link v-else-if="lessonData.test_id" :to="'/testFail/' + lessonData.test_id + '/' + lessonId">
            <div class="vote-btn">查看错题</div>
          </router-link>
        </div>
        <div v-if="lessonData.check_but == 'start'" class="vote-btn" @click="registerCheckBtnEnter('1')">上课签到</div>
        <div v-else-if="lessonData.check_but == 'end'" class="vote-btn" @click="registerCheckBtnEnter('2')">下课签到</div>
        <div v-if="lessonData.canCancel" class="vote-btn" @click="showCancelAlert">取消报名</div>
      </div>
    </div>
    <!--提示框弹出部分-->
    <!--取消报名成功的弹框-->
    <alert-tip v-if="showCancelSuccessAlert" @closeTip="cancelSuccessJump" tipType="one"
               :alertText="alertText ? alertText : '是否取消报名'" btnOne="返回"/>
    <alert-tip v-if="showAlert" @closeTip="showCancelAlert" @confirmTip="cancelSignUp" tipType="three"
               alertText="是否取消报名" btnOne="返回" btnTwo="取消报名"/>
    <alert-tip v-if="successAlert" @closeTip="showSuccessAlert" @confirmTip="cancelSignUp" tipType="one"
               :alertText="alertText ? alertText : '报名成功'" btnOne="返回"/>
    <!--签退成功，并且有课后测试课后测试-->
    <alert-tip v-if="logOutTest" @closeTip="showTestAlert" @confirmTip="goTest" tipType="three"
               alertText="下课签退成功" btnOne="返回" btnTwo="课后测试"/>
    <!--签到或者亲啊退的入口-->
    <alert-tip v-if="registerEnter" @closeTip="registerEnter = !registerEnter" @confirmTip="registerCheckBtn" tipType="three"
               :alertText="alertText ? alertText : '是否进行签到'" btnOne="返回" btnTwo="签到"/>
  </div>
</template>

<script>
  import {MP} from '../../../common/js/map'
  //  import BMap from 'BMap'
  //  引入百度地图api
  import {getUser, getBanner, getIndexLink} from '../../../server/api'
  import Header from '../../../components/header.vue'
  import HomeIcon from '../../../components/common/homeIcon.vue'
  import alertTip from '../../../components/common/alertTip'
  import Heart from '../../../components/common/heart'
  import {mapState, mapActions} from 'vuex'

  import {lessonMain, signLesson} from '../../../server/lessonApi'
  import {myLessonMain, cancelSignIn, registerCheck} from '../../../server/myApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        showCancelSuccessAlert: false,
        lessonId: '',
        lessonData: '',
        enlistTip: false,
        showAlert: false,
        logOutTest: false,
        successAlert: false,
        alertText: null,
        registerEnter: false,
        myLocation: ''
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    mounted() {
      this.lessonId = this.$route.params.lessonId;
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
          id: this.lessonId
        }
        myLessonMain(getData).then(res => {
          this.lessonData = res.data
        })
      },
      showCancelAlert() {
        this.showAlert = !this.showAlert
      },
      showTestAlert() {
        this.logOutTest = !this.logOutTest
      },
      showSuccessAlert() {
        this.successAlert = !this.successAlert
      },
      registerCheckBtnEnter(type){
        console.log('其拿到或者签退')
        this.registerEnter = !this.registerEnter
        if(type == 1){
          this.alertText = '是否进行上课签到'
        }else if(type == 2){
          this.alertText = '是否进行下课签到'
        }
      },
      // 取消报名课程
      cancelSignUp() {
        let postData = {
          id: this.lessonId
        }
        cancelSignIn(postData).then(res => {
          if (res.status) {
            this.showCancelSuccessAlert = !this.showCancelSuccessAlert
            this.alertText = '取消报名成功'
          } else {
            this.successAlert = !this.successAlert
            this.alertText = res.msg
          }
        })
      },
      cancelSuccessJump(){
        console.log('应该跳转了')
        this.showCancelSuccessAlert = !this.showCancelSuccessAlert
        this.$router.push('/myLesson');
      },
      // 获取位置信息
//      签到部分
      registerCheckBtn() {
        let postData = {
          id: this.lessonId,
          coordinates: this.myLocation
        }
        registerCheck(postData).then(res => {
          if (res.status) {
            if (res.type == 2 && this.lessonData.test_id) {//  含有课后测试 id 的签退
              this.logOutTest = !this.logOutTest
              this.getData()
            }else{
              this.getData()
            }
          } else {
            this.successAlert = !this.successAlert
            this.alertText = res.msg
          }
        })
      },
      goTest() {
        this.$router.push('/testMain/' + this.lessonData.test_id + '/' + this.lessonId)
      }
    },
    components: {
      Header,
      HomeIcon,
      alertTip,
      Heart
    },
  }
</script>

<style lang="scss">
  .vote-item-page {
    /*背景固定不滚动*/
    background: url("../../../common/image/bkg/bkg-one.png");
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
      .check-icon{
        position: absolute;
        top: 23px;
        right: 46px;
        background: #0a5b8c;
        width: 70px;
        height: 27px;
        line-height: 27px;
        text-align: center;
        color: rgb(255,255,255);
        font-size: 18px;
        border-radius: 0 0 6px 6px;
      }
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
        padding-bottom: 180px;
        a{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }
        img {
          width: 100%;
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

