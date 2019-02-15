<template>
  <div class="vote-page" v-wechat-title="$route.meta.title='投票'">
    <Header title='投票' noBackShow='noBackShow'/>
    <Select :selectAreaData=selectAreaData :checked=checked @parentMethod="changeCheck"></Select>
    <div class="vote-item">
      <p class="title">技术服务人才中高级培训课程的投票活动投票活动投票活动投票活动投票活动.........</p>
      <p class="des">技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动.......</p>
      <p class="time">投票时间：2018年12月10日-2018年12月20日</p>
    </div>
    <div class="vote-item">
      <p class="title">技术服务人才中高级培训课程的投票活动投票活动投票活动投票活动投票活动.........</p>
      <p class="des">技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动.......</p>
      <p class="time">投票时间：2018年12月10日-2018年12月20日</p>
    </div>
    <div class="vote-item">
      <p class="title">技术服务人才中高级培训课程的投票活动投票活动投票活动投票活动投票活动.........</p>
      <p class="des">技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动.......</p>
      <p class="time">投票时间：2018年12月10日-2018年12月20日</p>
    </div>
    <div class="vote-item">
      <p class="title">技术服务人才中高级培训课程的投票活动投票活动投票活动投票活动投票活动.........</p>
      <p class="des">技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动.......</p>
      <p class="time">投票时间：2018年12月10日-2018年12月20日</p>
    </div>
    <div class="vote-item">
      <p class="title">技术服务人才中高级培训课程的投票活动投票活动投票活动投票活动投票活动.........</p>
      <p class="des">技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动.......</p>
      <p class="time">投票时间：2018年12月10日-2018年12月20日</p>
    </div>
    <div class="vote-item">
      <p class="title">技术服务人才中高级培训课程的投票活动投票活动投票活动投票活动投票活动.........</p>
      <p class="des">技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动.......</p>
      <p class="time">投票时间：2018年12月10日-2018年12月20日</p>
    </div>
    <div class="vote-item">
      <p class="title">技术服务人才中高级培训课程的投票活动投票活动投票活动投票活动投票活动.........</p>
      <p class="des">技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动.......</p>
      <p class="time">投票时间：2018年12月10日-2018年12月20日</p>
    </div>
    <div class="vote-item">
      <p class="title">技术服务人才中高级培训课程的投票活动投票活动投票活动投票活动投票活动.........</p>
      <p class="des">技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动.......</p>
      <p class="time">投票时间：2018年12月10日-2018年12月20日</p>
    </div>
    <div class="vote-item">
      <p class="title">技术服务人才中高级培训课程的投票活动投票活动投票活动投票活动投票活动.........</p>
      <p class="des">技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动.......</p>
      <p class="time">投票时间：2018年12月10日-2018年12月20日</p>
    </div>
    <div class="vote-item">
      <p class="title">技术服务人才中高级培训课程的投票活动投票活动投票活动投票活动投票活动.........</p>
      <p class="des">技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动技术服务人才中高级培训课程的投票活动.......</p>
      <p class="time">投票时间：2018年12月10日-2018年12月20日</p>
    </div>
  </div>
</template>

<script>
  import {getUse, getBanner, getIndexLink} from '../../server/api'
  import Header from '../../components/header.vue'
  import Select from '../../components/select.vue'
  import {mapState, mapActions} from 'vuex'

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
                itemName: '全部投票',
                itemIndex: 0
              },
              {
                itemName: '正在投票',
                itemIndex: 1
              },
              {
                itemName: '投票结束',
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
            itemName: '全部投票',
            itemIndex: 0,
          }
        ],
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
      Select
    },
  }
</script>

<style lang="scss" scoped>
  .vote-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-two.png");
    background-size: 100% 100%;
    height: 100%;
    /*position: fixed;*/
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .vote-item {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
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
      .time {
        text-align: right;
        font-size: 18px;
        line-height: 26px;
        color: #3ab2ed;
        padding-top: 20px;
      }
    }
  }
</style>

