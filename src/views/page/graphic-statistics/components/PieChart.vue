<template>
  <div style="width: 100%">
    <div>{{title}}</div>
    <div ref="main" style="height: 550px"></div>
  </div>
</template>
<script>
  export default {
    props: {
        chartData: Array,
        colors: Array,
        redius:Array,
        name: String
    },
    data () {
      return {
        pieData: [],
        title:this.name
      }
    },
    created () {
      this.getChartData()
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
        // 指定图表的配置项和数据
        let option = {
          series: [
            {
              name: this.name,
              type: 'pie',
              radius: this.redius,
              center: ['50%', '50%'],
              roseType: 'radius',
              data:this.chartData,
              label:{
                normal:{
                  formatter: '{b}\n {d}%',//\n实现换行
                  textStyle: {
                    color: '#fff',
                    fontSize: 24  // 改变标示文字的颜色
                  }
                }
              },
              labelLine:{
                normal:{
                    length:5
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
    mounted() {
      // this.drawLine();
    }
  }
</script>
