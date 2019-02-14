<template>
  <div class="vote-page" v-wechat-title="$route.meta.title='投票'">
    <Header title='东部中心人才培养基地' noBackShow='noBackShow'/>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
    <p>jkmmmkllkm</p>
  </div>
</template>

<script>
  import {getUser, getBanner, getIndexLink} from '../../server/api'
  import Slider from '../../components/common/slider'
  import Header from '../../components/header.vue'
  import Search from '../../components/search.vue'
  import mainList from '../../components/mainList.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'
  import alertTip from '../../components/common/alertTip'
  import {getStore} from '../../config/mUtils'
  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        banner: null,
        showAlert: true,
        getUid: false,
        userMsg: null,
        showBottomPop: false,
        indexList: [
          {
            source: '',
            url: '',
            title: ''
          }
        ],
        menuList: [
          {
            title: "",
            url: "",
            source: ''
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'userInfo',
        'login'
      ])
    },
    mounted() {
      getBanner().then(res => {
        this.banner = res.data
      })
      // 获取首页链接信息
      getIndexLink().then(
        res => {
          console.log(res.data)
          this.indexList = res.data.index
          this.menuList = res.data.menu
        }
      )
      if (getStore('user_id')) {
        getUser().then(res => {
          if (res.status) {
            this.userMsg = res.data
          } else {
            console.log('用户信息获取失败')
          }
        })
      }
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
      showPop() {
        this.showBottomPop = !this.showBottomPop
      },
      jumpUrl(url, source){
        console.log(url)
        console.log(source)
        if(source == 1){
          this.$router.push(url)
        }else if(source == 2){
          window.location.href=(url)
        }
      }
    },
    components: {
      Slider,
      Header,
      Search,
      mainList,
      alertTip,
      TwoLanguageTitle
    },
  }
</script>

<style lang="scss" scoped>
  body{
    background: url("../../common/image/bkg.png") 100% 100% no-repeat;
  }
  .vote-page {
    max-width: 100vh;
    /*position: relative;*/
    /*top: 0;*/
overflow: scroll;
    .bkg{
      width: 100%;
      height: 100%;
    }
  }
</style>

