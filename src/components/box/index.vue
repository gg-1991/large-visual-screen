<template>
  <div class="box-content" :style="{height: height}">
      <img :src="leftUp" class="leftUp" alt="">
      <img :src="leftDown" class="leftDown" alt="">
      <img :src="rightUp" class="rightUp" alt="">
      <img :src="rightDown" class="rightDown" alt="">
      <slot />
  </div>
</template>
<script>
import leftUp from '@/assets/images/border_lift_up.png'
import leftDown from '@/assets/images/border_lift_down.png'
import rightUp from '@/assets/images/border_right_up.png'
import rightDown from '@/assets/images/border_right_down.png'
export default {
  props: {
    height:{
      type: String,
      default: 'auto'
    },
    width: {
      type: String,
      default: '100%'
    }
    
  },
  data() {
    return {
      leftUp:leftUp,
      leftDown:leftDown,
      rightDown:rightDown,
      rightUp:rightUp,
    }
  }
}
</script>
<style lang="scss" scoped>
$border-color: #387ADA;
.box-content{
  position: relative;
  border: 1px solid $border-color;
}
.leftUp{
  position: absolute;
  left:0;
  top: 0;
}
.leftDown{
  position: absolute;
  left:0;
  bottom: 0;
}
.rightUp{
  position: absolute;
  top: 0;
  right:0;
}
.rightDown{
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>