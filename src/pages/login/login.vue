<template>
  <div class="login-page">
    <Header title='登录'/>
    <p>csads</p>
    <p>{{this.userInfo}}</p>
  </div>
</template>

<script>
  import {sliderItems, searchplace} from '../../server/api'
  import Slider from '../../base/slider/slider'
  import Header from '../../components/header.vue'
  import TwoLanguageTitle from '../../components/twoLanguageTitle'

  import {mapState, mapActions} from 'vuex'

  export default {
    data() {
      return {
        recommends: ''
      }
    },
    mounted() {
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
      TwoLanguageTitle
    }
  }
</script>

<style lang="scss" scoped>
  .login-page {
    p{
      color: #000;
    }
  }
</style>

