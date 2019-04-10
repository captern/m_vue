<template>
  <div class="lesson-page" v-wechat-title="$route.meta.title='中心活动'">
    <Header title='中心活动' noBackShow='noBackShow'/>
    <HomeIcon></HomeIcon>
    <div class="select-area">
      <div class="select-type-area">
        <div class="select-type" :class="{check: pageType == 'one' }"  @click="changeCheck(1)">
          <span>活动</span>
          <span class="icon-down-area"><i class="icon-down"></i></span>
        </div>
        <div class="select-type" :class="{check: pageType == 'two' }" @click="changeCheck(2)">
          <span>投票</span>
          <span class="icon-down-area"><i class="icon-down"></i></span>
        </div>
      </div>
    </div>
    <div v-if="pageType == 'one'">
      <div v-for="(item, index) in listData" :key="index">
        <div class="lesson-item" v-if="!item.is_sign">
          <div class="vote-check" v-if="item.is_sign">已参与</div>
          <router-link :to="'/activityDec/' + item.id ">
            <div class="type-one">
              <div class="title">{{item.name}}</div>
              <div class="des">{{item.desc}}</div>
            </div>
          </router-link>
          <div class="register-area">
            <div class="author">
              <router-link :to="'/activityDec/' + item.id ">
                <div>活动时间：<span>{{item.start_time}}</span></div>
              </router-link>
            </div>
            <div class="register-btns">
              <div class="register-btn check" v-if="item.start" @click="registerIn(item.id)">签到</div>
              <div class="register-btn" v-else>签到</div>
              <div class="register-btn check" v-if="item.end" @click="registerOut(item.id)">签离</div>
              <div class="register-btn" v-else>签离</div>
            </div>
          </div>
        </div>
        <div class="lesson-item" v-else>
          <div class="vote-check"  v-if="item.is_sign">已参与</div>
          <router-link :to="'/activityMain/' + item.id ">
            <div class="type-one">
              <div class="title">{{item.name}}</div>
              <div class="des">{{item.desc}}</div>
            </div>
          </router-link>
          <div class="register-area">
            <div class="author">
              <router-link :to="'/activityMain/' + item.id ">
                <div>活动时间：<span>{{item.start_time}}</span></div>
              </router-link>
            </div>
            <div class="register-btns">
              <div class="register-btn check" v-if="item.start" @click="registerIn(item.id)">签到</div>
              <div class="register-btn" v-else>签到</div>
              <div class="register-btn check" v-if="item.end" @click="registerOut(item.id)">签离</div>
              <div class="register-btn" v-else>签离</div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div v-else-if="pageType == 'two'">
      <router-link :to="'/voteItem/' + item.id " class="lesson-item" v-for="(item, index) in listData" :key="index">
        <div class="vote-check" v-if="item.is_sub">已参与</div>
        <div class="vote">
          <div class="title">{{item.name}}</div>
          <div class="des" v-html="item.des"></div>
          <!--<div class="time">{{item.end_time}}</div>-->
          <div class="end-time" v-if="item.count_down != ''"><span>{{item.count_down}}</span></div>
          <p class="end-time down" v-else><span>00天00小时00分</span></p>
        </div>
      </router-link>
    </div>
    <!--弹出框部分-->
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" @confirmTip="registerCheckBtn" :tipType="tipType" :alertText="alertText" btnOne="返回" :btnTwo="btnTwo"/>
  </div>
</template>

<script>
  import alertTip from '../../components/common/alertTip'
  import Header from '../../components/header.vue'
  import Select from '../../components/select.vue'
  import HomeIcon from '../../components/common/homeIcon.vue'
  import {mapState, mapActions} from 'vuex'
  import {getActivityLists, getTestLists} from '../../server/activityApi'
  import {voteList} from '../../server/voteApi'
  import {activityRegister} from '../../server/myApi'

  export default {
    data() {
      return {
        requestFlag: true, // 是否请求接口
        listData: null,
        pageType: 'one',
        showAlert: false,
        tipType: '',
        btnTwo: '签离',
        alertText: '',
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
    },
    destroyed() {
    },
    mounted() {
      // 获取用户地址信息
      this.addressDetail()
      if(this.pageType == 'one'){
        this.getActivityList();
      }else if(this.pageType == 'two'){
        this.getTestList()
      }
    },
    methods: {
      registerCheckBtn() {
        let postData = {
          id: this.activityId,
          coordinates: this.myLocation
        }
        activityRegister(postData).then(res => {
          if (res.status) {
            if(this.checkType == 'one'){
              this.alertText = '签到成功';
              if(this.pageType == 'one'){
                this.getActivityList();
              }else if(this.pageType == 'two'){
                this.getTestList()
              }
            }else if(this.checkType == 'two'){
              this.alertText = '签离成功';
              if(this.pageType == 'one'){
                this.getActivityList();
              }else if(this.pageType == 'two'){
                this.getTestList()
              }
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
      registerIn(id){
        console.log('签到')
        this.showAlert = true;
        this.tipType = 'three';
        this.alertText = '是否进行签到';
        this.btnTwo = '签到';
        this.activityId = id;
        this.checkType = 'one';
      },
      registerOut(id){
        console.log('签离')
        this.showAlert = true;
        this.tipType = 'three';
        this.alertText = '是否进行签离';
        this.btnTwo =  '签离';
        this.activityId = id;
        this.checkType = 'two';
      },
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
        });
      },
      changeCheck(checked) {
        console.log(checked)
        if(checked == '1'){
          this.pageType = 'one';
          this.getActivityList();
        }else if(checked == '2'){
          this.pageType = 'two';
          this.getTestList();
        }
        this.type = checked
      },
      getActivityList(){
//        lessonList(getData).then(res => {
        getActivityLists().then(res => {
          if (res.status) {
            this.listData = res.list
          }
        })
      },
      getTestList(){
        let getData = {
          time: 1,
          flag: 1
        }
        voteList(getData).then(res => {
          if (res.status) {
            this.listData = res.list
          }
        })
      },
      scrolling() {
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
          color: rgb(134, 134, 134);
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
    .lesson-item {
      position: relative;
      background: #FFFFFF;
      margin: 23px;
      border-radius: 10px;
      padding: 30px 23px 5px;
      display: block;
      .vote-check{
        width: 85px;
        height: 27px;
        line-height: 27px;
        position: absolute;
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
      .vote{
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
        .time {
          text-align: right;
          font-size: 18px;
          line-height: 26px;
          color: #3ab2ed;
          padding-top: 20px;
        }
        .end-time{
          text-align: right;
          font-size: 18px;
          line-height: 26px;
          color: rgb(255, 255, 255);
          padding-top: 20px;
          padding-bottom: 29px;
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
          a{
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
            &.check{
              background: #3ab2ee;
            }
          }
        }
      }
    }
  }
</style>

