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
            <div style="margin-top: 20px;margin-bottom: 20px;">当前所有终端运行状态</div>
            <div class="state">
               <div class="totle1">
                  <div class="img">
                     <img :src="zongliangImg" class="zongliang" alt="">
                  </div>
                  <div class="text">
                    <p>当前正在运行终端总量</p>
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
                    <p>当前所有终端开机率</p>
                    <p style="text-align: left;">
                      <span class="span1">{{kaijiV}}</span>
                      <span class="span2">%</span>
                    </p>
                  </div>
               </div>
            </div>
            <div style="margin-top: 30px;margin-bottom: 20px;position: relative;">{{text1}}
            <span class="back">返回全市情况</span>
            </div>
            <all-city :listData="allCity" ></all-city>
            <some-city :listData="allCity" v-if="false"></some-city>
          </div>
          <div class="left_two">
            <img :src="leftUp" class="leftUp" alt="">
            <img :src="leftDown" class="leftDown" alt="">
            <img :src="rightUp" class="rightUp" alt="">
            <img :src="rightDown" class="rightDown" alt="">
            <chart-title title="报修单近7天处理情况"></chart-title>
            <div class="set_table">
              <div class="table1">
                <div class="img">
                  <img :src="fenpeiImg"  alt="">
                </div>
                <div class="title1">
                  平均分配耗时
                </div>
                <div class="time">
                  <span>{{time1}}</span>
                  小时/单
                </div>
              </div>
              <div class="table2">
                 <div class="img">
                  <img :src="weixiuImg"  alt="">
                </div>
                <div class="title1">
                  平均维修耗时
                </div>
                <div class="time">
                 <span>{{time2}}</span>小时/单
                </div>
              </div>
              <div class="table3">
                 <div class="img">
                  <img :src="wanchengImg"  alt="">
                </div>
                <div class="title1">
                  平均整体完成耗时
                </div>
                <div class="time">
                  <span>{{time2}}</span>小时/单
                </div>
              </div>
            </div>
          </div>
       </div>
       <div class="right_box">
         <div class="right_top">
           <div class="right_top_left">
              <img :src="leftUp" class="leftUp" alt="">
              <img :src="leftDown" class="leftDown" alt="">
              <img :src="rightUp" class="rightUp" alt="">
              <img :src="rightDown" class="rightDown" alt="">
              <chart-title title="当前各乡镇/街道终端运行情况"></chart-title>
           </div>
            <div class="right_top_right">
              <img :src="leftUp" class="leftUp" alt="">
              <img :src="leftDown" class="leftDown" alt="">
              <img :src="rightUp" class="rightUp" alt="">
              <img :src="rightDown" class="rightDown" alt="">
              <chart-title title="近7天乡镇/街道故障率TOP10"></chart-title>
            </div>
         </div>
         <div class="right_bottom">
            <img :src="leftUp" class="leftUp" alt="">
            <img :src="leftDown" class="leftDown" alt="">
            <img :src="rightUp" class="rightUp" alt="">
            <img :src="rightDown" class="rightDown" alt="">
            <chart-title title="近7天报修单情况"></chart-title>
         </div>
       </div>
     </div>
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
export default {
  name: "MaintenanceData",
  components: {
    AllCity,
    SomeCity
  },
  data() {
    return {
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
      text1:'当前全市所有终端运行异常社区',
      zonglangV: 3000,
      kaijiV:98,
      time1:2,
      time2:'1天2',
      time3:'2天1',
      allCity: [
        {name:'东城街道社区卫生服务中心',value:'2',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'2',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'2',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'},
        {name:'东城街道社区卫生服务中心',value:'1',code:'HHH3333'}
      ]
    }
  },
  created() {
  },
  mounted () {
  },
  methods: {
    chengPage (index) {
     if (index==1){
        this.$router.replace('/graphicStatistics')
      }else{
        this.$router.replace('/businessData')
      }
    },
  }
};
</script>
<style scoped >
  /deep/ .el-carousel__button{
    width: 30px;
    height: 30px;
    border-radius: 30px;
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
        width: 33%;
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
                margin-right: 10px;
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
            top:0px;
            right:0px;
          }
        }
        .left_two{
          height: 540px;
          padding:40px;
          border:1px solid #387ADA;
          position: relative;
          .set_table{
            cursor: pointer;
            display:flex;
            justify-content:space-between;
            margin-top: 20px;
            margin-bottom: 20px;
            img{
              height: 190px
            }
            .table1{
              flex:1;
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
             padding:40px;
             border:1px solid #387ADA;
             margin-right:20px;
             position: relative;
          }
          .right_top_right{
             flex: 1;
             padding:40px;
             border:1px solid #387ADA;
             position: relative;
          }
        }
        .right_bottom{
          height: 820px;
          padding:40px;
          border:1px solid #387ADA;
          position: relative;
        }

      }
    }
  }
</style>