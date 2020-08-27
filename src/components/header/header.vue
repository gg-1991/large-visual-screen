<template>
  <div class="container">
      <div >
        <span style="color: #fff;font-size: 52px;padding-left: 435px;">社区诊疗一卡通——可视化大屏</span>
        <span class="time">{{time}}</span>
      </div>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
export default {
  name: "Header",
  data() {
    return {
      time:'',
      timer:null
    }
  },
  created() {
    this.time = this.nowTime();
  },
  mounted() {
      this.timer = window.setInterval (() => {
        this.time = this.nowTime();
      }, 60000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    nowTime () {
      const now= new Date();
      return parseTime(now, '{y}-{m}-{d} {h}:{i}') + ' ' + parseTime(now, '{a}')
    }
  }
};
</script>
<style scoped lang="scss">
  .container{
    height: 83px;
    line-height: 83px;
    width: 100%;
    text-align: center;
    /* // opacity:0.4; */
    .time{
      float: right;
      margin-right: 40px;
    }
  }
</style>