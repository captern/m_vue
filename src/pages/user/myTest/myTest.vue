<template>
  <div class="vote-page" v-wechat-title="$route.meta.title='我的测试'">
    <Header title='我的测试' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <router-link :to="'/testResult/' + item.id " class="test-item" v-for="(item, index) in myTestList" :key="index">
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
  import {getUse, getBanner, getIndexLink} from '../../../server/api'
  import Header from '../../../components/header.vue'
  import HomeIcon from '../../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import {myTest} from '../../../server/myApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        myTestList: null
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
      myTest().then(res => {
        if (res.status) {
          this.myTestList = res.list
        }
      })
    },
    methods: {
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
    background: url("../../../common/image/bkg/bkg-two.png") fixed;
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

