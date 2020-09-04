<template>
  <div class="container">
    <div class="select-name"  @click="showAddress">{{isShowAddress ? '收起' : '展开'}}</div>
    <div v-show="isShowAddress">
      <div class="all-city" :class="{'active': itemSelect === -1}" @click="select(-1, '441900000000')">全市整体情况</div>
      <div class="box">
        <ul>
          <li v-for="(item,index) in addressList" :key="index" :class="{active: itemSelect === index}"  @click="select(index, item.officeCode, item.name)">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {  loadOfficeTotalTransInfo } from '@/api/graphic.js'
export default {
  name: "addressPanel",
  props: {
    day: {
      type: Number,
      default () {
        return 1
      }
    }
  },
  data() {
    return {
      itemSelect: -1,
      addressList: [],
      isShowAddress: false
    }
  },
  created(){
    this.getOfficeTotalTransInfo()
  },
  methods: {
    getOfficeTotalTransInfo(){
      const params = {
        day: this.day
      }
      this.addressList = []
      loadOfficeTotalTransInfo(params).then(res => {
        if(res.code === 200){
          const data = res.data.officeInfos || []
          data.forEach(item => {
            let obj = {
              name: item.officeName,
              officeCode: item.officeCode
            }
            this.addressList.push(obj)
          })
        }
      })
    },
    select (index, officeCode, name) {
      this.isShowAddress = false
      this.itemSelect = index
      let msg = {
        index: index,
        officeCode: officeCode,
        name: name
      }
      this.$emit('update', msg)
    },
    showAddress(){
      this.isShowAddress = !this.isShowAddress
    }
  }
};
</script>
<style scoped lang="scss">
  .container{
    color: #fff;
    font-size: 32px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
   .all-city{
      width: 360px;
      line-height: 68px;
      height: 68px;
      background-image: url('../../assets/images/button3_n.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      margin-bottom: 30px;
   }
   .active{
      background-image: url('../../assets/images/button3_h.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
   }
   .box{
     width: 2520px;
     overflow: hidden;
     ul{
       display: flex;
       flex-wrap: wrap;
     }
     li{
      margin-bottom: 30px;
      width: 360px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 68px;
      cursor: pointer;
      background: url('../../assets/images/button4_n.png') no-repeat center;
      &:hover{
        background: url('../../assets/images/button4_h.png') no-repeat center;
      }
      &:nth-child(7n+1){
        background: url('../../assets/images/button3_n.png') no-repeat center;
        background-size: 100%;
        &:hover{
          background: url('../../assets/images/button3_h.png') no-repeat center;
        }
      }
      
     }
     .active{
       background: url('../../assets/images/button4_h.png') no-repeat center;
       &:nth-child(7n+1){
        background: url('../../assets/images/button3_h.png') no-repeat center;
      }
      background-size: 100%;
     }
   }
   .select-name{
      width: 100px;
      height: 68px;
      background: url('../../assets/images/button2.png') no-repeat center;
      background-size: 100%;
      font-size: 32px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 68px;
      margin-bottom: 30px;
      text-align: left;
      padding-left: 15px;
   }

  }
</style>