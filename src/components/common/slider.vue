<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in banner">
        <div class="dec-area">
          <p class="dec">{{item.title}}</p>
          <div class="time">{{item.created_time}}</div>
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
      console.log(this.banner)
      console.log(this.banner)
      console.log(this.banner)
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
          display: block;
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
