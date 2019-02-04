<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in banner" :jumpurl='item.title'>
        <div class="dec-area">
          <p class="dec">{{item.title}}</p>
          <!--<div class="time">{{item.created_time}}</div>-->
        </div>
        <img class="image" :src="item.cover" alt="">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from "swiper";
  import "swiper/dist/css/swiper.css";
  import "./asd.css";

  export default {
    name: 'slider',
    props: ['banner'],
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      var that = this
      new Swiper('.swiper-container', {
        observer: true,
        loop: true,
        type: 'bullets',
        speed: 500,
        // autoPlay: 1000,
        autoplay: true,
        initialSlide: 1,
        preventClicksPropagation: true,
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
        pagination: {
          el: '.swiper-pagination',
        },
        on: {
          click: function (e) {
            const realIndex = this.realIndex;
            that.jumpUrl(realIndex)
          }
        }
      })
    },
    methods: {
      jumpUrl(realIndex) {
        // source  为1 表示内部连接   2表示外部链接
        let jumpType = this.banner[realIndex].source
        // type 为1 表示是新闻  2是公告
        let linkType = this.banner[realIndex].type
        if(jumpType == 1){
          if(linkType == 1){
            this.$router.push('/news/'+ this.banner[realIndex].id)
          }else if(linkType == 2){
            this.$router.push('/notice/'+ this.banner[realIndex].id)
          }
        }else if(jumpType == 2){
          window.location.href=(this.banner[realIndex].link)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swiper-container {
    height: 460px;
    font-size: 0;
    .swiper-wrapper {
      .swiper-slide {
        .dec-area {
          position: absolute;
          bottom: 0;
          z-index: 100;
          width: 100%;
          height: 102px;
          background-color: rgba(0, 0, 0, 0.25);
          .dec {
            font-size: 24px;
            text-align: center;
            color: #ffffff;
            margin: 27px 50px;
            line-height: 30px;
          }
          .time {
            flex: 1.25;
            font-size: 35px;
            color: #3ab2ed;
            vertical-align: bottom;
            line-height: 190px;
          }
        }
        .image {
          height: 553px;
          width: 100%;
          display: block;
        }
      }
    }
    .swiper-pagination {
      top: 25px;
      .swiper-pagination-bullet {
        width: 10px!important;
        height: 10px!important;
        display: none !important;
        background: white!important;
      }
    }
  }
</style>
