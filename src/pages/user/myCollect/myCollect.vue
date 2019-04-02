<template>
  <div class="lesson-page" v-wechat-title="$route.meta.title='我的收藏'">
    <Header title='我的收藏' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div v-for="(item, index) in myCollectList" :key="index">
      <div v-if="item.is_sign">
        <router-link :to="'/myLessonMain/' + item.cou_id " class="lesson-item">
          <div class="type-one" v-if="item.has_teacher_img == 0">
            <p class="title">{{item.name}}</p>
            <p class="des">{{item.desc}}</p>
          </div>
          <div class="type-two" v-else-if="item.has_teacher_img == 1">
            <div class="author-img">
              <img :src="item.teacher_img" alt="">
            </div>
            <p class="title">{{item.name}}</p>
          </div>
          <div class="author-time">
            <div class="author">主讲人：<span>{{item.teacher}}</span></div>
            <div class="time">授课时间：{{item.study_time}}</div>
          </div>
        </router-link>
      </div>
      <div v-else>
        <router-link :to="'/lessonMain/' + item.cou_id " class="lesson-item">
          <div class="type-one" v-if="item.has_teacher_img == 0">
            <p class="title">{{item.name}}</p>
            <p class="des">{{item.desc}}</p>
          </div>
          <div class="type-two" v-else-if="item.has_teacher_img == 1">
            <div class="author-img">
              <img :src="item.teacher_img" alt="">
            </div>
            <p class="title">{{item.name}}</p>
          </div>
          <div class="author-time">
            <div class="author">主讲人：<span>{{item.teacher}}</span></div>
            <div class="time">授课时间：{{item.study_time}}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUser, getBanner, getIndexLink} from '../../../server/api'
  import Header from '../../../components/header.vue'
  import Select from '../../../components/select.vue'
  import HomeIcon from '../../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import {myCollect} from '../../../server/myApi'

  export default {
    data() {
      return {
        myCollectList: null
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
      myCollect().then(res=>{
        this.myCollectList = res.data
      })
      console.log(this.myCollectList)
    },
    methods: {
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
    background: url("../../../common/image/bkg/bkg-two.png") fixed;
    background-size: 100% 100%;
    height: 100%;
    width: 100%;
    overflow: scroll;
    min-height: 100vh;
    /*背景固定不滚动*/
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
          max-height: 93px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
          /*! autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
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

