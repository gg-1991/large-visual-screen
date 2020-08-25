<template>
  <div class="lineChart">
    <div ref="main" style="width: 100%;height: 610px"></div>
  </div>
</template>
<script>
  export default {
    props: {
      unit:String,
      chartData: Object,
      isMouth:Boolean
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
          this.chartXdata.push(item.time)
          this.chartYdata['liang'].push(item.valueL)
          this.chartYdata['jine'].push(item.valueE)
        })
        this.$nextTick(function () {
          this.drawLine()
        });
      },
      drawLine () {
        let that = this
           // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.main);
        // 指定图表的配置项和数据
        let option = {
           // 提示框
            tooltip: {
              trigger: 'axis',
              show: this.isMouth,
              padding: 10,
              triggerOn:'mousemove|click',
              /*formatter: '{b0}<br/><br/>{a0}:{c0}<br/><br/>{a1}:{c1}' + this.unit,*/
              formatter:function(params){
                  let str ='<span>' + params[0].name + '</span><br>'
                  for(var i=0;i<params.length;i++) {
                    if(i == params.length-1) {
                      str += params[i].marker + " " + params[i].seriesName + ":" + params[i].data + that.unit
                    } else {
                      str += params[i].marker + " " + params[i].seriesName + ":" + params[i].data + '<br>'
                    }
                  }
                  return str
               },
              textStyle:{
                align:'left'
              }
            },
            // 距离边框距离
            grid: {
              left: '3%',
              right: '4%',
              bottom: '1%',
              containLabel: true
           },
          xAxis: {
              boundaryGap: false,
              type: 'category',
              axisLabel:{
                  margin:10,
                  //x轴刻度标签字体颜色大小
                  textStyle:{
                    fontSize: 24,
                    color:'#e5e5e5'
                  },
                },
              // X轴分割线
              splitLine: {
                show:true,
                lineStyle: {
                  color:['#314A61'],
                  lineStyle:'dashed',
                  opacity: 0.2
                }
              },
              // X轴主线
              axisLine:{
                lineStyle:{
                    color:'#314A61',
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
                    color:'#67849F'
                  },

                },
                // Y轴单位和样式
                nameTextStyle: {
                  color: ['#314A61'],
                  fontSize:24
                },
                axisLine:{
                  lineStyle:{
                      color:'#314A61',
                      width:1,//这里是为了突出显示加上的
                  }
                },
               splitLine: {
                  lineStyle: {
                    color:['#314A61'],
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
                    color:'#67849F'
                  },

                },
                splitLine: {
                  show:false
                },
                // Y轴单位和样式
                nameTextStyle: {
                  color: ['#314A61'],
                  fontSize:24
                },
                axisLine:{
                  lineStyle:{
                      color:'#314A61',
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
                  name: '交易量',
                  type: 'line',
                  color:'#4492FF',
                   // 是否平滑显示
                  smooth: false,
                  symbolSize: 10,   //设定实心点的大小
                   // 点标注
                  label : {
                    normal : {
                      show : !this.isMouth,
                      position: 'top',
                      fontSize:20
                    }
                  },
                  yAxisIndex: 0,
                  data: this.chartYdata.liang
              },
              {
                  name: '交易额',
                  type: 'line',
                  color:'#B945FF',
                  smooth: false,
                  symbolSize: 10,   //设定实心点的大小
                  // 点标注
                  label : {
                    normal : {
                      show : true,
                      position: 'top',
                      fontSize:20
                    }
                  },
                  yAxisIndex: 1,
                  data: this.chartYdata.jine
              }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        setTimeout(function () {
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex:0 ,//第几条series
            dataIndex: 0,//第几个tooltip
          });
        },500)
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
