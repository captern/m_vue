<template>
  <div class="lesson-page" v-wechat-title="$route.meta.title='课程列表'">
    <Header title='课程列表' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <Search @parentMethod="changeSearch"></Search>
    <Select :selectAreaData=selectAreaData :checked=checked @parentMethod="changeCheck"></Select>
    <div v-for="(item, index) in voteList" :key="index">
      <!--已经报名课程-->
      <div class="lesson-item" v-if="item.is_sign">
        <div class="vote-check" v-if="item.is_sign">已参与</div>
        <router-link :to="'/myLessonMain/' + item.id ">
          <div class="type-one" v-if="item.has_teacher_img == 0">
            <p class="title">{{item.name}}</p>
            <p class="des">{{item.desc}}</p>
          </div>
          <div class="type-two" v-else-if="item.has_teacher_img == 1">
            <div class="author-img">
              <!--<img src="../../common/image/bkg/bkg-one.png" alt="">-->
              <img :src="item.teacher_img" alt="">
            </div>
            <p class="title">{{item.name}}</p>
          </div>
        </router-link>
        <div class="register-area" v-if="item.type == 2">
          <div class="author-time">
            <div class="author"><span>主讲人：</span>{{item.teacher}}</div>
            <div class="time">授课时间：<span>{{item.study_time}}</span></div>
          </div>
        </div>
        <div class="register-area register-type-one" v-else>
          <div class="author-time-one">
            <div class="author"><span>主讲人：</span>{{item.teacher}}</div>
            <div class="time">授课时间：<span>{{item.study_time}}</span></div>
          </div>
        </div>
      </div>
      <!--未来得及报名-->
      <div  class="lesson-item" v-else>
        <router-link :to="'/lessonMain/' + item.id ">
          <div class="type-one" v-if="item.has_teacher_img == 0">
            <p class="title">{{item.name}}</p>
            <p class="des">{{item.desc}}</p>
          </div>
          <div class="type-two" v-else-if="item.has_teacher_img == 1">
            <div class="author-img">
              <!--<img src="../../common/image/bkg/bkg-one.png" alt="">-->
              <img :src="item.teacher_img" alt="">
            </div>
            <p class="title">{{item.name}}</p>
          </div>
        </router-link>
        <div class="register-area" v-if="item.type == 2">
          <div class="author-time">
            <div class="author"><span>主讲人：</span>{{item.teacher}}</div>
            <div class="time">授课时间：<span>{{item.study_time}}</span></div>
          </div>
        </div>
        <div class="register-area register-type-one" v-else>
          <div class="author-time-one">
            <div class="author"><span>主讲人：</span>{{item.teacher}}</div>
            <div class="time">授课时间：<span>{{item.study_time}}</span></div>
          </div>
        </div>      </div>
    </div>
    <!--弹出框部分-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" @confirmTip="registerCheckBtn" :tipType="tipType"
               :alertText="alertText" btnOne="返回" :btnTwo="btnTwo"/>
  </div>
</template>

