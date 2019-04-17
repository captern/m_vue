<template>
  <div class="vote-page" v-wechat-title="$route.meta.title='我的投票'">
    <Header title='我的投票' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <router-link :to="'/voteItem/' + item.id " class="vote-item" v-for="(item, index) in myVoteList" :key="index">
      <div class="vote-check" v-if="item.is_sub">已参与</div>
      <p class="title">{{item.name}}</p>
      <p class="des" v-html="item.content"></p>
      <!--<p class="time">{{item.updated_time}}</p>-->
      <p class="time" v-if="item.count_down != '投票已结束'"><span>{{item.count_down}}</span></p>
      <p class="time" v-else></p>
    </router-link>
  </div>
</template>

<script>
  import {getUse, getBanner, getIndexLink} from '../../../server/api'
  import Header from '../../../components/header.vue'
  import Select from '../../../components/select.vue'
  import HomeIcon from '../../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import {myVote} from '../../../server/myApi'

  export default {
    data() {
      return {
        myVoteList: null
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
      this.getVoteList();
    },
    methods: {
      getVoteList(){
        myVote().then(res => {
          console.log(res)
          if (res.status) {
            this.myVoteList = res.list
          }
        })
      },
    },
    components: {
      Header,
      Select,
      HomeIcon
    },
  }
</script>

<style lang="scss" scoped>
  .vote-page {
    /*背景固定不滚动*/
    background: url("../../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .vote-item {
      position: relative;
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      display: block;
      .vote-check{
        width: 85px;
        height: 27px;
        line-height: 27px;
        position: absolute;
        right:30px;
        top:0;
        font-size: 16px;
        text-align: center;
        color: rgb(255,255,255);
        background: #3ab2ed;
        border-radius: 0 0 8px 8px;
      }
      .title {
        font-size: 23px;
        line-height: 31px;
        height:62px;
        color: #231815;
      }
      .des {
        font-size: 18px;
        line-height: 31px;
        color: #727171;
        padding-top: 14px;
        max-height: 93px;
        height:93px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
      }
      .time {
        /*text-align: right;*/
        /*font-size: 18px;*/
        /*line-height: 26px;*/
        /*color: #3ab2ed;*/
        /*padding-top: 20px;*/

        text-align: right;
        font-size: 18px;
        line-height: 26px;
        color: rgb(255, 255, 255);
        padding-top: 20px;
        span{
          padding: 3px 5.5px;
          background: #3ab2ed;
          border-radius: 5px;
        }
      }
    }
  }
</style>

