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
            <div class="option-item" v-for="(optionItem, optionIndex) in evaluateItem.content"
                 @click="changeCheck(evaluateIndex,optionIndex)">
              <div class="check-icon">
                <span class="icon" :class="{check: postResult[evaluateIndex].checked === optionIndex}"></span>
              </div>
              <div class="option-dec">{{optionItem}}</div>
            </div>
          </div>
        </div>
        <div class="text-area">
          <p>课程反馈:</p>
          <textarea class="desc-area" placeholder="请输入" maxlength="500" v-model="desc" @blur="out()"/>
        </div>
      </div>
      <!--2是选星模式-->
      <div class="type-two" v-else-if="evaluateData.type == 2">
        <div class="stars-area">
          <div class="star-item" v-for="(item, index) in starAll" :key="index" @click="setStar(index)">
            <img v-if="index <starData" src="../../../common/icon/star_none.png" alt="有星星">
            <img v-else src="../../../common/icon/star_check.png" alt="有星星">
          </div>
        </div>
        <div class="text-area">
          <p>课程反馈:</p>
          <textarea class="desc-area" placeholder="请输入" maxlength="500" v-model="desc" @blur="out()"/>
        </div>
      </div>
      <!--3是选项选星模式-->
      <div class="type-three" v-else-if="evaluateData.type == 3">
        <div class="stars-area">
          <div class="star-item" v-for="(item, index) in starAll" :key="index" @click="setStar(index)">
            <img v-if="index <starData" src="../../../common/icon/star_none.png" alt="有星星">
            <img v-else src="../../../common/icon/star_check.png" alt="有星星">
          </div>
        </div>
        <div class="test-item" v-for="(evaluateItem, evaluateIndex) in evaluateData.items" :key="evaluateIndex">
          <div class="test-dec">
            {{evaluateIndex + 1}}、{{evaluateItem.title}}
          </div>
          <div class="test-options">
            <div class="option-item" v-for="(optionItem, optionIndex) in evaluateItem.content"
                 @click="changeCheck(evaluateIndex,optionIndex)">
              <div class="check-icon">
                <span class="icon" :class="{check: postResult[evaluateIndex].checked === optionIndex}"></span>
              </div>
              <div class="option-dec">{{optionItem}}</div>
            </div>
          </div>
        </div>
        <div class="text-area">
          <p>课程反馈:</p>
          <textarea class="desc-area" placeholder="请输入" maxlength="500" v-model="desc" @blur="out()"/>
        </div>
      </div>
    </div>
    <!--<div class="vote-btn" @click="registerCheck">上课签到</div>-->
    <div class="vote-btn" @click="postEvaluate">提交</div>
    <alert-tip v-if="showAlert" @closeTip="closeAlert" @confirmTip="" tipType="one"
               :alertText="alertText ? alertText : '请全部选择'" btnOne="返回" btnTwo="取消报名"/>
    <alert-tip v-if="confirmAlert" @closeTip="closeConfirmAlert" @confirmTip="postConfirm" tipType="three"
               alertText="是否提交课程评价" btnOne="返回" btnTwo="提交"/>
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
  import {myLessonMain, postEvaluate, cancelSignIn, getEvaluate} from '../../../server/myApi'

  export default {
    data() {
      return {
        starData: 4,
        starAll: [1, 2, 3, 4, 5],
        evaluateId: '',
        evaluateData: '',
        showAlert: false,
        confirmAlert: false,
        results: [],
        postResult: '',
        postResults: '',
        desc: ''
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
      let getData = {
        id: this.evaluateId
      }
      getEvaluate(getData).then(res => {
        if (res.data.type == 1 || res.data.type == 3) {
          let postResult = new Array()
          res.data.items.forEach(function (item, index) {
            let checkItem = {
              checked: ''
            }
            postResult.push(checkItem)
          })
          this.postResult = postResult
        }
        this.evaluateData = res.data
      })
    },
    methods: {
      out() {
        setTimeout(function() {
          var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
//        window.scrollTo(0, document.documentElement.clientHeight);
      },
      setStar(index) {
        console.log(index)
        this.starData = index + 1
      },
      closeAlert() {
        this.showAlert = false
      },
      closeConfirmAlert() {
        this.confirmAlert = false
      },
      changeCheck(evaluateIndex, optionIndex) {
        this.postResult[evaluateIndex].checked = '';
        this.postResult[evaluateIndex].checked = optionIndex
      },
      postEvaluate() {
        let _this = this
        if (this.evaluateData.type == 1) {
          let asd = new Array();
          console.log(asd)
          this.postResult.forEach(function (item, index) {
            if (item.checked === '') {
              _this.showAlert = true
              return
            } else {
              asd.push(item.checked)
              _this.confirmAlert = true
            }
          })
          this.postResults = asd;
        } else if (this.evaluateData.type == 2) {
          _this.confirmAlert = true
        } else if (this.evaluateData.type == 3) {
            let asd = new Array();
            console.log(asd)
            this.postResult.forEach(function (item, index) {
                if (item.checked === '') {
                    _this.showAlert = true
                    return
                } else {
                    asd.push(item.checked)
                    _this.confirmAlert = true
                }
            })
            this.postResults = asd;
        }
      },
      postConfirm() {
        let postData = ''
        if (this.evaluateData.type == 1) {
          postData = {
            id: this.evaluateId,
            result: JSON.stringify(this.postResults),
            remark: this.desc
          }
        } else if (this.evaluateData.type == 2) {
          postData = {
            id: this.evaluateId,
            star: this.starData,
            remark: this.desc
          }
        } else if (this.evaluateData.type == 3) {
            postData = {
                id: this.evaluateId,
                result: JSON.stringify(this.postResults),
                remark: this.desc,
                star : this.starData
            }
        }
        postEvaluate(postData).then(res => {
          if (res.status) {
            console.log('提交成功')
            this.$router.push('/myLessonMain/evaluateResult/' + this.evaluateId)
          } else {
            this.showAlert = !this.showAlert
            this.alertText = res.msg
          }
        })
        console.log('提交信息')
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
          padding-top: 32px;
          padding-bottom: 111px;
          .desc-area {
            margin-top: 20px;
            display: block;
            width: 100%;
            font-size: 19px;
            line-height: 30px;
            min-height: 90px;
            border: 1px solid #999999;
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
          padding-top: 32px;
          padding-bottom: 111px;
          .desc-area {
            margin-top: 20px;
            display: block;
            width: 100%;
            font-size: 19px;
            line-height: 30px;
            min-height: 90px;
            border: 1px solid #999999;
          }
        }
      }
      .type-three {
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
          padding-top: 32px;
          padding-bottom: 111px;
          .desc-area {
            margin-top: 20px;
            display: block;
            width: 100%;
            font-size: 19px;
            line-height: 30px;
            min-height: 90px;
            border: 1px solid #999999;
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

