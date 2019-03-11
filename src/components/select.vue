<template>
  <div class="select-area">
    <div class="select-type-area">
      <div class="select-type" v-for="(item, typeIndex) in selectAreaData" @click="showPop(item.typeIndex)">
        <span v-html="checked[typeIndex].itemName"></span>
        <span class="icon-down-area"><i class="icon-down"></i></span>
        <div class="select-pop" v-if="popShow && (typeIndex === checkedType.typeIndex)">
          <ul class="select-item-area">
            <li class="select-item" v-for="(items, itemIndex) in item.items"
                :class="{ check: checked[typeIndex].itemIndex === items.itemIndex }"
                @click="changeCheckItem(typeIndex,items.itemName,items.itemIndex)">
              <span class="select-item-icon">.</span><span v-html="items.itemName"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import {getStore} from '../config/mUtils'

  export default {
    props: {
      checked: '',
      selectAreaData: ''
    },
    data() {
      return {
        showBack: true,
        popShow: false,
        checkTypeIndex: 1,
        checkedType: {
          typeIndex: null,
        },

      }
    },
    beforeMount() {
      // this.checkWx();
    },
    mounted() {
      //获取用户信息
      this.backShow();
      // if(getStore('user_id')){
      //   this.getUserInfo();
      // }
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
      },
      showPop(typeIndex) {
        this.checkedType.typeIndex = typeIndex;
        this.popShow = !this.popShow
      },
      changeCheckItem(typeIndex,itemName,itemIndex) {
        this.checked[typeIndex].itemName = itemName;
        this.checked[typeIndex].itemIndex = itemIndex;
        this.parentChangeChecked()
      },
      parentChangeChecked(){
        console.log('dddddd')
        this.$emit('parentMethod',this.checked)
      }
    },
    components: {},
  }
</script>

<style lang="scss" scoped>
  /*向下箭头区域*/
  .icon-down-area {
    position: relative;
    .icon-down:before, .icon-down:after {
      position: absolute;
      content: '';
      border-bottom: 5px transparent dashed;
      border-left: 12px transparent dashed;
      border-right: 12px transparent dashed;
      border-top: 10px #fff solid;
    }
    .icon-down:before {
      border-top: 8px #999999 solid;
      top: 2px;
    }
    .icon-down:after {
      border-top: 8px #ffffff solid;
    }
  }

  .select-area {
    height: 62px;
    line-height: 62px;
    background: #FFFFFF;
    z-index: 100;
    .select-type-area {
      display: flex;
      .select-type {
        flex: 1;
        text-align: center;
        font-size: 23px;
        position: relative;
        color: rgb(58, 178, 237);
        border-right: 1px solid #3ab2ed;
        &:last-child {
          border-right: none;
        }
        .icon-down-area {
          display: inline-block;
          height: 16px;
          vertical-align: middle;
        }
        .select-pop {
          width: 139px;
          background: #FFFFFF;
          border-radius: 10px;
          box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.15);
          position: absolute;
          z-index: 100;
          top: 50px;
          left: calc(50% - 72px);
          .select-item-area {
            padding: 10px 0;
            .select-item {
              width: 109px;
              margin: 0 15px;
              font-size: 19px;
              line-height: 37px;
              color: rgb(134, 134, 134);
              border-bottom: 0.5px solid rgba(134, 134, 134, 0.6);
              /*span{*/
              .select-item-icon {
                display: inline-block;
                width: 15px;
                height: 30px;
                line-height: 18px;
                vertical-align: middle;
                margin-left: -10px;
              }
              &.check {
                color: rgb(58, 178, 237);
              }
            }
          }
        }
        /*border-radius: 95%;*/
      }
    }
  }
</style>

