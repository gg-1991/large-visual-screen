<template>
  <div class="lineChart">
    <div ref="main" style="width: 100%;height: 550px"></div>
  </div>
</template>
<script>
  export default {
    props: {
        title: String,
        chartData:Array,
        colors: Array,
        valueColor:Array,
        unit:String,
        isMouth:Boolean,
    },
    data () {
      return {
        // chartData: this.data,
        chartXdata: [],
        chartYdata: []
      }
    },
    created () {
     this.getChartData()
    },
    methods:{
      getChartData () {
        this.chartXdata = []
        this.chartYdata = []
        this.chartData.forEach(item=> {
          this.chartXdata.push(item.name)
          this.chartYdata.push(item.value)
        })
      },
      drawLine () {
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
              formatter: '{b0}<br/><br/>' + this.title + ': {c0}' + this.unit,
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
                type: 'category',
                boundaryGap: false,
                axisLabel:{
                  margin:10,
                  //x轴刻度标签字体颜色大小
                  textStyle:{
                    fontSize: 24,
                    color:'#E5E5E5'
                  },
                },
                // X轴分割线
                splitLine: {
                  show:true,
                  lineStyle: {
                    color:this.valueColor,
                    lineStyle:'dashed',
                    opacity: 0.1
                  }
                },
                // X轴主线
                axisLine:{
                  lineStyle:{
                      color:'#314A61',
                      width:1,
                  }
                },
                // 刻度
                axisTick: {
                  show:false
                },
                data: this.chartXdata
            },
            // Y轴
            yAxis: {
                type: 'value',
                name : this.unit,
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
            },
            series: [{
              data: this.chartYdata,
              type: 'line',
              // 是否平滑显示
              smooth: true,
              symbolSize: 10,   //设定实心点的大小
              // 点标注
              label : {
                normal : {
                  show : !this.isMouth,
                  position: 'top',
                  fontSize:20
                }
              },
              // 填充面积样式
              areaStyle:{
                normal:{
                    //右，下，左，上
                    color:new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                        {
                            offset:0,
                            color:this.colors[0]
                        },
                        {
                            offset:1,
                            color:this.colors[1]
                        }
                    ],false)
                }
              },
              color:this.valueColor,
              itemStyle: {
                normal: {
                  barBorderRadius: 5,
                }
              },
            }]
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
    mounted() {
      this.drawLine();
    },
    watch:{
      chartData:{
        handler:function(newValue,oldValue){
          this.getChartData()
          this.$nextTick(() => {
            this.drawLine();
          })
        },
        immediate:true,
        deep:true

     }
    },
 }
</script>