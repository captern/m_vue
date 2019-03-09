<template>
  <div class="heart-area">
    <img v-if="hearted" src="../../common/icon/icon-item-0@3x.png" @click="removeHeart" alt="">
    <img v-else src="" @click="setHeart" alt="收藏">
    <alert-tip v-if="setHeartAlert" @closeTip="removeAlert" @confirmTip="signUp" tipType="three" alertText="是否收藏本课程" btnOne="返回" btnTwo="收藏"/>
    <alert-tip v-if="removeHeartAlert" @closeTip="removeAlert" @confirmTip="removeSignUp" tipType="three" alertText="是否取消收藏本课程" btnOne="返回" btnTwo="取消收藏"/>
  </div>
</template>

<script>
  import alertTip from '../../components/common/alertTip'
  export default {
    data() {
      return {
        hearted:'',
        setHeartAlert: false,
        removeHeartAlert: false
      }
    },
    props: ['heart'],
    mounted() {
      this.hearted = this.heart
    },
    methods: {
      setHeart(){
        this.setHeartAlert = true
      },
      removeHeart(){
        this.removeHeartAlert = true
      },
      // 移除所有的弹出层
      removeAlert(){
        this.setHeartAlert = false
        this.removeHeartAlert = false
      },
      // 设置收藏
      signUp(){
        console.log('发送设置收藏接口')
        this.hearted = true;
      },
      // 取消收藏
      removeSignUp(){
        console.log('发送取消收藏接口')
        this.hearted = false
      }
    },
    components: {
      alertTip,
    },
  }
</script>

<style lang="scss" scoped>
  .heart-area{
    img {
      width: 59px;
      height: 59px;
    }
  }
</style>
