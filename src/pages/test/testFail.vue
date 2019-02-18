<template>
  <div class="test-post-page" v-wechat-title="$route.meta.title='错题查看'">
    <Header title='错题查看' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="test-post-area">
      <div class="test-item">
        <div class="test-dec">
          1、国家技术转移东部中心（NETC），是由中华人民共和国科学技术部、上海市人民政府共同推进，由上海市科学技术委员会指导、上海市科技创业中心协调设立的国家级区域技术转移平台。
        </div>
        <div class="test-options">
          <div class="option-item" v-for="(item, index) in options">
            <div class="check-icon"><span class="icon" :class="{check: checkedId.indexOf(item.id) !=-1}"></span></div>
            <div class="option-dec">{{item.dec}}</div>
          </div>
        </div>
      </div>
      <div class="test-item">
        <div class="test-dec">
          1、国家技术转移东部中心（NETC），是由中华人民共和国科学技术部、上海市人民政府共同推进，由上海市科学技术委员会指导、上海市科技创业中心协调设立的国家级区域技术转移平台。
        </div>
        <div class="test-options">
          <div class="option-item" v-for="(item, index) in options">
            <div class="check-icon"><span class="icon" :class="{check: checkedId.indexOf(item.id) !=-1}"></span></div>
            <div class="option-dec">{{item.dec}}</div>
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

  import {voteMain} from '../../server/voteApi'

  export default {
    data() {
      return {
        enlistTip: true, // 是否请求接口
        voteId: '',
        checkType: 2,    //checkType 表示选择的类型  1为单选 2 为多选
        voteData: '',
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
//      this.voteId = this.$route.params.voteId;
      this.voteId = 4;
      voteMain(this.voteId).then(res => {
        this.voteData = res.data
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
      min-height: calc(100vh - 180px);
      .test-item{
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
        &:first-child{
          border: none;
          padding-top: 0;
        }
      }
    }
  }
</style>

