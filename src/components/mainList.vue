<template>
  <div class="main-list-area">
    <div class="main-list">
      <div class="list-item" :class="listitem.subscript" v-for="(listitem, index) in linkList">
        <div class="link-icon">{{index}}</div>
        <div class="link-name">{{listitem.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {},
    data() {
      return {
        linkList: [
          {
            name: '课程报名',
            link: '',
            icon: '',
            subscript: 'one'

          },
          {
            name: '在线观看',
            link: '',
            icon: '',
            subscript: 'two'
          },
          {
            name: '上课签到',
            link: '',
            icon: '',
            subscript: 'three'
          },
          {
            name: '下课签退',
            link: '',
            icon: '',
            subscript: 'four'
          },
          {
            name: '课程反馈',
            link: '',
            icon: '',
            subscript: 'five'
          },
          {
            name: '在线测试',
            link: '',
            icon: '',
            subscript: 'six'
          },
          {
            name: '公告',
            link: '',
            icon: '',
            subscript: 'seven'
          },
          {
            name: '新闻',
            link: '',
            icon: '',
            subscript: 'eight'
          }
        ]
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
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  .main-list-area {
    min-height: 100%;
    margin: 20px 33px;
    background: #ffffff;
    border-radius: 12px;
    .main-list {
      padding: 50px 34px;
      height: 673px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .list-item {
        width: 293px;
        height: 140px;
        line-height: 140px;
        border-radius: 12px;
        display: flex;
        .link-icon{
          flex: 1;
          text-align: right;
          padding-right: 20px;
        };
        .link-name{
          flex: 2;
        }
        &.one{
          background: rgb(134,193,248);
        }
        &.two{
          background: rgb(160,207,242);
        }
        &.three{
          background: rgb(113,208,247);
        }
        &.four{
          background: rgb(169,199,211 );
        }
        &.five{
          background: rgb(178,196,224);
        }
        &.six{
          background: rgb(134,193,248);
        }
        &.seven{
          background: rgb(164,214,221);
        }
        &.eight{
          background: rgb(172,209,229);
        }
      }
    }
  }
</style>

