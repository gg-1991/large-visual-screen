<template>
  <div class="container">
     <div class="title">
        <div class="list1">
          <img :src="titleLeftImg" alt="">
        </div>
        <div class="list2">
          <span class="list2_tj" @click="chengPage(1)">整体图形统计</span>
          <span class="list2_yw" @click="chengPage(2)">自助业务数据</span>
          <span class="list2_sj">运维数据</span>
        </div>
        <div class="list3">
          <img :src="titleRightImg" alt="">
        </div>
     </div>
     <div class="box">
       <div class="left_box">
          <div class="left_one">
            <img :src="leftUp" class="leftUp" alt="">
            <img :src="leftDown" class="leftDown" alt="">
            <img :src="rightUp" class="rightUp" alt="">
            <img :src="rightDown" class="rightDown" alt="">
            <chart-title title="当前所有终端运行情况"></chart-title>
            <div style="margin-top: 20px;margin-bottom: 20px; font-size: 36px;">当前所有终端运行状态</div>
            <div class="state">
               <div class="totle1">
                  <div class="img">
                     <img :src="zongliangImg" class="zongliang" alt="">
                  </div>
                  <div class="text">
                    <p style="font-size: 32px">当前正在运行终端总量</p>
                    <p style="text-align: left;">
                      <span class="span1">{{zonglangV}}</span>
                      <span class="span2">台</span>
                    </p>
                  </div>

               </div>
               <div class="totle2">
                 <div class="img">
                     <img :src="kaijiImg" class="zongliang" alt="">
                  </div>
                  <div class="text">
                    <p style="font-size: 32px">当前所有终端开机率</p>
                    <p style="text-align: left;">
                      <span class="span1">{{kaijiV}}</span>
                      <span class="span2">%</span>
                    </p>
                  </div>
               </div>
            </div>
            <div style="margin-top: 40px;margin-bottom: 28px;font-size: 36px;">当前 <span :class="{activeColor: text1 !=='全市'}">{{text1}}</span> 所有终端运行异常社区
            </div>
            <span class="back" v-if="showBackBtn" @click="seeAllCity">返回全市情况</span>
            <all-city :listData="allCityList" v-if="isAll"></all-city>
            <some-city :listData="someCityList" v-else></some-city>
          </div>
          <div class="left_two">
            <img :src="leftUp" class="leftUp" alt="">
            <img :src="leftDown" class="leftDown" alt="">
            <img :src="rightUp" class="rightUp" alt="">
            <img :src="rightDown" class="rightDown" alt="">
            <chart-title title="报修单近7天处理情况"></chart-title>
            <div class="set_table">
              <div class="table1" @click="seeTable(6)">
                <div class="img">
                  <img :src="fenpeiImg"  alt="">
                </div>
                <div class="title1">
                  平均分配耗时
                </div>
                <div class="time">
                  <div class="info" v-if="time1 !== 0">
                    <span>{{time1}}</span>天
                  </div>
                  <div class="info" v-if="time1_1 !== 0">
                    <span>{{time1_1}}</span>小时
                  </div>/单
                </div>
              </div>
              <div class="table2"  @click="seeTable(9)">
                 <div class="img">
                  <img :src="weixiuImg"  alt="">
                </div>
                <div class="title1">
                  平均维修耗时
                </div>
                <div class="time">
                   <div class="info" v-if="time2 !== 0">
                    <span>{{time2}}</span>天
                  </div>
                  <div class="info" v-if="time2_2 !== 0">
                    <span>{{time2_2}}</span>小时
                  </div>/单
                </div>
              </div>
              <div class="table3"  @click="seeTable(10)">
                 <div class="img">
                  <img :src="wanchengImg"  alt="">
                </div>
                <div class="title1">
                  平均整体完成耗时
                </div>
                <div class="time">
                   <div class="info" v-if="time3 !== 0">
                    <span>{{time3}}</span>天
                  </div>
                  <div class="info" v-if="time3_3 !== 0">
                    <span>{{time3_3}}</span>小时
                  </div>/单
                </div>
              </div>
            </div>
          </div>
       </div>
       <div class="right_box">
         <div class="right_top">
           <div class="right_top_left">
            <box-area :height="'1000px'">
              <div class="map-content">
                <div class="map-content-title">
                  <p>当前各乡镇/街道终端运行情况</p>
                </div>
                <map-chart :type="'yunwei'" :chartData="deviceRunStatusList" @mapClick="mapClick"></map-chart>
                <ul class="map-content-tip">
                  <li>
                    <img src="../../../assets/images/legend1.png" alt="">
                    <p>开机率90%以下</p>
                  </li>
                  <li>
                    <img src="../../../assets/images/legend2.png" alt="">
                    <p>开机率90-95%</p>
                  </li>
                  <li>
                    <img src="../../../assets/images/legend3.png" alt="">
                    <p>开机率95-99%</p>
                  </li>
                  <li>
                    <img src="../../../assets/images/legend4.png" alt="">
                    <p>开机率100%</p>
                  </li>
                </ul>
              </div>
            </box-area>
           </div>
            <div class="right_top_right">
              <box-area :height="'1000px'">
                <div class="map-content-title">
                  <p>近7天乡镇/街道故障率TOP10</p>
                </div>
                <progress-bar v-if="officeTroubleList.length > 0" :officeTroubleList="officeTroubleList"></progress-bar>
              </box-area>
            </div>
         </div>
         <div class="right_bottom">
            <box-area :height="'900px'">
              <div class="map-content-title">
                <p>近7天报修单情况</p>
              </div>
              <div class="right_bottom_box">
                <div class="pre_box">
                  <div style="margin-bottom: 40px; font-size: 36px">近7天报修单类型占比</div>
                  <pie-chart v-if="repairTypeData.length > 0" :chartData="repairTypeData" :colors="['#9218DC', '#8559FF', '#697EFF', '#4C97F7', '#50D4FF', '#67EBFF']" :redius='redius' name="" @up="seeTable"/>
                </div>
                <div class="line_box">
                  <div style="margin-bottom: 40px;font-size: 36px;">近7天报修单提交数量统计</div>
                  <line-chart unit="单位：个"  :isMouth="false"  :chartData="chartLineData" :valueColor="['#4492FF']" :colors="['#154871','#0B093C']"/>
                </div>
              </div>
            </box-area>
         </div>
       </div>
     </div>
    <table-pop :gridData="gridData" v-if="dialogTableVisible" v-model="dialogTableVisible" :type="type"></table-pop>
  </div>
