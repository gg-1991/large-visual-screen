<template>
  <div class="container">
     <div class="title">
        <div class="list1">
          <img :src="titleLeftImg" alt="">
          <span  :key='index' :class="[index==0?'btn1':'btn2',activeClass==index?'active':'']"  v-for="(item,index) in btnText" @click="changeTime(index)">{{item.text}}</span>
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
       <div class="oneBox">
         <div class="one_left">
           <img :src="leftUp" class="leftUp" alt="">
           <img :src="leftDown" class="leftDown" alt="">
           <img :src="rightUp" class="rightUp" alt="">
           <img :src="rightDown" class="rightDown" alt="">
           <chart-title title="自助挂号情况"></chart-title>
           <totle-see unit="人次数" :title="title1" :text="text1" :imgType=1 :type=1></totle-see>
            <div>挂号类型占比统计</div>
           <bar-chart :chartData="patientbarData"/>
         </div>
         <div class="one_center">
            <img :src="leftUp" class="leftUp" alt="">
            <img :src="leftDown" class="leftDown" alt="">
            <img :src="rightUp" class="rightUp" alt="">
            <img :src="rightDown" class="rightDown" alt="">
            <chart-title title="自助登录情况"></chart-title>
            <totle-see unit="次" :title="title2" :text="text2" :imgType=2 :type=1></totle-see>
            <div class="pieBox">
              <pie-chart :chartData="pieDataOne" :colors="['#697EFF', '#9218DC', '#8559FF', '#697EFF']" :redius='redius1' name="挂号类型占比" />
              <pie-chart :chartData="pieDataTwo" :colors="['#67EBFF', '#52BBF9']" :redius='redius1' name="参保人挂号占比"/>
            </div>
         </div>
         <div class="one_right">
            <img :src="leftUp" class="leftUp" alt="">
            <img :src="leftDown" class="leftDown" alt="">
            <img :src="rightUp" class="rightUp" alt="">
            <img :src="rightDown" class="rightDown" alt="">
            <chart-title title="自助签到情况"></chart-title>
            <totle-see unit="次" :title="title3" :text="text3" :imgType=3 :type=1></totle-see>
            <pie-chart :chartData="pieDataThere" :colors="['#8559FF', '#4C97F7']" :redius='redius2' name="缴费账户类型占比"/>
         </div>
       </div>
       <div class="twoBox">
           <img :src="leftUp" class="leftUp" alt="">
           <img :src="leftDown" class="leftDown" alt="">
           <img :src="rightUp" class="rightUp" alt="">
           <img :src="rightDown" class="rightDown" alt="">
           <chart-title title="自助缴费情况"></chart-title>
           <div>
             <div class="left">
              <div style="text-align: left;margin-bottom: 10px;">
                <totle-see unit="人次" :title="title4" :text="text4" :imgType=4 :type=2 style="width: 50%;display: inline-block;"></totle-see>
                <totle-see unit="元" :title="title5" :text="text5" :imgType=5 :type=2 style="width: 50%;display: inline-block;"></totle-see>
              </div>
               <div>{{title6}}统计</div>
             </div>
             <div class="right">
              <div style="margin-top: 60px;margin-bottom: 100px;">{{title7}}统计</div>
             </div>
           </div>
       </div>
     </div>
     <div class="more" @click="changeAddress">{{selectAddress}}</div>
     <add-ress v-show="isShow" :item="selectAddressNum" @update="upDateNew"></add-ress>
  </div>
