<template>
  <div class="header">
    <div class="back" v-if='showBack' @click="$router.go(-1)">返回</div>
    <div class="back" v-else></div>
    <div class="page-title">{{title}}</div>
    <div class="menu">控制</div>
  </div>
</template>

<script>
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
    methods: {
      backShow() {
        if (this.noBackShow) {
          this.showBack = false
        }
      }
    },
    mounted() {
      this.backShow()
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
      flex: 8;
    }
  }
</style>

