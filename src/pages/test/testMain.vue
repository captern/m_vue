<template>
  <div class="test-post-page" v-wechat-title="$route.meta.title='投票'">
    <Header title='投票' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="test-post-area">
      <div class="test-item">
        <div class="test-dec">
          1、国家技术转移东部中心（NETC），是由中华人民共和国科学技术部、上海市人民政府共同推进，由上海市科学技术委员会指导、上海市科技创业中心协调设立的国家级区域技术转移平台。
        </div>
        <div class="test-options">
          <div class="option-item" v-for="(item, index) in options" @click="changeCheck(index)">
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
          <div class="option-item" v-for="(item, index) in options" @click="changeCheck(index)">
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
          <div class="option-item" v-for="(item, index) in options" @click="changeCheck(index)">
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
          <div class="option-item" v-for="(item, index) in options" @click="changeCheck(index)">
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
          <div class="option-item" v-for="(item, index) in options" @click="changeCheck(index)">
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
          <div class="option-item" v-for="(item, index) in options" @click="changeCheck(index)">
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
          <div class="option-item" v-for="(item, index) in options" @click="changeCheck(index)">
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
          <div class="option-item" v-for="(item, index) in options" @click="changeCheck(index)">
            <div class="check-icon"><span class="icon" :class="{check: checkedId.indexOf(item.id) !=-1}"></span></div>
            <div class="option-dec">{{item.dec}}</div>
          </div>
        </div>
      </div>
      <div class="vote-btn" @click="showVoteAlert">提交</div>

      <!--提示框弹出部分-->
      <alert-tip v-if="showAlert" @closeTip="showVoteAlert" @confirmTip="postVote" tipType="three" alertText="是否提交本次测试答案？" btnOne="返回" btnTwo="提交"/>
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
    methods: {
      changeCheck(optionId) {
        if (this.checkType === 1) {//单选
          const newCheck = this.options[optionId].id;
          this.checkedId = []
          this.checkedId.push(newCheck);
        } else {//多选
          const newCheck = this.options[optionId].id;
          if (this.checkedId.indexOf(newCheck) !== -1) {
            if(this.checkedId.length > 1){
              for (var i = 0; i < this.checkedId.length; i++) {
                if (this.checkedId[i] == newCheck) {
                  this.checkedId.splice(i, 1);
                  break;
                }
              }
            }
          } else {
            this.checkedId.push(newCheck);
          }
        }
      },
      showVoteAlert(){
        this.showAlert =! this.showAlert
      },
      postVote(){
        console.log('发送选择')
        this.$router.push('/testResult/1');
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
      padding: 30px 23px 151px;
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

