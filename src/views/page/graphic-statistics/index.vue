<template>
  <div class="container">
     <div class="header-title">
        <div class="list1">
          <img :src="titleLeftImg" alt="">
          <ul>
            <li v-for="(item,index) in btnText" :key="index" @click="changeTime(item.value, index)" :class="{active: index === activeIndex }">{{item.label}}</li>
          </ul>
          <!-- <span  :key='index' :class="[index==0?'btn1':'btn2',activeClass==index?'active':'']"  v-for="(item,index) in btnText" @click="changeTime(index)">{{item.text}}</span> -->
        </div>
        <div class="list2">
          <span class="list2_tj">整体图形统计</span>
          <span class="list2_yw" @click="chengPage('businessData')">自助业务数据</span>
          <span class="list2_sj" @click="chengPage('maintennaceData')">运维数据</span>
        </div>
        <div class="list3">
          <img :src="titleRightImg" alt="">
        </div>
     </div>

     <div class="content">
       <div class="content-top">
        <div class="content-top-area">
          <box-area :height="'1000px'">
            <div>
              <div class="title">
                <p>社区挂号量TOP10</p>
                <p>单位: 人次数</p>
              </div>
              <pictorial-bar v-if="categoryData.length> 0" :categoryData="categoryData" :height="'900px'" :chartId="'chartTop'"></pictorial-bar>
            </div>
          </box-area>
        </div>
        <div class="content-top-area area-center">
          <box-area :height="'1000px'">
            <div>
              <div class="title">
                <p>各乡镇/街道缴费量分布情况</p>
              </div>
              <map-chart></map-chart>
              <!-- <pictorial-line v-if="categoryData.length> 0" :categoryData="categoryData" :height="'900px'" :chartId="'chartMap'"></pictorial-line> -->
            </div>
          </box-area>
        </div>
        <div class="content-top-area">
          <box-area :height="'1000px'">
            <div>
              <div class="title">
                <p>挂号情况</p>
              </div>
              <div class="register-info">
                <div class="register-info-top">
                  <pie-chart v-if="registrationTypeRatios.length > 0" :height="'400px'" :id="'registrationTypeRatios'" :chartData="registrationTypeRatios" :colors="['#9218DC', '#8559FF', '#697EFF', '#4C97F7']" name="挂号类型占比" />
                  <pie-chart v-if="insuredRatio.length > 0" :id="'insuredRatio'" :height="'400px'" :chartData="insuredRatio" :colors="['#67EBFF', '#52BBF9']"  name="参保人挂号占比"/>
                </div>
                <div class="register-info-bottom">
                  <pictorial-line v-if="signTypeList.datax.length> 0" :categoryData="signTypeList" :height="'410px'" :chartId="'chartMap'"></pictorial-line>
                </div>
              </div>
            </div>
          </box-area>
        </div>
        
      </div>
      <div class="content-bottom">
         <box-area :height="'900px'">
           <div>
              <div class="title">
                <p>社区缴费情况</p>
              </div>
            </div>
            <div class="pay-status">
              <div class="progress-bar">
                <div class="progress-bar-title">
                  <span>交易量（比）/  交易额（元）</span>
                  <p>社区缴费量TOP8</p>
                </div>
                <progress-bar :officeTransList="officeTransList"></progress-bar>
              </div>
              <div class="pay-pie">
                <div class="progress-bar-title">
                  <p>缴费账户类型占比</p>
                  <pie-chart v-if="transAccountTypes.length > 0" :chartData="transAccountTypes" :colors="['#8559FF', '#4C97F7']" :redius='redius' name=""/>
                </div>
              </div>
              <div class="pay-bar">
                <div class="progress-bar-title">
                  <p>各个缴费方式交易量、交易额占比</p>
                  <bar-chart v-if="transTypeChartXData.length > 0" :transTypeChartXData="transTypeChartXData" :chartId="'transTypeChart'" :chartData="transTypeRatioList" :height="'650px'"></bar-chart>
                </div>
              </div>
              
            </div>
         </box-area>
      </div>
     </div>
     
     
  </div>
