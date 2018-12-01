<template>
  <div class="index">
    <Header title='东部中心人才培养基地' noBackShow='noBackShow'/>
    <Search title='东部中心人才培养基地' noBackShow='noBackShow'/>
    <Slider/>
    <p>njkknjcda</p>
    <!--<TwoLanguageTitle english='Product' chinese='产品' linkTitle='查看更多' link="/title"></TwoLanguageTitle>-->
    <!--<TwoLanguageTitle english='Walkthrough' chinese='攻略'></TwoLanguageTitle>-->
  </div>
</template>

<script>
  import {sliderItems, searchplace} from '../../server/api'
  import Slider from '../../base/slider/slider'
  import Header from '../../components/header.vue'
  import Search from '../../components/search.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'

  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        recommends: [
          {
            linkUrl: 'http://y.qq.com/w/album.html?albummid=000zQSi93tJtgY',
            picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1075114.jpg'
          },
          {
            linkUrl: 'https://y.qq.com/m/act/TNTB/index.html?openinqqmusic=1&ADTAG=jiaodiantu',
            picUrl: 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/983421.jpg'
          }
        ]
      }
    },
    mounted() {
      sliderItems().then(res => {
        console.log(res)
      })
      searchplace('qqq', 'www').then(res => {
        console.log(res)
      })
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
    },
    methods: {},
    components: {
      Slider,
      Header,
      Search,
      TwoLanguageTitle
    }
  }
</script>

<style lang="scss" scoped>
  .slider-wrapper {

    .slider-content {

    }

  }
</style>

