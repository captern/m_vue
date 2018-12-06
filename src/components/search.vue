<template>
  <div class="search">
    <div class="search_form" v-if='!inputFocus'>
      <img class="search-icon" src="../common/image/search-icon.png" alt="">
      <input type="search" name="search" placeholder="搜索内容" class="search_input" v-model="searchValue"
             @click="inputChangeFocus">
    </div>
    <form class="search_form input-focus" v-else>
      <img class="search-icon" src="../common/image/search-icon.png" alt="">
      <input type="search" name="search" class="search_input" placeholder="搜索内容" v-model="searchValue"
             @click="inputChangeFocus" autofocus="autofocus">
      <input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget('')"/>
    </form>
  </div>
</template>

<script>
  import {searchRest} from '../server/api'

  export default {
    props: {},
    data() {
      return {
        inputFocus: false,
        searchValue: '', // 搜索内容
        restList: [], // 搜索返回的结果
        emptyResult: false, // 搜索结果为空时显示
      }
    },
    methods: {
      backShow() {
        if (this.noBackShow) {
          this.showBack = false
        }
      },
      searchTarget() {
        console.log('ddd')
        this.restList = searchRest(this.geohash);
      },
      inputChangeFocus() {
        if (!this.inputFocus) {
          this.inputFocus = !this.inputFocus
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
  .search {
    width: calc(100% - 94px);
    height: 88px;
    line-height: 142px;
    padding: 27px 47px;
    background: #3ab2ed;
    .search_form {
      display: flex;
      .search-icon {
        width: 40px;
        height: 40px;
        position: absolute;
        margin-top: 24px;
        margin-left: 22px;
      }
      .search_input {
        height: 88px;
        flex: 4;
        background-color: #75c9f2;
        border-radius: 24px;
        padding: 0 20px 0 90px;
        outline: none;
        color: #ffffff;
        &:-ms-input-placeholder {
          text-align: center;
          color: #ffffff
        }
        &::-webkit-input-placeholder {
          text-align: center;
          color: #ffffff
        }
      }
      .search_submit {
        border-left: 1px solid #ffffff;
        background-color: #75c9f2;
        border-radius: 0 24px 24px 0;
      }
    }
    .input-focus {
      display: flex;
      .search_input {
        flex: 6;
        border-radius: 24px 0 0 24px;
      }
      .search_submit {
        color: #ffffff;
        text-align: center;
        flex: 1.75;
      }
    }
  }
</style>

