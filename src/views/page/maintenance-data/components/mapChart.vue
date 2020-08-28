<template>
  <div class="mapChart">
    <div ref="main" style="width: 100%;height: 840px"></div>
  </div>
</template>
<script>
  export default {
    props: {
      chartData: Object,
    },
    data () {
      return {
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
      drawLine() {
     
     //引入市区json文件
     var uploadedDataURL = require('../../../../mock/dongguan.json');

    //  $.getJSON(uploadedDataURL, function(geoJson) {
         this.$echarts.registerMap('dongguan', uploadedDataURL);
         let myChart = this.$echarts.init(this.$refs.main);
        //  myChart.hideLoading();
         //地理位置信息
         var geoCoordMap = {
            '石龙镇': [113.880838, 23.112166],
            '石排镇': [113.946909, 23.09603],
            '茶山镇': [113.876358, 23.083319],
            '企石镇': [114.028973, 23.079075],
            '桥头镇': [114.083354, 23.03425],
            '东坑镇': [113.940211, 23.001534],
            '横沥镇': [113.972248, 23.024481],
            '常平镇':[113.998921, 22.981577],
            '虎门镇': [113.678872, 22.820851],
            '长安镇': [113.808855, 22.821128]
         };
         //数据信息
         var data = [{
                 name: "石龙镇",
                 value: 199,
                 color: '#aaa'
             },
             {
                 name: "石排镇",
                 value: 42,
                 color: '#00f'
             },
             {
                 name: "茶山镇",
                 value: 102,
                 color: '#ff0'
             },
             {
                 name: "企石镇",
                 value: 81,
                 color: '#f0f'
             },
             {
                 name: "桥头镇",
                 value: 47,
                 color: '#000'
             },
             {
                 name: "东坑镇",
                 value: 67,
                 color: '#ffo'
             },
             {
                 name: "横沥镇",
                 value: 82,
                 color: '#00f'
             },
             {
                 name: "常平镇",
                 value: 123,
                 color: '#f0f'
             },
             {
                 name: "虎门镇",
                 value: 24,
                 color: '#ddd'
             },
             {
                 name: "长安镇",
                 value: 92,
                 color: '#fff'
             }
         ];
        //  var max = 480,
        //      min = 9; // todo 
        //  var maxSize4Pin = 100,
        //      minSize4Pin = 20;
         var convertData = function(data) {
             var res = [];
             for (var i = 0; i < data.length; i++) {
                 var geoCoord = geoCoordMap[data[i].name];
                 if (geoCoord) {
                     res.push({
                         name: data[i].name,
                         value: geoCoord.concat(data[i].value),
                         color: data[i].color
                     });
                 }
             }
             return res;
         };
         let option = {
             backgroundColor: '#12034B',
             tooltip: {
                 trigger: 'item',
                //  formatter: function(params) {
                //      if (typeof(params.value)[2] == "undefined") {
                //          return params.name + '<br>挂号量 : ' + params.value + '<br>缴费量：' + params.data.value2
                //      } else {
                //          return params.name + '<br>挂号量 : ' + params.value[2] + '<br>缴费量：' + params.value[2]
                //      }
                //  }
             },
             geo: {
                 map: 'dongguan',
                 show: true,
                 roam: true,
                 center: [113.746262, 23.046237],
                 zoom: 10, //当前视角缩放比例
                 label: {
                     normal: {
                         show: false
                     },
                     emphasis: {
                         show: false,
                     }
                 },
                 itemStyle: {
                     normal: {
                         areaColor: '#1C2E6C',
                         borderColor: '#4895FE', //线
                         // borderWidth: 5,
                         shadowColor: '#092f8f', //外发光
                         shadowBlur: 20
                     },
                     emphasis: {
                         areaColor: '#3658B9', //悬浮区背景
                     }
                 }
             },
             series: [{
                     type: 'map',
                     map: 'dongguan',
                     geoIndex: 0,
                     aspectScale: 0.75, //长宽比
                     showLegendSymbol: false, // 存在legend时显示
                     label: {
                         normal: {
                             show: false
                         },
                         emphasis: {
                             show: false,
                             textStyle: {
                                 color: '#fff'
                             }
                         }
                     },
                     roam: true,
                     itemStyle: {
                         normal: {
                             areaColor: '#031525',
                             borderColor: '#FFFFFF',
                         },
                         emphasis: {
                             areaColor: '#2B91B7'
                         }
                     },
                     animation: false,
                     data: data
                 },
                 {
                     name: 'map',
                     type: 'effectScatter',
                     coordinateSystem: 'geo',
                     data: convertData(data),
                     symbolSize: function(val) {
                         return val[2] / 10;
                     },
                     showEffectOn: 'render',
                     rippleEffect: {
                         brushType: 'stroke',
                     },
                     hoverAnimation: true,
                     label: {
                         normal: {
                             formatter: '{b}',
                             position: 'bottom',
                             distance: 5,
                             color: '#fff',
                             show: true
                         }
                     },
                     itemStyle: {
                         normal: {
                             color: function(val) {
                                 console.log(val)
                                 return val.data.color;
                             },
                             shadowBlur: 10,
                             shadowColor: '#333'
                         }
                     },
                     zlevel: 1
                 }
             ]
         };
         myChart.setOption(option);
    //  });
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
