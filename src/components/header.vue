<template>
  <div class="header">
    <div class="back" v-if='showBack' @click="$router.go(-1)">返回</div>
    <div class="back" v-else></div>
    <div class="page-title">{{title}}</div>
    <div class="menu">控制</div>
    <!--{{userInfo}}-->
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {getStore} from '../config/mUtils'

  export default {
    props: {
      title: '',
      noBackShow: ''
    },
    data() {
      return {
        showBack: true,
      }
    },
    mounted() {
      //获取用户信息
      this.backShow();
      if(getStore('user_id')){
        this.getUserInfo();
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
    },
    methods: {
      ...mapActions([
        'getUserInfo'
      ]),
      backShow() {
        if (this.noBackShow) {
          this.showBack = false
        }
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .header {
    color: #ffffff;
    width: 100%;
    height: 100px;
    line-height: 100px;
    background: #161616;
    display: flex;
    text-align: center;
    .back, .menu {
      flex: 1;
    }
    .page-title {
      flex: 6;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 20px;
    }
  }
</style>

