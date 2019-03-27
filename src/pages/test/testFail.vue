<template>
  <div class="test-post-page" v-wechat-title="$route.meta.title='错题查看'">
    <Header title='错题查看' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="test-post-area">
      <div class="test-item" v-for="(wrongItem, wrongIndex) in testData.wrongList" :key="wrongIndex">
        <div class="test-dec">
          {{wrongIndex + 1}}、{{wrongItem.question}}
        </div>
        <div class="test-options" v-for="(optionItem, optionIndex) in wrongItem.data" :key="optionIndex">
          <div class="option-item right" v-if="wrongItem.right.indexOf(optionIndex + 1) !=-1">
            <div class="check-icon check"><span class="icon check"></span></div>
            <div class="option-dec">{{optionItem}}</div>
          </div>
          <div class="option-item wrong" v-else-if="wrongItem.wrong.indexOf(optionIndex + 1) !=-1">
            <div class="check-icon check"><span class="icon check"></span></div>
            <div class="option-dec">{{optionItem}}</div>
          </div>
          <div class="option-item" v-else>
            <div class="check-icon"><span class="icon"></span></div>
            <div class="option-dec">{{optionItem}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUse, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import enlistTip from '../../components/common/enlistTip'
  import alertTip from '../../components/common/alertTip'
  import {mapState, mapActions} from 'vuex'
  import {getFail} from '../../server/testApi'

  import {voteMain} from '../../server/voteApi'

  export default {
    data() {
      return {
        enlistTip: true, // 是否请求接口
        testId: '',
        checkType: 2,    //checkType 表示选择的类型  1为单选 2 为多选
        lessonId:'',
        testData: '',
        showAlert: false,
        checkedId: ['1'],
        alertText: '待定义',
        options: [
          {
            id: '1',
            dec: '技师人才服务高级培训1号'
          },
          {
            id: '2',
            dec: '技师人才服务高级培训2号'
          },
          {
            id: '3',
            dec: '技师人才服务高级培训3号'
          },
          {
            id: '4',
            dec: '技师人才服务高级培训4号'
          }, {
            id: '5',
            dec: '技师人才服务高级培训5号'
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
      console.log('aa')
      console.log(this.$route.params)
      console.log(this.$route.params)
      this.testId = this.$route.params.testId;
      this.lessonId = this.$route.params.lessonId;
      let getData = {
        id: this.testId,
        cou_id: this.lessonId
      }
      getFail(getData).then(res => {
        this.testData = res
      })
    },
    methods: {},
    components: {
      Header,
      HomeIcon,
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
            /*height: 35px;*/
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
            &.right {
              color: #119e4b;
            }
            &.wrong {
              color: #e30012;
            }
          }
        }
        &:first-child {
          border: none;
          padding-top: 0;
        }
      }
    }
  }
</style>

