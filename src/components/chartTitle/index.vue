<template>
   <div class="titleTotal">
       <p class="text">{{title}}</p>
       <p class="unit" v-if="unit!==''">单位：{{unit}}</p>
   </div>
</template>
<script>
export default {
  name: 'ChartTile',
  props: {
    title: {
      type: String,
      default () {
        return ''
      }
    },
    unit: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {}
  },
}
</script>

<style>
  .titleTotal{
    text-align: left;
    border-bottom:1px solid #0F4370;
    padding-bottom: 30px;
  p{
    display: inline-block;
  }
  .text{
    color: #B1D2E9;
    font-size: 40px;
  }
  .unit{
    float: right;
    font-size: 24px;
    color: #67849F;
  }
  }
</style>
