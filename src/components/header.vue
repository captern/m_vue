<template>
  <div class="header">
    <div class="back">返回</div>
    <div class="page-title">{{title}}</div>
    <div class="menu">控制</div>
  </div>
</template>

<script>
  export default {
    props: {
      title: ''
    },
    data() {
      return {}
    },
    mounted() {
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  .header{
    width: 100%;
    height: 86px;
    line-height: 86px;
    background: red;
    display: flex;
    text-align: center;
    .back,.menu{
      flex: 1;
    }
    .page-title{
      flex: 8;
    }
  }
</style>

