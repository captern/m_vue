<template>
  <div class="lesson-page" v-wechat-title="$route.meta.title='课程列表'">
    <Header title='课程列表' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="select-area">
      <div class="select-type-area">
        <div class="select-type" @click="changeCheck(1)">
          <span>活动</span>
          <span class="icon-down-area"><i class="icon-down"></i></span>
        </div>
        <div class="select-type" @click="changeCheck(2)">
          <span>投票</span>
          <span class="icon-down-area"><i class="icon-down"></i></span>
        </div>
      </div>
    </div>
    <router-link :to="'/activityMain/' + item.cou_id " class="lesson-item" v-for="(item, index) in activityList" :key="index">
      <div class="type-one">
        <p class="title">{{item.name}}</p>
        <p class="des">{{item.desc}}</p>
      </div>
      <div class="author-time">
        <div class="author">主讲人：<span>{{item.teacher}}</span></div>
        <div class="time">授课时间：{{item.study_time}}</div>
      </div>
    </router-link>
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
  import {getActivityLists} from '../../server/activityApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        activityList: null,
        type: 1
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
      this.getActivityList();
    },
    methods: {
      changeCheck(checked) {
        this.type = checked
        this.getActivityList();
      },
      getActivityList(){
        let getData = {
          type: this.type
        }
//        lessonList(getData).then(res => {
        getActivityLists(getData).then(res => {
          if (res.status) {
            this.activityList = res.list
//            this.voteList = res.list
          }
        })
      },
      scrolling() {
        console.log('dddd')
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
          color: rgb(58, 178, 237);
          border-right: 1px solid #3ab2ed;
          &:last-child {
            border-right: none;
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

