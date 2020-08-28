<template>
  <div class="barChart">
    <div ref="main" :id="chartId" :style="{ width: '100%', height: height}"></div>
  </div>
</template>
<script>
  export default {
    props: {
      chartId: String,
      height: {
        type: String,
        default: '550px'
      },
      chartData: Array,
      transTypeChartXData: Array
    },
    mounted () {
      this.drawLine()
    },
    methods:{
      drawLine () {
        if(this.chartData.length === 0) return
        const legendData = []
        const seriesData = []
        this.chartData.forEach(item => {
          legendData.push(item.name)
          let obj = {
              name: item.name,
              type: 'bar',
              color: item.color,
              barWidth : 30,
              barGap: '90%',
                // 点标注
              label : {
                normal : {
                  show : true,
                  position: 'top',
                  formatter: '{c}%',
                  distance: 10,
                  color: '#E5E5E5',
                  fontSize: 28
                }
              },
              data: item.data
          }
          seriesData.push(obj)
        })
           // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.chartId));
        // 指定图表的配置项和数据
        let option = {
          legend: {
            data: legendData || [],
            itemGap:30,
            itemWidth: 55,
            itemHeight:20,
            textStyle:{
              color:'#B2D2EA',
              fontSize:24
            }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              boundaryGap: true,
              type: 'category',
              axisLabel:{
                  //x轴刻度标签字体颜色大小
                  textStyle:{
                    fontSize: 24,
                    color:'#E5E5E5'
                  },
                },
              // X轴主线
              axisLine:{
                show: true,
                lineStyle:{
                    color:'#324A61',
                    width:1,
                }
              },
              axisTick: {
                  show:false
              },
              data: this.transTypeChartXData
          },
          yAxis:{
              type: 'value',
              name : '单位：%',
              axisLabel:{
                  //y轴刻度标签字体颜色大小
                  textStyle:{
                    fontSize: 24,
                    color:'#67849F'
                  }
                },
                // Y轴单位和样式
                nameTextStyle: {
                  color: '#6884A0',
                  fontSize:24,
                  padding: [0,0,15,0]
                },
                axisLine:{
                  lineStyle:{
                      color:'#314A61',
                      width: 1//这里是为了突出显示加上的
                  }
                },
               splitLine: {
                  lineStyle: {
                    color: '#324A61'
                  }
                },
                
                axisTick: {
                  show: false
                },

           },
          series: seriesData
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
    watch:{
      chartData:{
        handler:() => {
          this.drawLine()
        },
        deep:true
      }
    }
  }
</script>
