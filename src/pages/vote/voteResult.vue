<template>
  <div class="vote-result-page" v-wechat-title="$route.meta.title='投票结果'">
    <Header title='投票结果' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-result-area">
      <div class="vote-result">{{voteData.name}}</div>
      <div class="vote-options">
        <div class="option-item" v-for="(item, index) in voteData.list">
          <div class="check-icon"><span class="icon" :class="{check: item.checked == 1}"></span></div>
          <div class="option-dec">
            <div v-html="item.content"></div>
            <div class="progress">
              <!--<div class="progress-num" :style="{width:item.num/voteData.total_num}">{{Math.round(item.num / voteData.total_num * 10000) / 100.00 + "%"}}</div>-->
              <div class="progress-num" :style="{width:item.num/voteData.total_num}">{{item.num}}</div>
            </div>
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
  import {mapState, mapActions} from 'vuex'

  import {voteResult} from '../../server/voteApi'

  export default {
    data() {
      return {
        enlistTip: true, // 是否请求接口
        voteId: '',
        checkType: 2,    //checkType 表示选择的类型  1为单选 2 为多选
        voteData: '',
        showAlert: false,
        checkedId: ['1'],
        options: [
          {
            id: '1',
            dec: '技师人才服务高级培训1号',
            progress: '10%'
          },
          {
            id: '2',
            dec: '技师人才服务高级培训2号',
            progress: '30%'
          },
          {
            id: '3',
            dec: '技师人才服务高级培训3号',
            progress: '20%'
          },
          {
            id: '4',
            dec: '技师人才服务高级培训4号',
            progress: '30%'
          }, {
            id: '5',
            dec: '技师人才服务高级培训5号',
            progress: '10%'
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
      this.voteId = this.$route.params.voteId;
      let getData = {
        id: this.voteId
      }
      voteResult(getData).then(res => {
        this.voteData = res.data
      })
    },
    methods: {
      showVoteAlert() {
        this.showAlert = !this.showAlert
      },
      postVote() {
        console.log('发送选择')
        this.$router.push('/index');
      }
    },
    components: {
      Header,
      HomeIcon,
    },
  }
</script>

<style lang="scss" scoped>
  .vote-result-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-one.png");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .vote-result-area {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      min-height: calc(100vh - 106px);
      .vote-result {
        font-size: 20px;
        padding-bottom: 37px;
      }
      .vote-options {
        .option-item {
          display: flex;
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
            .progress {
              width: 100%;
              background: #d9dada;
              height: 20px;
              line-height: 20px;
              margin: 6px 0;
              .progress-num {
                background: #5ac7f2;
                text-align: right;
                font-size: 17px;
                line-height: 20px;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }
</style>

