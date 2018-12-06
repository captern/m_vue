<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <div class="dec-area">
          <p class="dec">你看了男方的面孔V领；哪款大V卡米拉打开了；发；快女离开；单反；连麦；不可拉到你</p>
          <div class="time">2018年11月25日</div>
        </div>
        <img class="image" src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1075114.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <div class="dec-area">
          <p class="dec">你看了男方的面孔V领；你看了男方的面孔V领你看了男方的面孔V领你看了男方的面孔V领你看了男方的面孔V领你看了男方的面孔V领；发；快女离开；单反；连麦；不可拉到你</p>
          <div class="time">2018年11月25日</div>
        </div>
        <img class="image" src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1075114.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <div class="dec-area">
          <p class="dec">你看了男方的面孔V领你看了男方的面孔V领你看了男方的面孔V领你看了男方的面孔V领你看了男方的面孔V领；哪款大V卡米拉打开了；发；快女离开；单反；连麦；不可拉到你</p>
          <div class="time">2018年11月25日</div>
        </div>
        <img class="image" src="http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1075114.jpg" alt="">
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
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      new Swiper ('.swiper-container', {
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
      })
    },
  }
</script>

<style lang="scss" scoped>
  .swiper-container{
    font-size: 0;
    .swiper-wrapper{
      .swiper-slide{
        .dec-area{
          position: absolute;
          bottom: 0;
          z-index: 100;
          width: 100%;
          height: 134px;
          background-color: rgba(49,49,49,0.75);
          display: flex;
          .dec{
            flex: 3;
            font-size: 30px;
            color: #ffffff;
            margin: 25px 25px;
            height: 74px;
            line-height: 37px;
            overflow: hidden;
          }
          .time{
            flex: 1.25;
            font-size: 35px;
            color: #3ab2ed;
            vertical-align: bottom;
            line-height: 190px;
          }
        }
        .image{
          height: 553px;
          width: 100%;
        }
      }
    }
    .swiper-pagination{
      top: 30px;
      .swiper-pagination-bullet{
        display: none!important;
      }
    }
  }
</style>
