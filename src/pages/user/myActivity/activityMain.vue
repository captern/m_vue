<template>
  <div class="vote-item-page" v-wechat-title="$route.meta.title='活动详情'">
    <Header title='活动详情' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-item-area">
      <div class="header-area">
        <div class="title">{{lessonData.name}}</div>
        <div class="heart">
          <Heart :activityId="lessonData.id" :heart=false v-if="lessonData.is_collect == 0"></Heart>
          <Heart :activityId="lessonData.id" :heart=true v-else-if="lessonData.is_collect == 1"></Heart>
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
        <div v-if="lessonData.check_but == 'start'" class="vote-btn" @click="registerCheck">活动签到</div>
        <div v-else-if="lessonData.check_but == 'end'" class="vote-btn" @click="registerCheck">活动签退</div>
        <div v-if="lessonData.canCancel" class="vote-btn" @click="showCancelAlert">取消报名</div>
      </div>
    </div>
    <!--提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showCancelAlert" @confirmTip="cancelSignUp" tipType="three"
               alertText="是否取消报名" btnOne="返回" btnTwo="取消报名"/>
    <alert-tip v-if="successAlert" @closeTip="showSuccessAlert" @confirmTip="cancelSignUp" tipType="one"
               :alertText="alertText ? alertText : '报名成功'" btnOne="返回"/>
  </div>
</template>

<script>
  import {getUser, getBanner, getIndexLink} from '../../../server/api'
  import Header from '../../../components/header.vue'
  import HomeIcon from '../../../components/common/homeIcon.vue'
  import alertTip from '../../../components/common/alertTip'
  import Heart from '../../../components/common/heart'
  import {mapState, mapActions} from 'vuex'

  import {lessonMain, signLesson} from '../../../server/lessonApi'
  import {activityMain, cancelActivity, activityRegister, cancelSignIn, registerCheck} from '../../../server/myApi'

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
        alertText: null
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
      this.getData()
    },
    methods: {
      getData() {
        let getData = {
          id: this.activityId
        }
//        myLessonMain(getData).then(res => {
        activityMain(getData).then(res => {
          this.lessonData = res.data
        })
      },
      showCancelAlert() {
        this.showAlert = !this.showAlert
      },
      showSuccessAlert() {
        this.successAlert = !this.successAlert
      },
      // 取消报名课程
      cancelSignUp() {
        let postData = {
          id: this.activityId
        }
        cancelActivity(postData).then(res => {
          if (res.status) {
            this.successAlert = !this.successAlert
            this.alertText = '取消报名成功'
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
      goTest() {
        console.log('天竺啊测试页面')
        this.$router.push('/testMain/' + this.lessonData.test_id)
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
        font-size: 19px;
        line-height: 30px;
        color: #000000;
        padding-bottom: 100px;
        img{
          max-width: 100%;
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

