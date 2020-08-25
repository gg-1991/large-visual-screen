<template>
  <div class="barChart">
    <div ref="main" style="width: 100%;height: 620px"></div>
  </div>
</template>
<script>
  export default {
    props: {
        chartData: Object,
    },
    data () {
      return {
        chartXdata: [],
        chartYdata: {
          'liang': [],
          'jine': []
        }
      }
    },
    created () {
      this.getChartData()
    },
    methods:{
      getChartData () {
        this.chartXdata = []
        this.chartYdata = {
          'liang': [],
          'jine': []
        }
        this.chartData.forEach(item=> {
          this.chartXdata.push(item.name)
          this.chartYdata.liang = item.valueL
          this.chartYdata.jine = item.valueE
        })
        this.$nextTick(function () {
          this.drawLine()
        });
      },
      drawLine () {
           // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.main);
        // 指定图表的配置项和数据
        let option = {
          legend: {
            data: ['总交易量', '总交易额'],
            itemGap:30,
            itemWidth: 55,
            itemHeight:20,
            textStyle:{
              color:'#B1D2E9',
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
                    color:'#67849F'
                  },
                },
                // X轴主线
                axisLine:{
                  lineStyle:{
                      color:'#67849F',
                      width:1,
                  }
              },
              axisTick: {
                  show:false
              },
              data: this.chartXdata
          },
          yAxis:[
            {
              type: 'value',
              name : '单位：人次',
              axisLabel:{
                  //y轴刻度标签字体颜色大小
                  textStyle:{
                    fontSize: 24,
                    color:'#4492FF'
                  },

                },
                // Y轴单位和样式
                nameTextStyle: {
                  color: ['#4492FF'],
                  fontSize:24
                },
                axisLine:{
                  lineStyle:{
                      color:'#4492FF',
                      width:1,//这里是为了突出显示加上的
                  }
                },
               splitLine: {
                  lineStyle: {
                    color:['#4492FF'],
                    lineStyle:'dashed',
                    opacity: 0.2
                  }
                },
                axisTick: {
                  inside:true
                },

           },
           {
              type: 'value',
              name : '单位：元',
               axisLabel:{
                  //y轴刻度标签字体颜色大小
                  textStyle:{
                    fontSize: 24,
                    color:'#2CDFFF'
                  },

                },
                splitLine: {
                  show:false
                },
                // Y轴单位和样式
                nameTextStyle: {
                  color: ['#2CDFFF'],
                  fontSize:24
                },
                axisLine:{
                  lineStyle:{
                      color:'#2CDFFF',
                      width:1,//这里是为了突出显示加上的
                  }
                },
                axisTick: {
                  inside:true
                },

           }
          ],
          series: [
              {
                  name: '总交易量',
                  type: 'bar',
                  color:'#4492FF',
                  barWidth : 30,
                   // 点标注
                  label : {
                    normal : {
                      show : true,
                      position: 'top'
                    }
                  },
                  yAxisIndex: 0,
                  data: this.chartYdata.liang
              },
              {
                  name: '总交易额',
                  type: 'bar',
                  color:'#2CDFFF',
                  barWidth : 30,
                  // 点标注
                  label : {
                    normal : {
                      show : true,
                      position: 'top'
                    }
                  },
                  yAxisIndex: 1,
                  data: this.chartYdata.jine
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