</template>
<script>
import titleLeft from '@/assets/images/bg_lift.png'
import titleRight from '@/assets/images/bg_right.png'
import boxArea from '@/components/box'
import pictorialBar from './components/pictorialBar'
import pictorialLine from './components/pictorialLine'
import progressBar from './components/progressBar'
import pieChart from './components/PieChart'
import barChart from './components/barChart'
import mapChart from '../maintenance-data/components/mapChart'
import { loadOfficeRegistrationTop, loadSignInTypeList, loadOfficeTransList, loadOfficeRegistrationRatio, loadOfficeTransTypeRatio } from '@/api/graphic.js'

export default {
  name: "GraphicStatistics",
  components: {
    boxArea,
    pictorialBar,
    pictorialLine,
    progressBar,
    pieChart,
    barChart,
    mapChart
  },
  data() {
    return {
      activeIndex: 0,
      day: 1,
      btnText:[
        {label:'当天', value: 1},
        {label:'近7天', value: 7 },
        {label: '近30天', value: 30}
      ],
      titleLeftImg: titleLeft,
      titleRightImg:titleRight,
      //  社区挂号量top10
      categoryData: [],
      //  登录方式占比
      signTypeList: {
        datax: [],
        datay: []
      },
      //  社区缴费量
      officeTransList: [],
      //  挂号类型占比
      registrationTypeRatios: [],
      //  参保人挂号占比
      insuredRatio: [],
      //  缴费类型占比
      transAccountTypes: [],
      //  各个缴费方式交易量、交易额占比
      transTypeRatioList: [
        {
          name: '交易量占比',
          color: '#4492FF',
          data: []
        },
        {
          name: '交易额占比',
          color: '#2CDFFF',
          data: []
        }
      ],
      transTypeChartXData: [],
      redius: [100,250],

    }
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.getTop10List()
      this.getSignTypeList()
      this.getOfficeTransList()
      this.getOfficeRegistrationRatio()
      this.getOfficeTransTypeRatio()
    },
    getTop10List(){
      const params = {
        officeCode: '',
        day: 1,
        officeNumber: 10
      }
      this.categoryData = []
      loadOfficeRegistrationTop(params).then(res => {
        if(res.code === 200){
          const data = res.data.registrationCollectList || []
          const tempData = []
          data.forEach(item => {
            let obj = {
              "name": item.officeName,
              "value": item.totalCount
            }
            tempData.push(obj)
          })
          this.categoryData = tempData
        }
      })
    },
    getSignTypeList(){
      const params = {
        officeCode: '',
        day: 1,
        signInTypeNumber: 10
      }
      this.signTypeList.datax = []
      this.signTypeList.datay = []
      loadSignInTypeList(params).then(res => {
        if(res.code === 200){
          const data = res.data.signInTypeRatioList || []
          data.forEach(item => {
            this.signTypeList.datax.push(item.signInName)
            this.signTypeList.datay.push(item.signInRatio)
          })
        }
      })
    },
    getOfficeTransList(){
      const params = {
        officeCode: '',
        day: 1,
        officeNumber: 8
      }
      this.officeTransList = []
      loadOfficeTransList(params).then(res => {
        if(res.code === 200){
          const data = res.data.officeTransList || []
          //  找出交易笔数，交易金额的最大值，算出大概比例值
          if(data.length === 0) return
          const bigCountArr = []
          const bigTotalAmtArr = []
          data.map(item => {
            bigCountArr.push(item.count || 0)
            bigTotalAmtArr.push(item.totalAmt || 0)
          })
          const bigCount = Math.max(...bigCountArr)
          const bigTotalAmt =  Math.max(...bigTotalAmtArr)
          data.map(item => {
            const countRate = (item.count / bigCount * 100).toFixed(0)
            const amtRate = (item.totalAmt / bigTotalAmt * 100).toFixed(0)
            let tempObj = { ...item, 'countRate': countRate, 'amtRate': amtRate }
            this.officeTransList.push(tempObj)
          })
        }
      })
    },
    getOfficeRegistrationRatio(){
      const params = {
        officeCode: '',
        day: this.day
      }
      this.registrationTypeRatios = []
      loadOfficeRegistrationRatio(params).then(res => {
        if(res.code === 200){
          const data = res.data
          this.insuredRatio = [
            {"name": '参保人', "value": data.insuredRatio.insuredRatio},
            {"name": '非参保人', "value": data.insuredRatio.nonInsuredRatio},
          ]
          data.registrationTypeRatios.forEach(item => {
            let tempObj = {
              "name": item.registrationName,
              "value": item.registrationRatio
            }
            this.registrationTypeRatios.push(tempObj)
          })
          //  按照value大小进行排序
          this.registrationTypeRatios.sort((a,b) => {
            return a.value - b.value
          })
        }
      })
    },
    getOfficeTransTypeRatio(){
      const params = {
        "officeCode": "441900003000",
        "day": this.day,
        "transTypeNumber": 2
      }
      loadOfficeTransTypeRatio(params).then(res => {
        if(res.code === 200){
          const transTypeArr = res.data.transTypeRatioList
          const transAccountArr = res.data.transAccountTypes
          this.transAccountTypes = []
          this.transTypeChartXData = []
          this.transTypeRatioList[0].data = []
          this.transTypeRatioList[1].data = []
          transTypeArr.forEach(item => {
            this.transTypeChartXData.push(item.transName)
            this.transTypeRatioList[1].data.push(item.transAmtRatio)
            this.transTypeRatioList[0].data.push(item.transCountRatio)
          })
          transAccountArr.forEach(item => {
            let obj = {
              name: item.accountName,
              value: item.accountRatio
            }
            this.transAccountTypes.push(obj)
          })
          
        }
      })
    },
    chengPage (url) {
      this.$router.replace({name: url})
    },
    changeTime(value, index){
      this.activeIndex = index
      this.day = value
      this.init()
    }
  }
};
</script>
<style scoped lang="scss">
  .container{
    .header-title{
      height: 100px;
      display:flex;
      justify-content:space-between;
      .list1{
        position: relative;
        img{
          height: 80px;
          width: 1240px;
        }
        ul{
          position: absolute;
          bottom: -10px;
          display: flex;
          li{
            cursor: pointer;
            &:nth-child(1){
              padding-left: 40px;
            }
            &:nth-child(2){
              padding:0 60px;
            }
          }
          .active{
            color: #6BA7FF;
          }
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
          background-image: url('../../../assets/images/button1_h.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
          line-height: 80px;
          color: #FFFFFF;
        }
        .list2_sj{
          display: inline-block;
          width: 33%;
          height: 80px;
          background-image: url('../../../assets/images/button1_n.png');
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
          line-height: 80px;
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
          width: 1240px;
        }
      }
    }
  }
  .content{
    padding: 40px;
    &-top{
      display: flex;
      &-area{
        flex: 1;
      }
    }
    .area-center{
      padding: 0 20px;
    }
    .title{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #104470;
      margin: 0 40px;
      height: 98px;
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
    .register-info{
      display: flex;
      flex-direction: column;
      height: 900px;
      &-bottom{
        flex: 1;
      }
      &-top{
        flex: 1;
        display: flex;
      }

    }
    &-bottom{
      padding-top: 20px;
    }
  }
  .pay-status{
    display: flex;
    .progress-bar{
      flex: 0.37
    }
    .pay-pie{
      flex: 0.26
    }
    .pay-bar{
      flex: 0.37
    }
  }
  .progress-bar-title{
    position: relative;
    p{
      color: #B2D3EA;
      font-size: 36px;
      font-family:Alibaba PuHuiTi;
      font-weight:400;
      margin: 30px 0 50px 0;
    }
    span{
      position: absolute;
      font-size:24px;
      font-family:Alibaba PuHuiTi;
      font-weight:400;
      color:rgba(104,132,160,1);
      left: 60px;
      bottom: 0;
    }
  }
  
</style>