</template>
<script>
import titleLeft from '@/assets/images/bg_lift.png'
import titleRight from '@/assets/images/bg_right.png'
import leftUp from '@/assets/images/border_lift_up.png'
import leftDown from '@/assets/images/border_lift_down.png'
import rightUp from '@/assets/images/border_right_up.png'
import rightDown from '@/assets/images/border_right_down.png'
import TotleSee from './components/totleSee.vue'
import AddRess from '@/components/address/address'
import BarChart from '../graphic-statistics/components/barChart'
import PieChart from '../graphic-statistics/components/PieChart'
export default {
  name: "MaintenanceData",
  components: {
    TotleSee,
    BarChart,
    AddRess,
    PieChart
  },
  data() {
    return {
      activeClass: 0,
      btnText:[
       {'text':'近7天',"isSure":true},
       {'text': '近30天'}
      ],
      isMouth: false,
      selectAddress:'展开',
      selectAddressNum:'0',
      isShow: false,
      title1:'近7天总挂号量',
      title2:'近7天总登录数',
      title3:'近7天总签到数',
      title4:'近7天缴费总交易量',
      title5:'近7天缴费总交易额',
      title6:'近7天每日缴费交易量、交易额',
      title7:'近7天各个缴费方式总交易量、总交易额',
      text1:'5530',
      text2:'5530',
      text3:'5530',
      text4:'5530',
      text5:'5530',
      leftUp:leftUp,
      leftDown:leftDown,
      rightDown:rightDown,
      rightUp:rightUp,
      titleLeftImg: titleLeft,
      titleRightImg: titleRight,
      pieDataOne: [
        {value: 15, name: '转诊'},
        {value: 35,  name: '自费'},
        {value: 30, name: '急诊'},
        {value: 20, name: '社区'}
      ],
      redius1: [50,200],
      pieDataTwo: [
        {value: 55, name: '参保人'},
        {value: 45,  name: '非参保人'}
      ],
      redius2: [100,250],
      pieDataThere: [
        {value: 55, name: '个账'},
        {value: 45,  name: '金融'}
      ],
      patientbarData:[
        {'name': '社保卡','valueL': [10,22,33,44,66,77],'valueE': [55,63,85,4,96,86]},
        {'name': '电子社保卡','valueL': [30,22,33,44,66,77],'valueE': [55,63,85,4,96,86]},
        {'name': '刷脸支付','valueL': [20,22,33,44,66,77],'valueE': [55,63,85,4,96,86]},
        {'name': '莞银通','valueL': [40,22,33,44,66,77],'valueE': [55,63,85,4,96,86]},
        {'name': '银联卡','valueL': [10,22,33,44,66,77],'valueE': [55,63,85,4,96,86]},
        {'name': '其他','valueL': [10,22,33,44,66,77],'valueE': [55,63,85,4,96,86]}
      ]
    }
  },
  created() {
  },
  mounted () {
    this.drawPie();
  },
  methods: {
    drawPie () {
    },
    chengPage (index) {
     if (index==1){
        this.$router.replace('/graphicStatistics')
      }else{
        this.$router.replace('/businessData')
      }
    },
    changeTime(index){
      this.activeClass = index;
      if (index === 1) {
        this.isMouth = true
        this.title1 = '近30天总挂号量'
        this.title2 = '近30天总登录数'
        this.title3 = '近30天总签到数'
        this.title4 = '近30天缴费总交易量'
        this.title5 = '近30天缴费总交易额'
        this.title6 = '近30天每日缴费交易量、交易额'
        this.title7 = '近30天各个缴费方式总交易量、总交易额'
      } else {
        this.isMouth = false
        this.title1 = '近7天总挂号量'
        this.title2 = '近7天总登录数'
        this.title3 = '近7天总签到数'
        this.title4 = '近7天缴费总交易量'
        this.title5 = '近7天缴费总交易额'
        this.title6 = '近7天每日缴费交易量、交易额'
        this.title7 = '近7天各个缴费方式总交易量、总交易额'
      }
    },
    changeAddress () {
      this.isShow ? this.selectAddress = '展开' : this.selectAddress = '收起';
      this.isShow = !this.isShow
    },
    upDateNew (val) {
      this.isShow = !this.isShow
      this.selectAddress = '展开'
      this.selectAddressNum = val
    }
  }
};
</script>
<style scoped >
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
          width: 1240px;
        }
        .btn1{
          position: absolute;
          left: 38px;
          bottom: -10px;
        }
        .active{
          color: #6BA7FF;
        }
        .btn2{
          position: absolute;
          left: 200px;
          bottom: -10px;
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
    .box{
      margin:17px 37px 17px 37px;
      .oneBox{
        display:flex;
        justify-content:flex-start;
        .one_left{
         flex: 1;
         padding:40px;
         border:1px solid #387ADA;
         margin-right:20px;
         position: relative;
        }
        .one_center{
         flex: 1;
         padding:40px;
         border:1px solid #387ADA;
         margin-right:20px;
         position: relative;
         .pieBox{
           display:flex;
           flex-direction:row;
           justify-content:flex-start;
         }
        }
        .one_right{
         flex: 1;
         padding:40px;
         border:1px solid #387ADA;
         position: relative;
        }
      }
      .twoBox{
        padding:40px;
        display:flex;
        flex-direction:column;
        /* justify-content:space-between; */
        margin-top: 20px;
        position: relative;
        border:1px solid #387ADA;
        .left{
          float: left;
          width: 50%;
        }
        .right{
          float: left;
          width: 50%;
        }
       }
    }
    .more{
      padding-right: 15px;
      width: 125px;
      height: 80px;
      line-height: 80px;
      background-image: url('../../../assets/images/button2.png');
      position: absolute;
      background-size: 100% 100%;
      top:45%;
      left:0px;
    }
  }
</style>