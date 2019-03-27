<template>
  <div class="lesson-page" v-wechat-title="$route.meta.title='我的活动'">
    <Header title='我的活动' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <Select :selectAreaData=selectAreaData :checked=checked @parentMethod="changeCheck"></Select>
    <div v-for="(item, index) in activityList" :key="index">
      <div class="lesson-item">
        <router-link :to="'/activityMain/' + item.cou_id ">
          <div class="type-one">
            <div class="title">{{item.name}}</div>
            <div class="des">{{item.desc}}</div>
          </div>
        </router-link>
        <div class="register-area">
          <div class="author">
            <router-link :to="'/activityMain/' + item.cou_id ">
              <div>主讲人：<span>{{item.teacher}}</span></div>
            </router-link>
          </div>
          <div class="register-btns">
            <div class="register-btn check" v-if="item.start" @click="registerIn(item.cou_id)">签到</div>
            <div class="register-btn" v-else>签到</div>
            <div class="register-btn check" v-if="item.end" @click="registerOut(item.cou_id)">签离</div>
            <div class="register-btn" v-else>签离</div>
          </div>
        </div>
      </div>
    </div>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" @confirmTip="registerCheckBtn" :tipType="tipType"
               :alertText="alertText" btnOne="返回" :btnTwo="btnTwo"/>

  </div>
</template>

<script>
  import alertTip from '../../../components/common/alertTip'
  import Header from '../../../components/header.vue'
  import Select from '../../../components/select.vue'
  import HomeIcon from '../../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import {myActivity, activityRegister} from '../../../server/myApi'

  // 1 表示线上，2 表示线下

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
                itemName: '全部活动',
                itemIndex: 1
              },
              {
                itemName: '已&nbsp;开&nbsp;&nbsp;始',
                itemIndex: 2
              },
              {
                itemName: '未&nbsp;开&nbsp;&nbsp;始',
                itemIndex: 3
              },
              {
                itemName: '已&nbsp;结&nbsp;&nbsp;束',
                itemIndex: 4
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
            itemName: '全部活动',
            itemIndex: 1,
          }
        ],
        activityList: null,
        showAlert: false,
        tipType: '',
        btnTwo: '签离',
        alertText: '',
        activityId: '',
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
      this.getActivityList();
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
          id: this.activityId,
          coordinates: this.myLocation
        }
        activityRegister(postData).then(res => {
          if (res.status) {
            if (this.checkType == 'one') {
              this.alertText = '签到成功'
            } else if (this.checkType == 'two') {
              this.alertText = '签离成功'
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
        this.activityId = id;
        this.checkType = 'one';
      },
      registerOut(id) {
        console.log('签离')
        this.showAlert = true;
        this.tipType = 'three';
        this.alertText = '是否进行签离';
        this.btnTwo = '签离';
        this.activityId = id;
        this.checkType = 'two';
      },
      changeCheck(checked) {
        console.log('获取到子组件的选择内容');
        console.log(checked)
        this.getActivityList();
      },
      getActivityList(){
        let getData = {
          time: this.checked[0].itemIndex,
          flag: this.checked[1].itemIndex
        }
//        lessonList(getData).then(res => {
        myActivity(getData).then(res => {
          console.log(res)
          if (res.status) {
            this.activityList = res.data
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
      HomeIcon,
      alertTip
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
        .author {
          padding-right: auto;
          flex: 1;
          font-size: 17px;
          line-height: 43px;
          /*color: #b2b2b3;*/
          color: #3ab2ed;
          a {
            color: #3ab2ed;
          }
        }
        .register-btns {
          position: relative;
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
      }
    }
  }
</style>

