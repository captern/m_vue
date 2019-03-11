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
      <input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget()"/>
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
        let result = this.searchValue
        this.$emit('parentMethod', this.searchValue)
//        this.restList = searchRest(this.geohash);
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
    /*width: calc(100% - 94px);*/
    height: 55px;
    /*line-height: 142px;*/
    padding: 18px 30px;
    background: #3ab2ed;
    .search_form {
      display: flex;
      .search-icon {
        width: 25px;
        height: 25px;
        position: absolute;
        margin-top: 16px;
        margin-left: 25px;
      }
      .search_input {
        height: 55px;
        flex: 4;
        background-color: #75c9f2;
        border-radius: 24px;
        padding: 0 20px 0 90px;
        outline: none;
        font-size: 23px;
        color: rgba(255, 255, 255, 0.6);
        &:-ms-input-placeholder {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
        }
        &::-webkit-input-placeholder {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
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

