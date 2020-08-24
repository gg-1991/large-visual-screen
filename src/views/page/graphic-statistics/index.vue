<template>
  <div class="container">
     <div class="title">
        <div class="list1">
          <img :src="titleLeftImg" alt="">
        </div>
        <div class="list2"></div>
        <div class="list3">
          <img :src="titleRightImg" alt="">
        </div>
     </div>
     <div class="oneBox"></div>
     <div class="twoBox"></div>
  </div>
</template>
<script>
import titleLeft from '@/assets/images/bg_lift.png'
import titleRight from '@/assets/images/bg_right.png'
export default {
  name: "GraphicStatistics",
  data() {
    return {
      titleLeftImg: titleLeft,
      titleRightImg:titleRight
    }
  },
  created() {
  },
  methods: {
  }
};
</script>
<style scoped >
  .container{
  }
</style>