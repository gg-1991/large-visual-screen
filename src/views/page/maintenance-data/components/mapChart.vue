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
     let myChart = this.$echarts.init(this.$refs.main);
     //引入市区json文件
     var uploadedDataURL = "/asset/get/s/data-1597452450339-dQm5JP9rx.json";


     myChart.showLoading();
     $.getJSON(uploadedDataURL, function(geoJson) {
         echarts.registerMap('china', geoJson);
         myChart.hideLoading();
         //地理位置信息
         var geoCoordMap = {
             '遂平县': [114.015819, 33.150944],
             '上蔡县': [114.276256, 33.267906],
             '西平县': [114.022143, 33.394355],
             "驿城区": [114.006045, 32.978599],
             '确山县': [114.033641, 32.810768],
             "泌阳县": [113.335694, 32.731107],
             "汝南县": [114.375141, 33.016389],
             "正阳县": [114.398138, 32.615372],
             "平舆县": [114.629254, 32.969876],
             "新蔡县": [114.979952, 32.752487]
         };
         //数据信息
         var data = [{
                 name: "遂平县",
                 value: 199,
                 value2: 222,
                 color: '#aaa'
             },
             {
                 name: "上蔡县",
                 value: 42,
                 value2: 222,
                 color: '#00f'
             },
             {
                 name: "西平县",
                 value: 102,
                 value2: 222,
                 color: '#ff0'
             },
             {
                 name: "驿城区",
                 value: 81,
                 value2: 222,
                 color: '#f0f'
             },
             {
                 name: "确山县",
                 value: 47,
                 value2: 222,
                 color: '#000'
             },
             {
                 name: "泌阳县",
                 value: 67,
                 value2: 222,
                 color: '#ffo'
             },
             {
                 name: "汝南县",
                 value: 82,
                 value2: 222,
                 color: '#00f'
             },
             {
                 name: "正阳县",
                 value: 123,
                 value2: 222,
                 color: '#f0f'
             },
             {
                 name: "平舆县",
                 value: 24,
                 value2: 222,
                 color: '#ddd'
             },
             {
                 name: "新蔡县",
                 value: 92,
                 value2: 222,
                 color: '#fff'
             }
         ];
         var max = 480,
             min = 9; // todo 
         var maxSize4Pin = 100,
             minSize4Pin = 20;
         var convertData = function(data) {
             var res = [];
             for (var i = 0; i < data.length; i++) {
                 var geoCoord = geoCoordMap[data[i].name];
                 if (geoCoord) {
                     res.push({
                         name: data[i].name,
                         value: geoCoord.concat(data[i].value).concat(data[i].value2),
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
                 formatter: function(params) {
                     console.log(params)
                     if (typeof(params.value)[2] == "undefined") {
                         return params.name + '<br>挂号量 : ' + params.value + '<br>缴费量：' + params.data.value2
                     } else {
                         return params.name + '<br>挂号量 : ' + params.value[2] + '<br>缴费量：' + params.value[2]
                     }
                 }
             },
             geo: {
                 map: 'china',
                 show: true,
                 roam: true,
                 center: [114.006045, 32.978599],
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
                     map: 'china',
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
     });
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
