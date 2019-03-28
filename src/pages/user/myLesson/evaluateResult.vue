<template>
  <div class="evaluate-page" v-wechat-title="$route.meta.title='课程评价'">
    <Header title='课程评价' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="evaluate-area">
      <div class="header-area">
        <div class="title">{{evaluateData.name}}</div>
        <!--<div class="heart">-->
        <!--<Heart :lessonId="evaluateData.id" :heart=false v-if="evaluateData.is_collect == 0"></Heart>-->
        <!--<Heart :lessonId="evaluateData.id" :heart=true v-else-if="evaluateData.is_collect == 1"></Heart>-->
        <!--</div>-->
      </div>
      <div class="author-time">
        <div class="author">主讲人：{{evaluateData.teacher}}</div>
        <div class="time">{{evaluateData.publish_time}}</div>
      </div>
      <!--1是 选项-->
      <div class="type-one" v-if="evaluateData.type == 1">
        <div class="test-item" v-for="(evaluateItem, evaluateIndex) in evaluateData.items" :key="evaluateIndex">
          <div class="test-dec">
            {{evaluateIndex + 1}}、{{evaluateItem.title}}
          </div>
          <div class="test-options">
            <div class="option-item" v-for="(optionItem, optionIndex) in evaluateItem.content">
              <div class="check-icon">
                <span class="icon" :class="{check: evaluateItem.choose === optionIndex + 1}"></span>
              </div>
              <div class="option-dec">{{optionItem}}</div>
            </div>
          </div>
        </div>
        <div class="text-area">
          <p>课程反馈:</p>
          <p class="desc-area">{{evaluateData.remark}}</p>
        </div>
      </div>
      <div class="type-two" v-else-if="evaluateData.type == 2">
        <div class="stars-area">
          <div class="star-item" v-for="(item, index) in starAll" :key="index" @click="setStar(index)">
            <img v-if="index <evaluateData.star" src="../../../common/icon/star_none.png" alt="有星星">
            <img v-else src="../../../common/icon/star_check.png" alt="有星星">
          </div>
        </div>
        <div class="text-area">
          <p>课程反馈:</p>
          <p class="desc-area">{{evaluateData.remark}}</p>
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
  import {getEvaluateResult, cancelSignIn, getEvaluate} from '../../../server/myApi'

  export default {
    data() {
      return {
        starAll: [1, 2, 3, 4, 5],
        evaluateId: '',
        evaluateData: '',
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    mounted() {
      this.evaluateId = this.$route.params.evaluateId;
      this.uid = this.$route.params.uid;
      let getData = {
        id: this.evaluateId,
        uid: this.uid ? this.uid : 0,
      }
      getEvaluateResult(getData).then(res => {
        this.evaluateData = res.appraise
      })
    },
    methods: {},
    components: {
      Header,
      HomeIcon,
      alertTip,
      Heart
    },
  }
</script>

<style lang="scss" scoped>
  .evaluate-page {
    /*背景固定不滚动*/
    background: url("../../../common/image/bkg/bkg-one.png");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .evaluate-area {
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
      .type-one {
        .test-item {
          /*border-top: 1px solid #dcdcdc;*/
          padding-top: 32px;
          .test-dec {
            font-size: 19px;
            line-height: 30px;
            color: #000000;
            padding-bottom: 23px;
          }
          .test-options {
            font-size: 19px;
            .option-item {
              display: flex;
              height: 35px;
              line-height: 35px;
              .check-icon {
                flex: 35;
                .icon {
                  display: inline-block;
                  vertical-align: middle;
                  width: 21px;
                  height: 21px;
                  background: #ececec;
                  border-radius: 50%;
                  &.check {
                    background: #5ac7f2;
                    box-sizing: border-box;
                    border: 3px solid #ececec;
                  }
                }
              }
              .option-dec {
                flex: 513;
                display: inline-block;
              }
            }
          }
          &:first-child {
            border: none;
            padding-top: 0;
          }
        }
        .text-area {
          padding-top: 80px;
          padding-bottom: 111px;
          .desc-area {
            margin-top: 20px;
            display: block;
            width: 100%;
            font-size: 19px;
            line-height: 30px;
            min-height: 90px;
            color: rgb(134, 134, 134);
          }
        }
      }
      .type-two {
        margin-top: 82px;
        .stars-area {
          display: flex;
          padding: 0 50px;
          .star-item {
            flex: 1;
            text-align: center;
            img {
              width: 37px;
              height: 37px;
            }
          }
        }
        .text-area {
          padding-top: 80px;
          padding-bottom: 111px;
          .desc-area {
            margin-top: 20px;
            display: block;
            width: 100%;
            font-size: 19px;
            line-height: 30px;
            min-height: 90px;
            color: rgb(134, 134, 134);
          }
        }
      }
    }
    .vote-btn {
      position: fixed;
      left: 46px;
      bottom: 55px;
      width: calc(100% - 92px);
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
</style>

