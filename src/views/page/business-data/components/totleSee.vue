<template>
  <div style="margin-top: 20px;">
    <div class="oneLine" v-if="type==1">
      <img :src="imgSrc" alt="">
      <div class="rightList">
        <span class="title">{{title}}</span>
        <span class="text">{{textNum}}</span>
        <span class="unit">{{unit}}</span>
      </div>
   </div>
    <div class="twoLine" v-else>
      <img :src="imgSrc" alt="">
       <div class="rightList2">
        <p class="title">{{title}}</p>
        <span class="text">{{textNum}}</span>
        <span class="unit">{{unit}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import guahao from '@/assets/images/icon1_guahao.png'
import denglu from '@/assets/images/icon2_denglu.png'
import qiandao from '@/assets/images/icon3_qiandao.png'
import jiaofei1 from '@/assets/images/icon4_jiaofei1.png'
import jiaofei2 from '@/assets/images/icon4_jiaofei2.png'
export default {
  name: 'TotleSee',
  props: {
    imgType:{
      type:Number,
      default () {
        return 1
      }
    },
    title: {
      type: String,
      default () {
        return ''
      }
    },
    text:{
      type: Number,
      default () {
        return  0
      }
    },
    type:{
      type:Number,
      default () {
        return 1
      }
    },
    unit: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      imgSrc:'',
      textNum:''
    }
  },
  created() {
    this.setData()
  },
  methods: {
    setData () {
      switch(this.imgType) {
        case 1:
          this.imgSrc = guahao
          break;
        case 2:
          this.imgSrc = denglu
          break;
        case 3:
          this.imgSrc = qiandao
          break;
        case 4:
          this.imgSrc = jiaofei1
          break;
        case 5:
          this.imgSrc = jiaofei2
          break;
      }
      this.textNum = this.thousands(this.text)
    },
    thousands (num) {
      if (num) {
        var str = num.toString()
        var reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
        return str.replace(reg, '$1,')
      } else {
        return num
      }
    }
  },
  watch:{
    text:{
      handler:function(newValue,oldValue){
        this.setData()
      /*  this.$nextTick(() => {
          this.drawLine();
        })*/
      },
      immediate:true,
      deep:true
    }
  }
}
</script>

<style>
 .oneLine{
  text-align: left;
  height: 120px;
  line-height: 120px;
  .rightList{
    margin-left: 20px;
    display: inline-block;
    position: relative;
    top: -40px;
    .title{
      color: #F5F8FA;
      margin-right: 100px;
    }
    .text{
      font-size: 70px;
      color: #fff;
      margin-right: 20px;
    }
    .unit{
      color: #64819D;
      font-size: 20px;
    }
  }
 }
 .twoLine{
   text-align: left;
   display: inline-block;
   height: 120px;
   line-height: 60px;
   .rightList2{
    margin-left: 20px;
    display: inline-block;
    position: relative;
    top: -10px;
    .title{
      color: #F5F8FA;
      margin-right: 100px;
    }
    .text{
      font-size: 70px;
      color: #fff;
      margin-right: 20px;
    }
    .unit{
      color: #64819D;
      font-size: 20px;
    }
  }
}
</style>
