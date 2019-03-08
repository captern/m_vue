<template>
  <div class="vote-option-page" v-wechat-title="$route.meta.title='投票名单'">
    <Header title='投票名单' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="vote-potion-area">
      <div class="vote-potions">
        <div class="option-item" v-for="(item, index) in voteData.list">
          <div class="option-img-area">
            <img class="option-img" :src="item.img" alt="">
            <router-link :to="'/voteOptionMain/' + item.id " class="option-main-link" href="">
              <span @click="jumpOption(item.id)">查看详情</span>
            </router-link>
          </div>
          <div class="btn-area">
            <div class="votes-num">
              已获得&nbsp;<span class="votes">{{item.num}}票</span>
            </div>
            <router-link :to="'/postVote/' + item.id" class="go-vote">支持投票</router-link>
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

  import {voteMain} from '../../server/voteApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        voteId: '',
        voteData: '',
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
      jumpOption(optionId){
        this.$router.push('/voteOptionMain/' + optionId);
      }
    },
    components: {
      Header,
      HomeIcon
    },
  }
</script>

<style lang="scss" scoped>
  .vote-option-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-one.png");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .vote-potion-area {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      min-height: calc(100vh - 106px);
      .vote-potions {
        display: flex;
        flex-wrap: wrap;
        flex-flow: row wrap;
        .option-item {
          flex: 0 0 48.5%;
          text-align: center;
          font-size: 0;
          .option-img-area {
            .option-img {
              width: 100%;
              height: 272px;
              margin: 0;
              padding: 0;
              display: block;
            }
            .option-main-link {
              margin-top: -60px;
              display: block;
              height: 60px;
              line-height: 60px;
              background-color: rgba(0, 0, 0, 0.5);
              width: 100%;
              font-size: 18px;
              span {
                color: #ffffff;
                display: block;
                opacity: 1;

              }
            }
          }
          .btn-area {
            background-color: #f2f2f2;
            height: 61px;
            line-height: 61px;
            display: flex;
            .votes-num {
              font-size: 17px;
              color: #000000;
              text-align: left;
              padding-left: 15px;
              flex: 1;
              .votes {
                color: #3ab2ed;
              }
            }
            .go-vote {
              flex: 1;
              font-size: 21px;
              color: #ffffff;
              height: 35px;
              line-height: 35px;
              margin: 13px 10px 0;
              background: #3ab2ed;
            }
          }
          &:nth-child(2n) {
            margin-left: 3%;
          }
        }
      }
    }
  }
</style>

