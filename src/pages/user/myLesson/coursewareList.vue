<template>
  <div class="courseware-page" v-wechat-title="$route.meta.title='课程详情'">
    <Header title='课程详情' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="coursewareList-area">
      <div class="coursewareList-item" v-for="(item, index) in coursewareData" :key="index" @click="goLink(item.link)">
        <div class="name">{{item.name}}</div>
        <div class="link-icon">
          <img src="" alt="icon">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUser, getBanner, getIndexLink} from '../../../server/api'
  import Header from '../../../components/header.vue'
  import HomeIcon from '../../../components/common/homeIcon.vue'
  import alertTip from '../../../components/common/alertTip'
  import Heart from '../../../components/common/heart'
  import {mapState, mapActions} from 'vuex'

  import {lessonMain, signLesson} from '../../../server/lessonApi'
  import {myLessonMain, cancelSignIn, registerCheck} from '../../../server/myApi'

  export default {
    data() {
      return {
        coursewareId: '',
        coursewareData: '',
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    mounted() {
      this.coursewareId = this.$route.params.coursewareId;
      this.getData()
    },
    methods: {
      getData() {
        let getData = {
          id: this.coursewareId
        }
        myLessonMain(getData).then(res => {
          this.coursewareData = res.data.files
        })
      },
      goLink(link) {
        window.location.href = link
      }
    },
    components: {
      Header,
      HomeIcon,
      alertTip,
      Heart
    },
  }
</script>

<style lang="scss" scoped>
  .courseware-page {
    /*背景固定不滚动*/
    background: url("../../../common/image/bkg/bkg-one.png");
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    /*会导致页面滚动不触发*/
    width: 100%;
    overflow: scroll;
    /*背景固定不滚动*/
    .coursewareList-area {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 71px 47px;
      min-height: calc(100vh - 188px);
      .coursewareList-item {
        font-size: 23px;
        line-height: 30px;
        color: rgb(35, 24, 21);
        border-bottom: 1px solid #999999;
        display: flex;
        align-items: center;
        padding-bottom: 19px;
        .name {
          flex: 7;
          height: 60px;
          overflow: hidden;
        }
        .link-icon {
          flex: 1;
        }
      }
    }
  }
</style>

