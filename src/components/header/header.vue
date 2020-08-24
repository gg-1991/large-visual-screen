<template>
  <div class="container">
      <div >
        <span style="color: #fff;font-size: 52px;padding-left: 435px;">社区诊疗一卡通——可视化大屏</span>
        <span class="time">{{time}}  {{week}}</span>
      </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      time:'2020-08-20',
      week:"周四",
      timer:null
    }
  },
  created() {
    this.time = this.nowTime();
    this.week = this.getWeek();
  },
  mounted() {
      const that = this
      this.timer = window.setInterval (function () {
        that.time = that.nowTime();
        that.week = that.getWeek();
      }, 60000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    nowTime () {
      let now= new Date();
      let _month = ( 10 > (now.getMonth()+1) ) ? '0' + (now.getMonth()+1) : now.getMonth()+1;
      let _day = ( 10 > now.getDate() ) ? '0' + now.getDate() : now.getDate();
      let _hour = ( 10 > now.getHours() ) ? '0' + now.getHours() : now.getHours();
      let _minute = ( 10 > now.getMinutes() ) ? '0' + now.getMinutes() : now.getMinutes();
      return now.getFullYear() + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute;
    },
    getWeek (){
      let now= new Date();
      let days = now.getDay();
      switch(days) {
            case 1:

                  days = '周一';

                  break;

            case 2:

                  days = '周二';

                  break;

            case 3:

                  days = '周三';

                  break;

            case 4:

                  days = '周四';

                  break;

            case 5:

                  days = '周五';

                  break;

            case 6:

                  days = '周六';

                  break;

            case 0:

                  days = '周日';

                  break;
      }
      return days
    }
  }
};
</script>
<style scoped >
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