</template>
<script>
import titleLeft from '@/assets/images/bg_lift.png'
import titleRight from '@/assets/images/bg_right.png'
import leftUp from '@/assets/images/border_lift_up.png'
import leftDown from '@/assets/images/border_lift_down.png'
import rightUp from '@/assets/images/border_right_up.png'
import rightDown from '@/assets/images/border_right_down.png'
import zongliang from '@/assets/images/icon5_zongliang.png'
import kaiji from '@/assets/images/icon6_kaijilv.png'
import fenpei from '@/assets/images/icon7_fenpei.png'
import weixiu from '@/assets/images/icon8_weixxiu.png'
import wancheng from '@/assets/images/icon9_wancheng.png'
import AllCity from './components/allCity'
import SomeCity from './components/someCity'
import MapChart from './components/mapChart'
import pieChart from '../graphic-statistics/components/PieChart'
import LineChart from '../business-data/components/lineChart'
import TablePop from './components/tablePop'
import {RunStatus,DisposeInfo,OrderRatio,OrderCreateCollect,DeviceExceInfo,RunStatusInfoList, OrderInfoList } from '@/api/maintenance.js'
import progressBar from './components/progressBar'
import { loadOfficeDeviceFaultRatio } from '@/api/graphic.js'
import boxArea from '@/components/box'
export default {
  name: "MaintenanceData",
  components: {
    AllCity,
    SomeCity,
    MapChart,
    pieChart,
    LineChart,
    TablePop,
    progressBar,
    boxArea
  },
  data() {
    return {
      day: 7,
      officeCode: '441900000000',
      officeTroubleList: [],
      deviceRunStatusList: [],
      leftUp:leftUp,
      leftDown:leftDown,
      rightDown:rightDown,
      rightUp:rightUp,
      titleLeftImg: titleLeft,
      titleRightImg: titleRight,
      zongliangImg:zongliang,
      kaijiImg: kaiji,
      fenpeiImg:fenpei,
      weixiuImg:weixiu,
      wanchengImg:wancheng,
      text1:'全市',
      showBackBtn: false,
      zonglangV: 0,
      kaijiV: 0,
      time1: 0,
      time1_1: 0,
      time2: 0,
      time2_2: 0,
      time3: 0,
      time3_3: 0,
      dialogTableVisible: false,
      type: 5,
      isAll:true,
      allCityList: [],
      someCityList: [],
      repairTypeData: [],
      chartLineData: [],
      redius: [80,250],
      gridData: [],
    }
  },
  created() {
    this.getData(this.day,this.officeCode)
  },
  mounted () {
  },
  methods: {
    getData (day,officeCode) {
      this.getDisposeInfoData(day,officeCode)
      this.getOrderRatioData(day, officeCode)
      this.getOrderCreateCollectData(day,officeCode)
      this.getDeviceExceInfoData(officeCode)
      this.getRunStatusInfoListData(officeCode)
      this.getDeviceRunStatus(officeCode)
      this.getOrderInfoListData(day)
      this.getTroubleDevList()
    },
     getDeviceExceInfoData (officeCode) {
      DeviceExceInfo({
        officeCode: officeCode
      }).then( data => {
        this.allCityList = []
        data.data.deviceExceList.forEach((item) => {
          let list = {}
          list.name = item.officeName.length > 15 ? item.officeName.slice(0,12) + '...' : item.officeName
          list.allName = item.officeName
          list.value = item.deviceExceCount
          this.allCityList.push(list)
        })
      })
    },
    // 查询具体地区数据
    getRunStatusInfoListData (officeCode) {
      RunStatusInfoList({
        officeCode: officeCode
      }).then( data => {
        this.someCityList = []
        data.data.deviceRundataStatusList.forEach((item) => {
          let list = {}
          list.name = item.officeName.length > 18 ? item.officeName.slice(0,15) + '...' : item.officeName
          list.allName = item.officeName
          list.value = item.deviceExceCount
          list.code = item.deviceNo
          list.deviceRunStatus = item.deviceRunStatus
          if (item.deviceRunStatus == '0') {
            list.value = '正常'
          } else if (item.deviceRunStatus == '2') {
            list.value = '暂停'
          } else if (item.deviceRunStatus == '3') {
            list.value = '异常'
          } else if (item.deviceRunStatus == '4') {
            list.value = '关机'
          } else{
            list.value = '重启'
          }
          this.someCityList.push(list)
        })
      })
    },
    getDisposeInfoData (day,officeCode) {
      DisposeInfo({
        officeCode: officeCode,
        day:day
      }).then( data => {
        this.time1 = data.data.allotTime > 24 ? Math.floor(data.data.allotTime / 24) : 0
        this.time1_1 = this.time1 === 0 ? data.data.allotTime : data.data.allotTime % 24
        this.time2 = data.data.maintenanceTime > 24 ? Math.floor(data.data.maintenanceTime / 24) : 0
        this.time2_2 = this.time2 === 0 ? data.data.maintenanceTime : data.data.maintenanceTime % 24
        this.time3 = data.data.completionTime > 24 ? Math.floor(data.data.completionTime / 24) : 0
        this.time3_3 = this.time3 === 0 ? data.data.completionTime : data.data.completionTime % 24
      })
    },
    getOrderRatioData (day, officeCode) {
      OrderRatio({
        officeCode: officeCode,
        day: day
      }).then( data => {
        this.repairTypeData = []
        data.data.maintenanceOrderRatioList.forEach((item) =>{
          let list = {}
          list.name = item.faultName
          list.value = item.faultCount
          this.repairTypeData.push(list)
        })
      })
    },
    getOrderCreateCollectData (day, officeCode) {
      OrderCreateCollect({
        officeCode: officeCode,
        day: day
      }).then( data => {
        this.chartLineData = []
        data.data.maintenanceOrderCollectList.forEach((item) =>{
          let list = {}
          list.name = item.dateDay
          list.value = item.count
          this.chartLineData.push(list)
        })
      })
    },

    getOrderInfoListData (day) {
      OrderInfoList({
        day: day
      }).then( data => {
        this.gridData = data.data.maintenanceOrderList || []
      })
    },
    chengPage (index) {
     if (index==1){
        this.$router.replace('/graphicStatistics')
      }else{
        this.$router.replace('/businessData')
      }
    },
    // 返回全市
    seeAllCity () {
      this.showBackBtn = false
      this.isAll = true
      this.text1 = '全市'
    },
    seeTable (index) {
      this.dialogTableVisible = true
      this.type = index
    },
    /**
     * 近7天乡镇/街道故障率TOP10
     */
    getTroubleDevList(){
      const params = {
        "officeCode": "441900000000",
        "day": this.day,
        "officeNumber": 10
      }
      loadOfficeDeviceFaultRatio(params).then(res => {
        if(res.code === 200){
          this.officeTroubleList = res.data.officeDeviceFaultRatioList || []
        }
      })
    },
    /**
     * 当前各乡镇/街道终端运行情况
     */
    getDeviceRunStatus(officeCode){
      const params = {
        officeCode: officeCode // 社保局机构编码
      }
      this.deviceRunStatusList = []
      RunStatus(params).then(res => {
        if(res.code === 200){
          const data = res.data.deviceRunStatusList
          this.zonglangV = res.data.deviceTotalRunCount
          this.kaijiV = res.data.deviceTotalRunRatio
          data.forEach(item => {
            let obj = {
              name: item.officeName,
              value: item.deviceCount,
              subValue: item.deviceRunCount,
              area: item.deviceRunArea,
              officeCode: item.officeCode
            }
            this.deviceRunStatusList.push(obj)
          })
        }
      })
    },
    /**
     * 点击地图事件
     */
    mapClick(data){
      console.log(data)
      if(!data) return
      //  officeCode : data.officeCode, 通过officeCode 联动左侧终端运行情况
      this.getRunStatusInfoListData(data.officeCode)
      this.showBackBtn = true
      this.isAll = false
      this.text1 = data.name
    }
  }
};
</script>
<style scoped lang="scss">
  /deep/ .el-carousel__button{
    width: 20px;
    height: 20px;
    border-radius: 20px;
  }
  .leftUp{
    position: absolute;
    left:0;
    top: 0;
  }
  .leftDown{
    position: absolute;
    left:0;
    bottom: 0;
  }
  .rightUp{
    position: absolute;
    top: 0;
    right:0;
  }
  .rightDown{
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .container{
    div.title{
      height: 100px;
      display:flex;
      justify-content:space-between;
      .list1{
        position: relative;
        img{
          height: 80px;
        }
      }
      .list2{
        flex:1;
        margin-left: 40px;
        margin-right: 40px;
        padding-top: 16px;
        .list2_tj{
          display: inline-block;
          width: 33%;
          height: 80px;
          background-image: url('../../../assets/images/button1_n.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
          line-height: 80px;
        }
        .list2_sj{
          display: inline-block;
          width: 33%;
          height: 80px;
          background-image: url('../../../assets/images/button1_h.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
          line-height: 80px;
          color: #fff;
        }
        .list2_yw{
          display: inline-block;
          width: 33%;
          height: 80px;
          background-image: url('../../../assets/images/button1_n.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
          line-height: 80px;
        }
      }
      .list3{
        img{
          height: 80px;
        }
      }
    }
    .box{
      margin:17px 37px 17px 37px;
      display:flex;
      .left_box{
        display:flex;
        flex-direction:column;
        width: 30%;
        margin-right:20px;
        .left_one{
          flex: 1;
          padding:40px;
          border:1px solid #387ADA;
          margin-bottom:20px;
          position: relative;
          .state{
            height: 200px;
            display:flex;
            justify-content:space-between;
            .totle1{
              flex: 1;
              background-color: #141949;
              margin-right:40px;
              padding:50px 20px;
              display:flex;
              .img{
                margin-right: 20px;
                position: relative;
                top: 5px;
              }
              .text{
                .span1{
                  font-size: 56px;
                  color: #2CDFFF;
                  margin-right: 20px;
                }
                .span2{
                  font-size: 20px;
                  color: #64819D;
                }
              }
            }
            .totle2{
              flex: 1;
              background-color: #141949;
              padding:50px 30px;
              display:flex;
               .img{
                margin-right: 20px;
                position: relative;
                top: 5px;
              }
              .text{
                .span1{
                  font-size: 56px;
                  color: #4492FF;
                  margin-right: 20px;
                }
                .span2{
                  font-size: 20px;
                  color: #64819D;
                }
              }
            }
          }
          .back{
            display: inline-block;
            height: 68px;
            width: 240px;
            line-height: 72px;
            font-size: 30px;
            color: #fff;
            background-image: url('../../../assets/images/button5.png');
            background-repeat: no-repeat;
            background-position: center;
            background-size: 100%;
            position: absolute;
            top:445px;
            right:0px;
          }
        }
        .left_two{
          height: 530px;
          padding:40px;
          border:1px solid #387ADA;
          position: relative;
          .set_table{
            cursor: pointer;
            display:flex;
            justify-content:space-between;
            margin-top: 20px;
            margin-bottom: 20px;
            font-size: 32px;
            img{
              height: 190px
            }
            .info{
               display:inline-block;
            }
            .table1{
              flex:1;
              margin-right: 20px;
              border:1px solid #1E3B6F;
              width: 340px;
              height: 410px;
              padding-bottom: 20px;
              .img{
                margin-bottom: 20px;
                margin-top: 40px;
              }
              .title1{
                margin-bottom: 10px
              }
              .time{
                span{
                  color: #4492FF;
                  font-size: 58px;
                }
            }
          }
            .table2{
              flex: 1;
              margin-right: 20px;
              border:1px solid #1E3B6F;
              width: 340px;
              height: 420px;
              padding-bottom: 20px;
               .img{
                margin-bottom: 20px;
                margin-top: 40px;
              }
              .title1{
                margin-bottom: 10px
              }
              .time{
                span{
                  color: #2CDFFF;
                  font-size: 58px;
                }
              }
            }
            .table3{
              flex: 1;
              border:1px solid #1E3B6F;
              width: 340px;
              height: 420px;
              padding-bottom: 20px;
               .img{
                margin-bottom: 20px;
                margin-top: 40px;
              }
              .title1{
                margin-bottom: 10px
              }
              .time{
                span{
                  color: #B945FF;
                  font-size: 58px;
                }
            }
          }
        }
      }
    }
    .right_box{
        flex: 1;
        display:flex;
        flex-direction:column;
        .right_top{
          flex: 1;
          display:flex;
          justify-content:flex-start;
          margin-bottom: 20px;
          .right_top_left{
             flex: 1;
             padding-right: 10px;
          }
          .right_top_right{
             flex: 1;
             padding-left: 10px;
          }
        }
        .right_bottom{
          position: relative;
          .right_bottom_box{
            display:flex;
            justify-content:space-between;
            .pre_box{
              flex: 1;
              margin-top: 40px;
            }
            .line_box{
              flex: 1;
              margin-top: 40px;
            }
          }
        }

      }
    }
  }
  .map-content{
    position: relative;
    &-tip{
      position: absolute;
      bottom: 40px;
      left: 60px;
      display: flex;
      width: 720px;
      flex-wrap: wrap;
      li{
        width: 360px;
        display: flex;
        align-items: center;
        img{
          padding-right: 15px;
        }
        p{
          font-size: 28px;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: #B1D2E9;
        }
      }
    }
    &-title{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #104470;
      margin: 0 40px;
      height: 95px;
      align-items: center;
      p:nth-child(1){
        color: #B2D3EA;
        font-size: 40px;
        font-weight: 400;
        font-family:Alibaba PuHuiTi;
      }
      p:nth-child(2){
        font-size:24px;
        font-family:Alibaba PuHuiTi;
        font-weight:400;
        color:rgba(104,132,160,1);
      }
    }
  }
  .activeColor{
    color: #4694FF;
  }
  
</style>