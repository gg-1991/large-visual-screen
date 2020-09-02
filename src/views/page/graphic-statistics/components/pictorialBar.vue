<template>
  <div>
    <div v-show="!isChartVisible" class="no-data-text" :height="{height: height}">{{noDataText}}</div>
    <div :id="chartId" :style="{width: width, height: height}" v-show="isChartVisible"></div>
  </div>
</template>
<script>
import { formatMoney } from '@/utils'
  export default {
    data() {
      return {
        noDataText: '暂无数据',
        options: {},
      }
    },
    props: {
      // 图表ID
      chartId: String,
      categoryData: Array,
      // 进度条颜色方案
      barColor: String,
      // x轴分割段数
      splitNumber: Number,
      // 单位描述
      unitText: String,
      // value值格式化类型 money || default
      valueType: {
        type: String,
        default: 'money'
      },
      //数据加载展示文字
      loadDataText: String,
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '900px'
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
        this.noDataText = val
      }
    },
    computed: {
      isChartVisible() {
        return this.categoryData && this.categoryData.length > 0
      }
    },
    methods: {
      init(){
        this.noDataText = this.loadDataText || '暂无数据';
        const category = this.categoryData || [];
        if (category.length === 0) {
          return
        }
        const fillImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfAAAAAYCAYAAAAFzK+9AAADRklEQVR4nO2Yv2pUQRhHf2tAETSCWlrbptQXsdM+nVgoRLAXxFpBG8lTCGLhE/giCWglAfnkunf33pn7fXcmySbZgXPQQGYP8+e42cl18eznyXVJ7yQ9kXRD0qGkV5JOlLLynkpa9N7LK/ds8GzlWbA/+/8nnc/8c5g561ql181nmdeta5VeN58557XIs7BLcl6vi+dFXTbcz5Zfiv1s9T4o9Ft7hX5Fbzhr+v4L+k28oItZpRd1OVM/q+o3emvN9pt4QRezSm9YfLZL6GVd1ssW+iXnqO3ieVGXc/SzdOF5r6LfrCdbdxntbbZf4s30q/K6+Szzgn6ud1H9tuV+K3g7e/tv3kp6Iem2pJuSHku6JelrNsF7Sc97p/v7qJ/0Gx4eHh4eHt7let0T+C9Ju5l8JOm+M3Y3GzuWdO9KveE3rSNbeeZ4Wj8tpfOZfw4zZ12r9Lr5LPO6da3S6+azzOvWtciz1BsNJef1unhe1GXD/fqtF/v1Wyz2W3uFfkVvOKtU0W/iBV36J4iyF3U5Uz+r6jfKMNtv4gVdRk9L894wPtsl9LIuo6eqOu80XTwv6nKOftkT5LwXdbFKb7mp1NN8v+zJOuxX5XXzWeYF/VxPF9Rv5GVjW+V1F3jWec0i+347veFVy/5BpucwZT9DiZuc18xZ1yq9pZt6o0/Sojc9g/r/Fgs8S73RUHJer4vnKeiy4X791ov91lss9Evu55l+RU9JkGK/iSe/i3krep6C056pn1X1S99acb+JN3WX83mvel60olV6SruMPgPqvNN08Uv7Xc7Rz6JXPS9a0Sq9YVMLS4fDfpMJgn5VXjeft3Onn+tN3c30G3nZ91vlXQs2AwAAAFsMFzgAAECDcIEDAAA0CBc4AABAg3CBAwAANAgXOAAAQINwgQMAADQIFzgAAECDcIEDAAA0CBc4AABAg3CBAwAANAgXOAAAQINwgQMAADQIFzgAAECDcIEDAAA0CBc4AABAg3CBAwAANEh3gf92tn3kjB0zxhhjjDHGGGPbMdZd4B+dF744Y4fO2Gc8PDw8PDy8y/d29vbf/JC0K+mBpBNJHyS9lvQ3k79LuiPpoaQ/kj5JOsDDw8PDw8O7ZE86+Aek52Cwub9IfwAAAABJRU5ErkJggg=='
        const total = Math.max.apply(Math, category.map(item => {
          return item.value
        }))
        const datas = [];
        const yAxisDatas = []
        category.forEach(item => {
          datas.push(item.value);
          yAxisDatas.push(item.name)
        });
      const labelSetting = {
        normal: {
            show: true,
            position: 'right',
            offset: [20, 0],
            textStyle: {
              color: '#fff',
              fontSize: 28
            },
            formatter: (params) => {
              const formatdata = this.valueType === 'money' ? formatMoney(params.value) : params.value;
              return formatdata;
            },
            // align: 'right',
            // distance: -50
        }
      };
      var myChart = this.$echarts.init(document.getElementById(this.chartId));
      const option = {
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
          },
          grid: {
              containLabel: true,
              left: 55,
              bottom: 55
          },
          yAxis: {
              data: yAxisDatas,
              inverse: true,
              axisLine: {
                show: false
              },
              axisTick: {show: false},
              axisLabel: {
                  margin: 20,
                  fontSize: 28,
                  color: '#fff',
                  fontWeight: 400,
                  fontFamily: 'Alibaba PuHuiTi'
              },
              axisPointer: {
                  label: {
                      show: true,
                  }
              }
          },
          xAxis: {
            max: Math.ceil(total),
            show: true,
            position: 'top',
            offset: 10,
            splitNumber: this.splitNumber || 4,
            nameGap: 15,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#324A62',
              }
            },
            axisLabel: {
              color: '#6884A0',
              show: true,
              fontSize: 20,
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#324A62',
              }
            }
          },
          series: [
            {
              name: '挂号量',
              type: 'pictorialBar',
              symbolRepeat: false,
              barWidth: 24,
              barMinWidth: 24,
              barGap: '-100%',
              symbolSize: ['100%', '100%'],
              symbolClip: true,
              // barCategoryGap: '40%',
              symbolBoundingData: total,
              symbol: 'image://' + fillImg,
              data: category,
              label: labelSetting,
              animationEasing: "elasticOut"
          }]
        };
        myChart.setOption(option);
      }
      
    }
  }
</script>
<style lang="scss" scoped>
  .no-data-text {
    width: 100%;
    height: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
