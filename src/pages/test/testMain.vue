<template>
  <div class="test-post-page" v-wechat-title="$route.meta.title='测试'">
    <Header title='测试' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="test-post-area">
      <div class="test-item" v-for="(testItem, testIndex) in testData" :key="testIndex">
        <div class="test-dec">
          {{testIndex + 1}}、{{testItem.question}}
        </div>
        <div class="test-options">
          <div class="option-item" v-for="(optionItem, optionIndex) in testItem.data"
               @click="changeCheck(testIndex,optionIndex)">
            <div class="check-icon"><span class="icon"
                                          :class="{check: results[testIndex].answer.indexOf(optionIndex + 1) !=-1}"></span>
            </div>
            <div class="option-dec">{{optionItem}}</div>
          </div>
        </div>
      </div>
      <div class="vote-btn" @click="showVoteAlert">提交</div>
      <!--提示框弹出部分-->
      <alert-tip v-if="showPop" @closeTip="closePop" tipType="one" :alertText="alertText ? alertText : '请完成所有测试题后在进行提交'"
                 btnOne="返回"/>
      <alert-tip v-if="showAlert" @closeTip="showVoteAlert" @confirmTip="postTest" tipType="three"
                 alertText="是否提交本次测试答案？" btnOne="返回" btnTwo="提交"/>
    </div>
  </div>
</template>

<script>
  import {getUser, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import enlistTip from '../../components/common/enlistTip'
  import alertTip from '../../components/common/alertTip'
  import {postTestResult} from '../../server/testApi'
  import {mapState, mapActions} from 'vuex'

  import {testMain} from '../../server/testApi'

  export default {
    data() {
      return {
        enlistTip: true, // 是否请求接口
        testId: '',
        checkType: 2,    //checkType 表示选择的类型  1为单选 2 为多选
        testData: '',
        lessonId: '',
        showAlert: false,
        showPop: false,
        postTestFlag: false,
        alertText: '',
        results: [],
        postResults: []
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    mounted() {
      const _this = this
      this.testId = this.$route.params.testId;
      this.lessonId = this.$route.params.lessonId;
      // this.testId = 2;
      let resultsList = new Array()
      testMain(_this.testId).then(res => {
        _this.testData = res.data
        res.data.forEach(function (testItem, testIndex) {
          resultsList.push(
            {
              id: testItem.id,
              answer: []
            }
          )
        });
//        设置结果对象
        _this.results = resultsList
      })
    },
    methods: {
      // 单选多选处置
      changeCheck(testIndex, optionIndex) {
        let question = this.testData[testIndex]
        if (question.type === 2) {//多选
          let questionAnswer = this.results[testIndex].answer
          const newCheck = optionIndex + 1;
          if (questionAnswer.indexOf(newCheck) !== -1) {
            if (questionAnswer.length > 1) {
              for (var i = 0; i < questionAnswer.length; i++) {
                if (questionAnswer[i] == newCheck) {
                  questionAnswer.splice(i, 1);
                  break;
                }
              }
            }
            this.results[testIndex].answer = questionAnswer
          } else {
            this.results[testIndex].answer.push(newCheck)
          }
        } else {//单选
          // 因为是单选，所以需要先将题目清空
          if(this.results[testIndex].answer == optionIndex + 1){
            this.results[testIndex].answer = [];
          }else{
            this.results[testIndex].answer = [];
            this.results[testIndex].answer.push(optionIndex + 1)
          }

        }
      },
      showVoteAlert() {
        const _this = this
        let postResult = new Array()
        _this.results.forEach(function (resultItem, resultIndex) {
          console.log(resultItem)
          if (resultItem.answer.length === 0) {
            _this.showPop = true
            _this.alertText = '请全部选择'
          }
          else {
            _this.postTestFlag = true
          }
        })
        _this.postResults = postResult
        _this.postTest()
      },
      closePop() {
        this.showPop = !this.showPop
      },
      postTest() {
        const _this = this
        console.log('发送选择')

        if (_this.postTestFlag) {
          console.log(_this.testId)
          console.log(_this.results)
          postTestResult(_this.testId, _this.lessonId, JSON.stringify(_this.results)).then(res => {
            console.log(res)
            if (res.status) {
              _this.$router.push('/testResult/' + this.testId + '/' + _this.lessonId);
            } else {
              _this.showPop = true
              _this.alertText = res.msg
            }
          })

        } else {
          console.log('fff')
        }
      }
    },
    components: {
      Header,
      HomeIcon,
      enlistTip,
      alertTip
    },
  }
</script>

<style lang="scss" scoped>
  .test-post-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-one.png");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .test-post-area {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      min-height: calc(100vh - 106px);
      .test-item {
        border-top: 1px solid #dcdcdc;
        margin-bottom: 32px;
        padding-top: 32px;
        .test-dec {
          font-size: 19px;
          line-height: 30px;
          color: #000000;
          padding-bottom: 29px;
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

