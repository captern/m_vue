<template>
  <div class="heart-area">
    <img v-if="hearted" src="../../common/icon/icon-item-0@3x.png" @click="removeHeart" alt="">
    <img v-else src="" @click="setHeart" alt="收藏">
    <alert-tip v-if="setHeartAlert" @closeTip="removeAlert" @confirmTip="setcollect" tipType="three" alertText="是否收藏本课程" btnOne="返回" btnTwo="收藏"/>
    <alert-tip v-if="removeHeartAlert" @closeTip="removeAlert" @confirmTip="removecollect" tipType="three" alertText="是否取消收藏本课程" btnOne="返回" btnTwo="取消收藏"/>
  </div>
</template>

<script>
  import alertTip from '../../components/common/alertTip'
  import {setCollect, removeCollect} from '../../server/lessonApi'
  export default {
    data() {
      return {
        hearted:'',
        setHeartAlert: false,
        removeHeartAlert: false
      }
    },
    props: ['heart', 'lessonId'],
    mounted() {
      this.hearted = this.heart
      console.log(this.lessonId + '课程id')
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
      setcollect(){
        console.log('发送设置收藏接口')
        let postData = {
          id: this.lessonId
        }
        setCollect(postData).then(res=>{
          if(res.status){
            this.hearted = true;
          }
        })
      },
      // 取消收藏
      removecollect(){
        let postData = {
          id: this.lessonId
        }
        console.log('发送取消收藏接口')
        removeCollect(postData).then(res=>{
          if (res.status){
            this.hearted = false
          }
        })

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
