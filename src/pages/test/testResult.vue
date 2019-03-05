<template>
  <div class="test-result-page" v-wechat-title="$route.meta.title='在线测试'">
    <Header title='在线测试' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="test-result-area">
      <div class="title">{{testData.title}}</div>
      <div class="time">发布时间：{{testData.time}}</div>
      <div class="result-area">
        <div class="result-item"><span>得分：</span>{{testData.score}}分</div>
        <div class="result-item"><span>正确：</span><span class="true">{{testData.right}}</span>题</div>
        <div class="result-item"><span>错误：</span><span class="false">{{testData.wrong}}</span>题</div>
      </div>
      <router-link :to="'/testFail/' + this.testId " class="test-btn">查看错题</router-link>
    </div>
    <!--提示框弹出部分-->
    <alert-tip v-if="showAlert" @closeTip="showTestAlert" @confirmTip="startTest" tipType="three" alertText="是否开始本测试？" btnOne="返回" btnTwo="开始测试"/>
  </div>
</template>

<script>
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import alertTip from '../../components/common/alertTip'
  import {mapState, mapActions} from 'vuex'
  import {getResult} from '../../server/testApi'
  export default {
    data() {
      return {
        testId: '',
        testData: '',
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
      getResult(this.testId).then(res => {
        if(res.status){
          this.testData = res
        }
      })
    },
    methods: {
    },
    components: {
      Header,
      HomeIcon,
      alertTip
    },
  }
</script>

<style lang="scss" scoped>
  .test-result-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-one.png");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .test-result-area {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      min-height: calc(100vh - 106px);
      .title {
        font-size: 23px;
        line-height: 31px;
        color: #231815;
        margin-bottom: 28px;
      }
      .time {
        font-size: 21px;
        line-height: 26px;
        color: #b2b2b3;
        text-align: right;
      }
      .result-area{
        padding-top: 42px;
        .result-item{
          height: 37px;
          line-height: 37px;
          font-size: 21px;
          color: #231815;
          span{
            line-height: 27px;
            color: #3ab2ed;
          }
          .true{
            color: #009644;
          }
          .false{
            color: #e30012;
          }
        }
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

