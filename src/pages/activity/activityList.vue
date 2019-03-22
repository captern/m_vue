<template>
  <div class="lesson-page" v-wechat-title="$route.meta.title='中心活动'">
    <Header title='中心活动' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="select-area">
      <div class="select-type-area">
        <div class="select-type" :class="{check: pageType == 'one' }"  @click="changeCheck(1)">
          <span>活动</span>
          <span class="icon-down-area"><i class="icon-down"></i></span>
        </div>
        <div class="select-type" :class="{check: pageType == 'two' }" @click="changeCheck(2)">
          <span>投票</span>
          <span class="icon-down-area"><i class="icon-down"></i></span>
        </div>
      </div>
    </div>
    <div v-if="pageType == 'one'">
      <div v-for="(item, index) in listData" :key="index">
        <router-link :to="'/activityDec/' + item.id " class="lesson-item" v-if="item.is_sign">
          <div class="type-one">
            <div class="title">{{item.name}}</div>
            <div class="des">{{item.desc}}</div>
          </div>
          <div class="author-time">
            <div class="author">主讲人：<span>{{item.teacher}}</span></div>
            <div class="time">授课时间：{{item.start_time}}</div>
          </div>
        </router-link>
        <router-link :to="'/activityMain/' + item.id " class="lesson-item" v-if="item.is_sign">
          <div class="type-one">
            <div class="title">{{item.name}}</div>
            <div class="des">{{item.desc}}</div>
          </div>
          <div class="author-time">
            <div class="author">主讲人：<span>{{item.teacher}}</span></div>
            <div class="time">授课时间：{{item.start_time}}</div>
          </div>
        </router-link>
      </div>

    </div>
    <div v-else-if="pageType == 'two'">
      <router-link :to="'/voteItem/' + item.id " class="lesson-item" v-for="(item, index) in listData" :key="index">
        <div class="vote">
          <div class="title">{{item.name}}</div>
          <div class="des" v-html="item.des"></div>
          <!--<div class="time">{{item.end_time}}</div>-->
          <div class="end-time" v-if="item.count_down != ''"><span>{{item.count_down}}</span></div>
          <div class="end-time" v-else></div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {getUser, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import Select from '../../components/select.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import {lessonList} from '../../server/lessonApi'
  import {myActivity} from '../../server/myApi'
  import {getActivityLists, getTestLists} from '../../server/activityApi'
  import {voteList} from '../../server/voteApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        listData: null,
        pageType: 'one',
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
      if(this.pageType == 'one'){
        this.getActivityList();
      }else if(this.pageType == 'two'){
        this.getTestList()
      }
    },
    methods: {
      changeCheck(checked) {
        console.log(checked)
        if(checked == '1'){
          this.pageType = 'one';
          this.getActivityList();
        }else if(checked == '2'){
          this.pageType = 'two';
          this.getTestList();
        }
        this.type = checked
      },
      getActivityList(){
//        lessonList(getData).then(res => {
        getActivityLists().then(res => {
          if (res.status) {
            this.listData = res.list
          }
        })
      },
      getTestList(){
        let getData = {
          time: 1,
          flag: 1
        }
        voteList(getData).then(res => {
          if (res.status) {
            this.listData = res.list
          }
        })
      },
      scrolling() {
        if (this.scrollFlag) {
          return;
        }
        this.scrollFlag = true;
        setTimeout(() => {
          this.handleScroll();
          this.scrollFlag = false;
        }, 20);
      },
      handleScroll() {
        // 函数的作用是滚动加载电影详情信息
        // 判断是否为请求后台中的状态，如果是则返回
        if (this.requestFlag) {
          return;
        }
        console.log('开始加载更多')
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
  .lesson-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    overflow: scroll;
    min-height: 100vh;
    position: absolute;
    /*背景固定不滚动*/
    .select-area {
      height: 62px;
      line-height: 62px;
      background: #FFFFFF;
      z-index: 100;
      position: -webkit-sticky;
      position:sticky;
      top: 0;
      .select-type-area {
        display: flex;
        .select-type {
          flex: 1;
          text-align: center;
          font-size: 23px;
          position: relative;
          color: rgb(134, 134, 134);
          border-right: 1px solid #3ab2ed;
          &:last-child {
            border-right: none;
          }
          &.check{
            color: rgb(58, 178, 237);
          }
        }
      }
    }
    .lesson-item {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px 5px;
      display: block;
      .type-one {
        .title {
          font-size: 23px;
          line-height: 31px;
          color: #231815;
        }
        .des {
          font-size: 18px;
          line-height: 31px;
          color: #727171;
          padding-top: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */

        }
      }
      .vote{
        .title {
          font-size: 23px;
          line-height: 31px;
          color: #231815;
        }
        .des {
          font-size: 18px;
          line-height: 31px;
          color: #727171;
          padding-top: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
        }
        .time {
          text-align: right;
          font-size: 18px;
          line-height: 26px;
          color: #3ab2ed;
          padding-top: 20px;
        }
        .end-time{
          text-align: right;
          font-size: 18px;
          line-height: 26px;
          color: rgb(255, 255, 255);
          padding-top: 20px;
          padding-bottom: 29px;
          span{
            padding: 3px 5.5px;
            background: #3ab2ed;
            border-radius: 5px;
          }
        }
      }
      .type-two {
        display: flex;
        height: 100px;
        align-items: center;
        .author-img {
          flex: 1;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
        }
        .title {
          flex: 3.5;
          font-size: 23px;
          line-height: 30px;
          color: #000;
        }
      }
      .author-time {
        display: flex;
        .author, .time {
          flex: 1;
          font-size: 17px;
          line-height: 36px;
          /*color: #b2b2b3;*/
          margin: 10px 0 15px;
          color: #3ab2ed;
        }
        .author {
          span {
            color: #000;
          }
        }
        .time {
          text-align: right;
        }
      }
    }
  }
</style>

