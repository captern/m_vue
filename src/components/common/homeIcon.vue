<template>
  <div class="home-icon-page">
    返回昼夜
  </div>
</template>

<script>
  export default {
    data() {
      return {
        positionY: 0,
        timer: null,
      }
    },
    mounted() {

    },
    props: ['alertText'],
    methods: {
      closeTip(type) {
        this.$emit('closeTip', type)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-icon-page{

  }
</style>
