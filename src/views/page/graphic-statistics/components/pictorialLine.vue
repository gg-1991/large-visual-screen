<template>
  <div>
    <div class="title">登录方式占比</div>
    <div :id="chartId" :style="{width: width, height: height}"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: {},
        noData: false
      }
    },
    props: {
      chartId: String,
      /**
       *  图表数据
       * {datax: ['name1','name2'], datay: [3434,34343]}
       */
      categoryData: Object,
      // 象形柱颜色方案 "blue","green"
      barColor: String,
      // y轴分割段数
      splitNumber: Number,
      // 单位描述
      unitText: String,
      // value值格式化类型 money || default
      valueType: String,
      //数据加载展示文字
      loadDataText: String,
      //根据不同页面展示图例
      showTooltip: Number,
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '410px'
      }
    },
    mounted() {
      this.init();
    },
    watch: {
      categoryData(val) {
        this.categoryData = val
        this.init();
      },
      loadDataText(val) {
        this.loadDataText = val
      }
    },
    methods: {
      init() {
        this.options = {}
        let category = this.categoryData || [];
        if (!category || !category.datax || category.datax.length === 0) {
          this.noData = true
          return
        }
        this.noData = false
        let areaColor = {
          maxColor: '#5ED0FA',
          mixColor: '#3484F7'
        }
        let options = {
          title: {
            left: 5,
            text: '',
            subtext: this.unitText || '单位：%',
            textStyle:{
              color: '#B2D3EA',
              fontSize: 36
            },
            subtextStyle: {
              fontWeight: 400,
              color: '#6884A0',
              fontSize: 24
            },
            padding: 33
          },
          grid: {
            top:'20%',
            left: 66,
            right: '3%',
            bottom: 25,
            containLabel: true
          },
          tooltip: {
            show: false,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            textStyle: {
              fontSize: 24
            }
            // formatter: function (prams) {
            //   if (that.showTooltip === 1) {
            //     let params = prams[0].name + ': ' + prams[0].data
            //     return that.$utils.formatParamsStyle(params, '</br>', 12, 0, 0)
            //   } else if (that.showTooltip === 2) {
            //     let html = ''
            //     let detail = that.categoryData.detail[prams[0].dataIndex]
            //     for (let i = 0; i < detail.length; i++) {
            //       html += `<div>${detail[i].ORGNAME}：${detail[i].TOTAL}人</div>`
            //     }
            //     return html
            //   } else {
            //     let params = prams[0].name + ': ' + utils.formatMoney(prams[0].data)
            //     return that.$utils.formatParamsStyle(params, '</br>', 12, 0, 0)
            //   }
            // }
          },
          xAxis: {
            max: 4,
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#E5E5E5',
                fontSize: 24,
                fontWeight: 400,
                fontFamily: 'Alibaba PuHuiTi'
              },
              // fontSize: 24,
              // color: '#E5E5E5'
              // formatter: function (params) {
              //   return that.$utils.formatParamsStyle(params, '\n', 5, 2, 10)
              // }
            },
            boundaryGap: true,
            data: category.datax,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
          },
          yAxis: [{
            splitNumber: this.splitNumber || 5,
            
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#324A61',
                width: 1
              }
            },
            axisLabel: {
              textStyle: {
                color: '#67849F',
                fontSize: 24,
                fontWeight: 400,
                fontFamily: 'DINPro'
              }
            },
            splitArea: {
              areaStyle: {
                color: 'rgba(255,255,255,.5)'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#324A61"
              }
            },
          }
          ],
          series: [{
            smooth: true,
            name: '占比',
            type: 'pictorialBar',
            barCategoryGap: '20%',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            label: {
              show: true,
              position: 'top',
              distance: 12,
              color: '#E5E5E5',
              fontWeight: 500,
              fontSize: 28,
              formatter: function (prams) {
                return prams.data + '%'
              }
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    // 0%处的颜色
                    color: areaColor.mixColor
                  }, {
                    offset: 1,
                    // 100%处的颜色
                    color: areaColor.maxColor
                  }],
                  // 缺省为false
                  global: false
                }
              },
              emphasis: {
                opacity: 1
              }
            },
            data: category.datay,
            z: 10
          }]
        };
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById(this.chartId));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(options);
        // myChart.getDom().style.height = (260 * 92 / 100) + "px";
        // myChart.getDom().style.width = (document.documentElement.offsetWidth * 96 / 100) + 'px'
        // myChart.resize();
      }
    }
  }
</script>
<style lang="scss" scoped>
  .title {
    font-size: 36px;
    color: #B2D3EA;
    height: 40px;
  }
</style>