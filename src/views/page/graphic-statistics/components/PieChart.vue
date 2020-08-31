<template>
  <div style="width: 100%">
    <div class="pie-title">{{title}}</div>
    <div ref="main" :style="{ height: height }"></div>
  </div>
</template>
<script>
  export default {
    props: {
        chartData: Array,
        colors: Array,
        redius:Array,
        name: String,
        height: {
          type: String,
          default: '550px'
        }
    },
    data () {
      return {
        pieData: [],
        title:this.name
      }
    },
    mounted() {
      this.drawLine();
    },
    methods:{
      getChartData () {
        this.$nextTick(function () {
          this.drawLine()
        });
      },
      drawLine () {
           // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.main);
        const colors = this.$props.colors ? param => this.$props.colors[param.dataIndex] : '自适应'
        myChart.off('click')
        // 指定图表的配置项和数据
        let option = {
          series: [
            {
              name: this.name,
              type: 'pie',
              radius: this.redius || [50,150],
              center: ['50%', '50%'],
              roseType: 'radius',
              top: 20,
              data:this.chartData,
              label:{
                normal:{
                  formatter: '{b}\n {d}%',//\n实现换行
                  textStyle: {
                    color: '#fff',
                    fontSize: 24,  // 改变标示文字的颜色
                    fontFamily: 'Alibaba PuHuiTi',
                    fontWeight: 400
                  }
                }
              },
              labelLine:{
                lineStyle: {
                  color: '#314A61',
                  width: 2
                }
            },
            itemStyle: {
                color: colors
              }
          }
        ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        //图上添加点击事件
        let that = this
        function pieConsole(param) {
           that.$emit('up', 4)
        }
        myChart.on("click", pieConsole);
      }
    },
    watch:{
      chartData:{
        handler:function(oldValue,newValue){
          this.getChartData()
        },
        immediate:true,
        deep:true
      }
    },
  }
</script>
<style lang="scss" scoped>
.pie-title{
  color: #B1D2E9;
  font-size: 36px;
  font-family: Alibaba PuHuiTi;
  font-weight: 400;
  padding-top: 30px;
}
</style>