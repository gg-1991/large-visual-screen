<template>
  <div class="containerTime">
    {{time}}
  </div>
</template>
<script>
import { parseTime } from '@/utils'
export default {
  name: "time",
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
        this.$emit('load')
      }, 60000 *30)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    nowTime () {
      const now= new Date();
      return '上次刷新时间' +  parseTime(now, '{h}:{i}:{s}')
    }
  }
};
</script>
<style scoped lang="scss">
  .containerTime{
    position: absolute;
    right: 30px;
    bottom: 20px;
    width: 300px;
    height: 27px;
    color: #67849F;
    font-size:28px;
  }
</style>