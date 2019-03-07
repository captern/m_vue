<template>
  <div class="vote-post-page" v-wechat-title="$route.meta.title='投票'">
    <Header title='投票' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-post-area">
      <div class="vote-dec">{{voteData.name}}</div>
      <div class="vote-options">
        <div class="option-item" v-for="(item, index) in voteData.list">
          <div class="check-icon" @click="changeCheck(item.id)"><span class="icon" :class="{check: checkedId.indexOf(item.id) !=-1}"></span></div>
          <div class="option-dec">
            <div class="option-dec-main" v-html="item.content" @click="changeCheck(item.id)">
            </div>
            <div class="option-link" :class="{check: checkedId.indexOf(item.id) !=-1}">(查看详情)</div>
          </div>
        </div>
      </div>
      <div class="vote-btn" @click="showVoteAlert">提交投票</div>
      <!--提示框弹出部分-->
      <alert-tip v-if="showAlert" @closeTip="showVoteAlert" @confirmTip="postVote" tipType="three" alertText="是否提交本次投票？" btnOne="返回" btnTwo="提交"/>
      <alert-tip v-if="showFalseAlert" @closeTip="showVoteFalseAlert" @confirmTip="postVote" tipType="one" alertText="请选择投票选项" btnOne="返回"/>
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

  import {voteMain, postVote} from '../../server/voteApi'

  export default {
    data() {
      return {
        enlistTip: true, // 是否请求接口
        voteId: '',
        voteData: '',
        showAlert: false,
        showFalseAlert: false,
        checkedId: [],
        alertText: '待定义',
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    mounted() {
      // 费图片的选项性情
      this.voteId = this.$route.params.voteId;
      // this.voteId = 4;
      const getData = {
        id: this.voteId
      }
      voteMain(getData).then(res => {
        this.voteData = res.data
      })
    },
    methods: {
      changeCheck(optionId) {
        let checkType = this.voteData.type;
        //checkType 表示选择的类型  1为单选 2 为多选
        if (checkType === 1) {//单选
          const newCheck = optionId;
          this.checkedId = []
          this.checkedId.push(newCheck);
        } else if(checkType === 2) {//多选
          const newCheck = optionId;
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
        if(this.checkedId == ''){
          console.log('请选择')
          this.showFalseAlert =!this.showFalseAlert
        }else{
          this.showAlert =! this.showAlert
        }
      },
      showVoteFalseAlert(){
        this.showFalseAlert = !this.showFalseAlert
      },
      postVote(){
        // postVote(this.voteId, this.checkedId).then(res=>{
        postVote(this.voteId, JSON.stringify(this.checkedId)).then(res=>{
          console.log(res)
          if(res.status){ //提交成功
            this.$router.push('/voteResult/' + this.voteId);
          }else{

          }
        })
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
  .vote-post-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-one.png");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .vote-post-area {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      min-height: calc(100vh - 106px);
      .vote-dec {
        font-size: 20px;
        padding-bottom: 37px;
      }
      .vote-options {
        padding-bottom: 100px;
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
            .option-dec-main,.option-link{
              display: inline-block;
            }
            .option-link{
              &.check{
                color: #5ac7f2;
              }
            }
          }
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

