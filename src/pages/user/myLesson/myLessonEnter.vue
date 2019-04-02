<template>
  <div class="vote-item-page" v-wechat-title="$route.meta.title='我的课程'">
    <Header title='我的课程' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-item-area">
      <!--<router-link :to="'/myLessonMain/' + item.cou_id ">-->
        <!--ddddd-->
      <!--</router-link>-->
      <div class="item-area">
        <div class="left">课程名称:</div>
        <div class="right">{{lessonData.name}}</div>
      </div>
      <div class="item-area">
        <div class="left">主讲人:</div>
        <div class="right">{{lessonData.teacher}}</div>
      </div>
      <div class="item-area">
        <div class="left">发布时间:</div>
        <div class="right">{{lessonData.publish_time}}</div>
      </div>
      <div class="item-area">
        <div class="left">课程详情:</div>
        <div class="right">
          <router-link class="link" :to="'/myLessonMain/' + lessonData.cou_id">详情></router-link>
        </div>
      </div>
      <div class="item-area" v-if="lessonData.has_test">
        <div class="left">测试成绩:</div>
        <div class="right">
          正确:<span>{{lessonData.right}}</span>
          错误:<span>{{lessonData.wrong}}</span>
          <router-link :to="'/testFail/' + lessonData.test_id + '/' + lessonId" class="link">查看错题></router-link>
        </div>
      </div>
    </div>
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
  import {myLessonMain, myLessonEnter} from '../../../server/myApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        lessonId: '',
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
      this.lessonId = this.$route.params.lessonId;
      this.getData()
    },
    methods: {
      getData(){
        let getData = {
          id: this.lessonId
        }
        myLessonEnter(getData).then(res => {
          this.lessonData = res.data
        })
      },
    },
    components: {
      Header,
      HomeIcon,
      alertTip,
      Heart
    },
  }
</script>

<style lang="scss" scoped>
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
      padding: 72px 47px 0;
      min-height: calc(100vh - 130px);
      .item-area{
        display: flex;
        font-size: 23px;
        border-bottom: 1px solid #d8d8d8;
        padding: 19px 0;
        .left{
          flex: 1;
          color: rgb(58, 178, 237);
        }
        .right{
          flex: 3.2;
          color: rgb(35, 24, 21);
          .link{
            color: rgb(29,32,133);
            text-decoration: underline;
          }
          span{
            padding-left: 8px;
            padding-right: 44px;
          }
        }
      }
    }
  }
</style>

