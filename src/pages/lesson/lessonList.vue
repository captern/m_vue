<template>
  <div class="lesson-page" v-wechat-title="$route.meta.title='课程列表'">
    <Header title='课程列表' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <Select :selectAreaData=selectAreaData :checked=checked @parentMethod="changeCheck"></Select>
    <router-link :to="'/lessonMain/' + item.url " class="lesson-item" v-for="(item, index) in voteList" :key="index">
      <div class="type-one" v-if="item.img">
        <p class="title">{{item.title}}</p>
        <p class="des">{{item.des}}</p>
      </div>
      <div class="type-two" v-else>
        <div class="author-img">
          <img src="../../common/image/bkg/bkg-one.png" alt="">
        </div>
        <p class="title">{{item.title}}</p>
      </div>
      <div class="author-time">
        <div class="author">主讲人：<span>张老师</span></div>
        <div class="time">授课时间：2018年12月10号</div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import {getUse, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import Select from '../../components/select.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import {voteList} from '../../server/voteApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        selectAreaData: [
          {
            typeIndex: 0,
            items: [
              {
                itemName: '全&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;部',
                itemIndex: 0
              },
              {
                itemName: '时间最近',
                itemIndex: 1
              },
              {
                itemName: '近&nbsp;三&nbsp;&nbsp;天',
                itemIndex: 2
              },
              {
                itemName: '一&nbsp;周&nbsp;&nbsp;内',
                itemIndex: 3
              },
              {
                itemName: '一个月内',
                itemIndex: 4
              }
            ]
          },
          {
            typeIndex: 1,
            items: [
              {
                itemName: '全部课程',
                itemIndex: 0
              },
              {
                itemName: '已&nbsp;开&nbsp;&nbsp;课',
                itemIndex: 1
              },
              {
                itemName: '未&nbsp;开&nbsp;&nbsp;课',
                itemIndex: 2
              }
            ]
          }
        ],
        checked: [
          {
            itemName: '时间最近',
            itemIndex: 1,
          },
          {
            itemName: '全部课程',
            itemIndex: 0,
          }
        ],
        voteList: null
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    created() {
      window.addEventListener('scroll', this.scrolling);
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrolling);
    },
    mounted() {
      voteList().then(res => {
        console.log(res)
        if (res.status) {
          this.voteList = res.data.voteList
        }
      })
    },
    methods: {
      changeCheck(checked) {
        console.log('获取到子组件的选择内容');
        console.log(checked)
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
    /*背景固定不滚动*/
    .lesson-item {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px 5px;
      display: block;
      .type-one{
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
      .type-two{
        display: flex;
        height: 100px;
        align-items: center;
        .author-img{
          flex: 1;
          img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
        }
        .title{
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
        .author{
          span{
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

