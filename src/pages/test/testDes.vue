<template>
  <div class="vote-item-page" v-wechat-title="$route.meta.title='在线测试'">
    <Header title='在线测试' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-item-area">
      <div class="header-area">
        <div class="title">
          {{testData.name}}
        </div>
        <div class="heart">
          <Heart heart="false"></Heart>
        </div>
      </div>
      <div class="author-time">
        <div class="author">发布人：{{testData.author}}</div>
        <div class="time">发布时间：{{testData.created_time}}</div>
      </div>
      <div class="test-main" v-html="testData.des"></div>
      <div v-if="!testData.finish" class="test-btn" @click="showTestAlert">开始测试</div>
      <router-link  v-else :to="'/testFail/' + testId ">
        <div class="test-btn">查看错题</div>
      </router-link>
    </div>
    <!--提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showTestAlert" @confirmTip="startTest" tipType="three" alertText="是否开始本测试？"
               btnOne="返回" btnTwo="开始测试"/>
  </div>
</template>

<script>
  import {getUser, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import alertTip from '../../components/common/alertTip'
  import Heart from '../../components/common/heart'
  import {mapState, mapActions} from 'vuex'

  import {testDes} from '../../server/testApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        testId: '',
        testData: '',
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
      this.testId = this.$route.params.testId;
      testDes(this.testId).then(res => {
        this.testData = res.data
      })
    },
    methods: {
      showTestAlert() {
        this.showAlert = !this.showAlert
      },
      startTest() {
        this.$router.push('/testMain/' + this.testId)
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
      .test-main {
        font-size: 19px;
        line-height: 30px;
        color: #000000;
        padding-bottom: 111px;
      }
      .test-btn {
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

