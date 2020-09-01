<template>
  <div class="mapChart">
    <div ref="main" style="width: 100%;height: 900px"></div>
  </div>
</template>
<script>
import { dgTownList } from '@/utils/map.js'
import { formatMoney } from '@/utils'
export default {
  props: {
    chartId: String,
    // chartData: Object,
    chartData: {
        type: Array,
        default: () => {
            return []
        }
    },
    type: String
  },
  data() {
    return {};
  },
  mounted() {
      this.drawLine()
  },
  methods: {
    getChartData() {
      this.$nextTick(function() {
        this.drawLine();
      });
    },
    drawLine() {
      if(this.chartData.length === 0) return
      const data = this.chartData
      let toolTipSymbol = {
        '1': "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACeUlEQVRIia2X32pTQRDGfzk5am0lRDFWRWttva2hF1J6ry/hq/kkBW9LUS+KSq/EGI0oJWI11lAlf2TKd8pxmU22aT9YOOyZnW9mdnZ2tvL02YAEVICaxgJwEci1zBT8BX4DPY3xNJX5lP9VYBFoTJC9oGEG3ZAhXWAfGM5CfA24I6Wngem8BVwHPgPfU4ktrHfl5VlgBt8HrgCdMPyZQ7pyDqRlNKSzMsljC209osCMXNa4CcwDI+AQ+Aa0NUbO2rqi+Mkjvqrk8GAh21BWh8bUNR4oo18AHyKe/wIOKIXasncp4qURPnFIPdQku+FsI+KolokXI4n2CGgmEIZoam2IXFzHxJVIMq3MSFqgKR0hjKuSKzyht2bQZkThPWCtZKwVizflxClh00m4Y848snerqkQhLHzrwdxtjV3gVfBvQbreBfO1TMcixLIzt+SQlrGuaKTomjfiOeeHt+cPJ5AWWEvUNZcV6R3gcqKCFBkvolXvrBGpPueKLHJ19Z25bgKxJ+PpGhrxkfPDu8reJhB7Mp4xR1nEorYz91FHJoZdyaTo6mcq7CHeq5UJYed0C/iiTmOg7y3nDCMdLWe+l4t4EFQvS64d4HHEc88zDztODhlXL1Nn4O1DS6VwVryOeGtc4+I47cuSEC+BvRmI9yKhH4jr5FocRoq8hXwbeB7JhRA9yW5HakGnCH15Xw8UBq/6tJSdq6q9jVJF6mtdW0kZKz7d8jENr8OOukOv7xrplglvmhT8kO4ThCVzLO9SqlQqutL5X3vrtTtj7fehOsNpr40YBvIyuaEvYAt+JjxhQpz5CWOwhVaZvgaPtkul69Rk/pzq0Qb8Ayl9l73159jiAAAAAElFTkSuQmCC",
        '2': "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACUUlEQVRIicWXX09TQRDFf71URTAEjQRjFCs+Y8ODGt7lQ/MJiPhA1PBkrPVPTEgJaIMNaqFmyLlkncy2ayXxJJvc7M7OmZmdnTvbuH0wogANYEFjHrgKNLVtCPwEvgN9jYlKJxHPAMvAUkI0CWZID9gHTqchvgXcA64UEnr8Aj4Dh9Fi5IWF9b68/BeYwQ+BG8AnH/4qIF29BNIUS9LZGOexhXYxo8CMbGncAeaAM+AYOAC6GmfB3kVF8eOFh8kZ35RlESxkz5TV42AZ/QJ4n5HpAEckobbsXcl4aYSbBaRIZlN7/DEijpmUeDmTaE+AdgGhR1t7PZriOiduZJJpdUrSGu3M0RlXo6nweG/NoI2MwgfAWmKsFYvXaeIk2AgS7pyzmTm7RyqNHha+dTd3V2MXeOnW5qXrrZtfqHQtPFrB3EpAmmJd0SjRNWfEs8FCdOaPx5DWWCvUNVvV6e1wvVBBiUwU0ZnorpGpPpeKKvPrGgRzvQLiSCbSdWrEJ8FC9Ct7U0AcyUTGnFQZi7rB3AddmRx2JVOia1CpsHu8UyvjYfd0C/iiTmOo763gDiMdnWC+3xTx0FUvS65t4HnG88izCNtBDhlXv1JnEJ1DR6VwWrzKeGtco/o67csSjx1gbwrivUzoh+IqbgRs/mlhI7CT8RQ1CIeeGNXjXIWqVPBbkqkr0kDh6yopc8Wnl2t9SJq9XN81Lb4qChdkvmSOJFBSpUrR86Rk2p2RQnKszrD0BeExVD9d3NDXsA3f/scT5g8592i7lvxOTfmPv3q0Ab8BMv2Xf8NWNGoAAAAASUVORK5CYII=",
        '3': "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACd0lEQVRIia2XX2tTQRDFf7m5am0lRDFWRWttfa2hD1L6ro9+VD9AwddS1Iei0icxRiNKiViNNVTJH5lybrkus8k27YGFy97ZOTOzs7OzlWdPxySgAtQ0FoCLQK5lA+Av8BvoaUxVmk/5XwUWgcYE2QsaZtANGdIF9oHhLMTXgDtSehqYzlvAdeAz8D2V2MJ6V16eBWbwfeAK0AnDnzmkK+dAWkZDOiuTPLbQ1iMKzMhljZvAPDACDoFvQFtj5KytK4qfPOKrSg4PFrINZXVoTF3jgTL6BfAh4vkv4IBSqC17lyJeGuETh9RDTbIbzjYijmqZeDGSaI+AZgJhiKbWhsjFdUxciSTTyoykBZrSEcK4KrnCE3prBm1GFN4D1krGWrF4U06cEjadhDvmzCN7t6pKFMLCtx7M3dbYBV4F/xak610wX8t0LEIsO3NLDmkZ64pGiq55I55zfnh7/nACaYG1RF1zWZHeAS4nKkiR8SJa9c4akepzrsgiV1ffmesmEHsynq6hER85P7yr7G0CsSfjGXOURSxqO3MfdWRi2JVMiq5+psIe4r1amRB2TreAL+o0Bvrecs4w0tFy5nu5iAdB9bLk2gEeRzz3PPOw4+SQcfUydQbePrRUCmfF64i3xjUujtO+LAnxEtibgXgvEvqBuE6uxWGkyFvIt4HnkVwI0ZPsdqQWdIrQl/f1QGHwqk9L2bmq2tsoVaS+1rWVlLHi0y0f0/A67Kg79PqukW6Z8KZJwQ/pPkFYMsfyLqVKpaIrnf+1t167M9Z+H6oznPbaiGEgL5Mb+gK24GfCEybEmZ8wBltolelr8Gi7VLpOTebPqR5twD+bLZfFXZl2nAAAAABJRU5ErkJggg==",
        '4': "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACeElEQVRIia2XX2tTQRDFf7m5am0lRDFWRWttfa2hD1L64Jt+Fb9jwddS1Iei0icxRiNKiViNNVTJH5lybrkus8k27YGFy97ZOTOzs7OzlfHjZySgAtQ0FoCLQK5lA+Av8BvoaYynqcyn/K8Ci0BjguwFDTPohgzpAvvAcBbia8AdKT0NTOct4DrwGfieSmxhvSsvzwIz+D5wBeiE4c8c0pVzIC2jIZ2VSR5baOsRBWbkssZNYB4YAYfAN6CtMXLW1hXFTx7xVSWHBwvZhrI6NKau8UAZ/QL4EPH8F3BAKdSWvUsRL43wqUPqoSbZDWcbEUe1TLwYSbRHQDOBMERTa0Pk4jomrkSSaWVG0gJN6QhhXJVc4Qm9NYM2IwrvAWslY61YvCknTgmbTsIdc+aRvVtVJQph4VsP5m5r7AKvgn8L0vUumK9lOhYhlp25JYe0jHVFI0XXvBHPOT+8PX84gbTAWqKuuaxI7wCXExWkyHgRrXpnjUj1OVdkkaur78x1E4g9GU/X0IiPnB/eVfY2gdiT8Yw5yiIWtZ25jzoyMexKJkVXP1NhD/FerUwIO6dbwBd1GgN9bzlnGOloOfO9XMSDoHpZcu0ATyKee5552HFyyLh6mToDbx9aKoWz4nXEW+MaF8dpX5aEeAnszUC8Fwn9QFwn1+IwUuQt5NvA80guhOhJdjtSCzpF6Mv7eqAweNWnpexcVe1tlCpSX+vaSspY8emWj2l4HXbUHXp910i3THjTpOCHdJ8gLJljeZdSpVLRlc7/2luv3Rlrvw/VGU57bcQwkJfJDX0BW/Az4QkT4sxPGIMttMr0NXi0XSpdpybz51SPNuAfytmXbtkuLp8AAAAASUVORK5CYII="
      }
      //引入市区json文件
      var dgMapJson = require("../../../../assets/map/dgMap.json");
      this.$echarts.registerMap("dongguan", dgMapJson);
      let myChart = this.$echarts.init(this.$refs.main);
      //地理位置信息
      const geoCoordMap = dgTownList
      let convertData = (data) => {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
              symbol: toolTipSymbol[data[i].area],
              paymentTotalAmt: formatMoney(data[i].value),
              registrationCount: formatMoney(data[i].subValue),
              officeCode: data[i].officeCode
            });
          }
        }
        return res;
      };
      let option = {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "item",
          backgroundColor: "#4D5663",
          padding: 24,
          textStyle: {
            color: "#FFFFFF",
            fontWeight: 400,
            fontFamily: "Alibaba PuHuiTi",
            fontSize: 28
          },
          extraCssText: "width: 300px;text-align: left;opacity: 0.9;",
          formatter: params => {
            if(!params.data) return ''
            let res = "";
            let name = params.data.name;
            let value = formatMoney(params.data.value);
            let subValue = formatMoney(params.data.subValue);
            if(this.type === 'yunwei'){
              res = `<span>${name}</span> <br/> <span>运行数量: ${subValue}台</span><br/> <span>总数量: ${value}台</span>`;
            } else {
              res = `<span>${name}</span> <br/> <span>挂号量: ${subValue}</span><br/> <span>缴费量: ${value}元</span>`;
            }
            return res;
          }
        },
        geo: {
          map: "dongguan",
          top: 20,
          left: 70,
          bottom: 20,
          right: 10,
          show: true,
          roam: false,
          center: [113.896808, 22.903386],
          zoom: 0, //当前视角缩放比例
          aspectScale: 1,
          scaleLimit: {
              min: 1,
              max: 1
          },
          label: {
            normal: {
              show: false,
              color: "#fff",
              fontWeight: 400,
              fontSize: 20
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
                areaColor: "transparent",
            //   areaColor: "#1C2E6C",
              borderColor: "#4895FE", //线
              borderWidth: 0,
              shadowColor: "#092f8f", //外发光
              shadowBlur: 20
            },
            emphasis: {
              areaColor: "#3658B9" //悬浮区背景
            }
          }
        },
        series: [
          {
            type: "map",
            map: "dongguan",
            geoIndex: 0,
            aspectScale: 0.9, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#FFFFFF"
              },
              emphasis: {
                areaColor: "#3658B9"
              }
            },
            animation: false,
            data: data
          },
          {
            name: "map",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: 15,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                position: "bottom",
                distance: 5,
                color: "#fff",
                fontSize: 20,
                fontWeight: 400,
                fontFamily: 'Alibaba PuHuiTi'
              }
            },
            //  itemStyle: {
            //      normal: {
            //          color: function(val) {
            //              console.log(val)
            //              return val.data.color;
            //          },
            //          shadowBlur: 10,
            //          shadowColor: '#333'
            //      }
            //  },
            zlevel: 1
          }
        ]
      };
      myChart.setOption(option);
      myChart.on('click', (params) => {
        console.log(params);
        this.$emit('mapClick', params.data)
      });
    }
  },
  watch: {
    chartData(){
        this.getChartData()
    } 
  }
  
};
</script>
<style lang="scss" scoped>
.mapChart{
    background: url(../../../../assets/images/map_bg.png) no-repeat center;
}
</style>