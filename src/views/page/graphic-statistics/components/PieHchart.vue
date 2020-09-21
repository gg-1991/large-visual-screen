<template>
  <div style="width: 100%">
    <div v-if="chartData.length === 0">暂无数据</div>
    <div v-else>
      <div class="pie-title">{{title}}</div>
     <div ref="main" :style="{ height: height }"></div>
    </div>
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
        title:this.name,
      }
    },
    mounted() {
      this.drawLine();
    },
    methods:{
      getChartData () {
        this.$nextTick( () => {
          this.drawLine()
        });
      },
      drawLine () {
        let that = this
        Highcharts.chart(this.$refs.main, {
          chart: {
              type: 'variablepie',
              backgroundColor: 'rgba(0,0,0,0)',
              shadow:false,
              margin:10,
          },
          title: {
            text: ' '
          },
          tooltip: {
            enabled: false,
          },
          exporting: {
            enabled:false
          },
          credits: {
            enabled:false
          },
          colors:this.colors,
          plotOptions: {
            variablepie: {
                innerSize: 100,
                depth: 45,
                events: {
                    click: function (e) {that.myCallback()}
                }
            }
          },
          series: [{
              minPointSize: 60,
              innerSize: '30%',
              zMin: 0,
              dataLabels: {
                distance: 30,
                enabled: true,
                formatter: function() {
                    return  this.point.name +'<br>' + this.percentage.toFixed(1) + '%';
                },
                style: {
                  fontSize:'24px',
                  color: '#fff'
                }
              },
              data: this.chartData
          }]
        })
      },
      myCallback() {
        this.$emit('up', 4)
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
  padding-top: 25px;
}
</style>