<script>
  import alertTip from '../../components/common/alertTip'
  import Search from '../../components/search.vue'
  import Header from '../../components/header.vue'
  import Select from '../../components/select.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import {lessonList} from '../../server/lessonApi'
  import {registerCheck} from '../../server/myApi'


  // 1 表示线上，2 表示线下

  export default {
    data() {
      return {
        type: '',
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
                itemName: '全部课程',
                itemIndex: 1
              },
              {
                itemName: '已&nbsp;开&nbsp;&nbsp;课',
                itemIndex: 2
              },
              {
                itemName: '未&nbsp;开&nbsp;&nbsp;课',
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
            itemName: '全部课程',
            itemIndex: 1,
          }
        ],
        voteList: null,
        searchVal: '',
        showAlert: false,
        tipType: '',
        btnTwo: '签离',
        alertText: '',
        lessonId: '',
        myLocation: '',
        checkType: '',    //表示是签到还是签离
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
      this.type = this.$route.params.type;
      this.getLessonList();
      this.addressDetail();
    },
    methods: {
      // 获取地理位置
      addressDetail() { //获取地理位置
        let _this = this;
        var vm = this;
//全局的this在方法中不能使用，需要重新定义一下
        var geolocation = new BMap.Geolocation();
        var gc = new BMap.Geocoder();
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            const myGeo = new BMap.Geocoder()
            myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
              if (data.addressComponents) {
                const result = data.addressComponents
                const location = {
                  creditLongitude: r.point.lat, // 经度
                  creditLatitude: r.point.lng, // 纬度
//                  creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
                }
//                _this.myLocation = location.creditLongitude + ',' + location.creditLatitude
                _this.myLocation = location.creditLatitude + ',' + location.creditLongitude
                console.log(location)
              }
            })
          }
        })
      },
      registerCheckBtn() {
        let postData = {
          id: this.lessonId,
          coordinates: this.myLocation
        }
        registerCheck(postData).then(res => {
          if (res.status) {
            if (this.checkType == 'one') {
              this.alertText = '签到成功'
              this.getLessonList();
            } else if (this.checkType == 'two') {
              this.alertText = '签离成功';
              this.getLessonList();
            }
            this.showAlert = true;
            this.tipType = 'one';
          } else {
            this.showAlert = true;
            this.tipType = 'one';
            this.alertText = res.msg
          }
        })
      },
      registerIn(id) {
        console.log('签到')
        this.showAlert = true;
        this.tipType = 'three';
        this.alertText = '是否进行签到';
        this.btnTwo = '签到';
        this.lessonId = id;
        this.checkType = 'one';
      },
      registerOut(id) {
        console.log('签离')
        this.showAlert = true;
        this.tipType = 'three';
        this.alertText = '是否进行签离';
        this.btnTwo = '签离';
        this.lessonId = id;
        this.checkType = 'two';
      },
      changeSearch(val) {
        this.searchVal = val
        this.getLessonList();
      },
      changeCheck(checked) {
        console.log('获取到子组件的选择内容');
        console.log(checked)
        this.getLessonList();
      },
      getLessonList() {
        let getData = ''
        if (this.type == undefined) {
          getData = {
            time: this.checked[0].itemIndex,
            flag: this.checked[1].itemIndex,
            name: this.searchVal
          }
        } else {
          getData = {
            type: this.type,
            time: this.checked[0].itemIndex,
            flag: this.checked[1].itemIndex,
            name: this.searchVal
          }
        }

        lessonList(getData).then(res => {
          console.log(res)
          if (res.status) {
            this.voteList = res.list
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
      Search,
      Select,
      HomeIcon,
      alertTip
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
    /*背景固定不滚动*/
    .lesson-item {
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px 5px;
      display: block;
      position: relative;
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
      .register-area {
        display: flex;
        margin: 30px 0 20px;
        .author-time {
          padding-right: auto;
          max-width: 50vw;
          flex: 1;
          /*color: #b2b2b3;*/
          .author, .time {
            font-size: 17px;
            line-height: 33px;
            height: 33px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .time {
            color: #3ab2ed;
          }
          .author {
            color: rgb(35, 24, 21);
            span {
              color: #3ab2ed;
            }
          }
        }
        .register-btns {
          margin-top: 20px;
          .register-btn {
            display: inline-block;
            width: 90px;
            height: 43px;
            line-height: 43px;
            background: #b3b3b3;
            text-align: center;
            color: rgb(255, 255, 255);
            font-size: 28px;
            border-radius: 12px;
            margin-left: 20px;
            &.check {
              background: #3ab2ee;
            }
          }
        }
        &.register-type-one{
          display: block;
          .author-time-one {
            display: flex;
            .author, .time {
              flex: 1;
              font-size: 17px;
              line-height: 36px;
              /*color: #b2b2b3;*/
              margin: 10px 0 15px;
              color: #000;
            }
            .author {
              span {
                color: #3ab2ed;
              }
            }
            .time {
              color: #3ab2ed;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>

