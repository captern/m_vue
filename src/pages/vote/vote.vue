<template>
  <div class="vote-page" v-wechat-title="$route.meta.title='投票'">
    <Header title='投票' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="select-area">
      <div class="select-type-area">
        <div class="select-type" :class="{check: checked[1].itemIndex == 1 }" @click="changeCheck(1)">
          <span>正在投票</span>
          <span class="icon-down-area"><i class="icon-down"></i></span>
        </div>
        <div class="select-type" :class="{check: checked[1].itemIndex == 2 }" @click="changeCheck(2)">
          <span>投票结束</span>
          <span class="icon-down-area"><i class="icon-down"></i></span>
        </div>
      </div>
    </div>
    <!--<Select :selectAreaData=selectAreaData :checked=checked @parentMethod="changeCheck"></Select>-->
    <router-link :to="'/voteItem/' + item.id " class="vote-item" v-for="(item, index) in voteList" :key="index">
      <p class="title">{{item.name}}</p>
      <p class="des">{{item.des}}</p>
      <!--<p class="time">投票时间{{item.start_time}}-{{item.end_time}}</p>-->
      <p class="time" v-if="item.count_down != ''"><span>{{item.count_down}}</span></p>
      <p class="time down" v-else><span>00天00小时00分</span></p>
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
                itemIndex: 1
              },
              {
                itemName: '时间最近',
                itemIndex: 2
              },
              {
                itemName: '近&nbsp;三&nbsp;&nbsp;天',
                itemIndex: 3
              },
              {
                itemName: '一&nbsp;周&nbsp;&nbsp;内',
                itemIndex: 4
              },
              {
                itemName: '一个月内',
                itemIndex: 5
              }
            ]
          },
          {
            typeIndex: 1,
            items: [
              {
                itemName: '全部投票',
                itemIndex: 1
              },
              {
                itemName: '正在投票',
                itemIndex: 2
              },
              {
                itemName: '投票结束',
                itemIndex: 3
              }
            ]
          }
        ],
        checked: [
          {
            itemName: '全部',
            itemIndex: 1,
          },
          {
            itemName: '全部投票',
            itemIndex: 1,
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
      this.getVoteList();
    },
    methods: {
      getVoteList(){
        let getData = {
          time: this.checked[0].itemIndex,
          flag: this.checked[1].itemIndex
        }
        voteList(getData).then(res => {
          console.log(res)
          if (res.status) {
            this.voteList = res.list
          }
        })
      },
      changeCheck(checked) {
        console.log('获取到子组件的选择内容');
        console.log(checked)
        this.checked[1].itemIndex = checked
        this.getVoteList();
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
  .vote-page {
    /*背景固定不滚动*/
    background: url("../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    height: 100%;
    min-height: 100vh;
    width: 100%;
    overflow: scroll;
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
          color: rgb(134, 134, 134);
          position: relative;
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
    .vote-item {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px;
      display: block;
      .title {
        font-size: 23px;
        line-height: 31px;
        color: #231815;
        overflow: hidden;
        text-overflow:ellipsis;//文本溢出显示省略号
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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
        &.down{
          span{
            background: #b3b3b3;
          }
        }
      }
    }
  }
</style>

