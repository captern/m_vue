<template>
  <div class="vote-page" v-wechat-title="$route.meta.title='在线测试'">
    <Header title='在线测试' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <router-link :to="'/testDes/' + item.id " class="test-item" v-for="(item, index) in testList" :key="index">
      <p class="title">{{item.name}}</p>
      <p class="des">{{item.desc}}</p>
      <div class="text-bottom">
        <div class="author">发布人：<span>{{item.user}}</span></div>
        <p class="time">{{item.date}}</p>
      </div>

    </router-link>
  </div>
</template>

<script>
  import {getUse, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import {testList} from '../../server/testApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        testList: null
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
      testList().then(res => {
        if (res.status) {
          this.testList = res.list
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
      HomeIcon
    },
  }
</script>

<style lang="scss" scoped>
  .vote-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    height: 100%;
    min-height: 100vh;
    /*background-position: fixed;*/
    /*position: fixed;*/
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .test-item {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      display: block;
      .title {
        font-size: 23px;
        line-height: 31px;
        color: #231815;
      }
      .des {
        font-size: 19px;
        line-height: 31px;
        color: #727171;
        padding-top: 14px;
      }
      .text-bottom{
        display: flex;
        padding-top: 20px;
        font-size: 21px;
        color: #3ab2ed;
        .author{
          flex: 1;
          span{
            color: #231815;
          }
        }
        .time {
          flex: 1.5;
          text-align: right;
          line-height: 26px;


        }
      }

    }
  }
</style>

