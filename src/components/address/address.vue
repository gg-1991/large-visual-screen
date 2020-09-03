<template>
  <div class="container">
    <div :class="[true ? 'all' : '' ,allSelect ? 'active' : '']" @click="selectAll">全市整体情况</div>
    <div class="box">
      <ul>
        <li v-for="(item,index) in addressList" :key="index" :class="[item.isOne ? 'item1' : 'item2', activeClass == index ? index%7 == 0 ? 'active1' : 'active2' : '']" @click="select(index)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import {  loadOfficeTotalTransInfo } from '@/api/graphic.js'
export default {
  name: "Address",
  props: {
    item: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data() {
    return {
      allSelect: true,
      itemSelect: 0,
      activeClass: -1,
      day:1,
      List:[
        /*{name:'社保局',officeCode:'441900000000'},
        {name:'东城街道',officeCode:'441900003000'},
        {name:'南城街道',officeCode:'441900004000'},
        {name:'万江街道',officeCode:'441900005000'},
        {name:'莞城街道',officeCode:'441900006000'},
        {name:'石碣镇',officeCode:'441900101000'},
        {name:'石龙镇',officeCode:'441900102000'},
        {name:'茶山镇',officeCode:'441900103000'},
        {name:'石排镇',officeCode:'441900104000'},
        {name:'企石镇',officeCode:'441900105000'},
        {name:'横沥镇',officeCode:'441900106000'},
        {name:'桥头镇',officeCode:'441900107000'},
        {name:'谢岗镇',officeCode:'441900108000'},
        {name:'东坑镇',officeCode:'441900109000'},
        {name:'常平镇',officeCode:'441900110000'},
        {name:'寮步镇',officeCode:'441900111000'},
        {name:'樟木头镇',officeCode:'441900112000'},
        {name:'大朗镇',officeCode:'441900113000'},
        {name:'黄江镇',officeCode:'441900114000'},
        {name:'清溪镇',officeCode:'441900115000'},
        {name:'塘厦镇',officeCode:'441900116000'},
        {name:'凤岗镇',officeCode:'441900117000'},
        {name:'大岭山镇',officeCode:'441900118000'},
        {name:'长安镇',officeCode:'441900119000'},
        {name:'虎门镇',officeCode:'441900121000'},
        {name:'厚街镇',officeCode:'441900122000'},
        {name:'沙田镇',officeCode:'441900123000'},
        {name:'道滘镇',officeCode:'441900124000'},
        {name:'洪梅镇',officeCode:'441900125000'},
        {name:'麻涌镇',officeCode:'441900126000'},
        {name:'望牛墩镇',officeCode:'441900127000'},
        {name:'中堂镇',officeCode:'441900128000'},
        {name:'高埗镇',officeCode:'441900129000'},
        {name:'松山湖',officeCode:'441900401000'}*/
      ],
      addressList: [],
    }
  },
  created() {
    this.getOfficeTotalTransInfo()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    getOfficeTotalTransInfo(){
      const params = {
        day: this.day
      }
      this.List = []
      loadOfficeTotalTransInfo(params).then(res => {
        if(res.code === 200){
          const data = res.data.officeInfos || []
          data.forEach(item => {
            let obj = {
              name: item.officeName,
              officeCode: item.officeCode
            }
            this.List.push(obj)
          })
          this.setAddressList()
        }
      })
    },
    setAddressList () {
      if (this.item == -1) {
         this.allSelect =true
         this.activeClass = -1
      } else {
        this.allSelect =false
        this.activeClass = this.item
      }
      for(let i = 0 ; i < this.List.length; i++) {
        let item ={}
        item.name = this.List[i].name;
        item.officeCode = this.List[i].officeCode;
        if (i%7 == 0) {
          item.isOne = true
        } else {
         item.isOne = false
        }
        this.addressList.push(item)
      }
    },
    select (index) {
      this.allSelect = false
      this.activeClass = index
      let msg = {
        index: index,
        officeCode:this.List[index].officeCode
      }
      this.$emit('update', msg)
    },
    selectAll () {
      this.allSelect = true
      this.activeClass = -1
       let msg = {
        index: -1,
        officeCode:'441900000000'
      }
      this.$emit('update', msg)
    }
  }
};
</script>
<style scoped >
  .container{
    position: absolute;
    left: 0px;
    top: 50%;
    z-index: 10;
    color: #fff;
    font-size: 32px;
   .all{
      width: 360px;
      margin-bottom:30px;
      line-height: 70px;
      height: 70px;
      background-image: url('../../assets/images/button3_n.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
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
     li{
      float: left;
      margin-bottom: 12px;
      margin-bottom: 30px;
     }
     .item1{
      width: 360px;
      line-height: 70px;
      height: 70px;
      background-image: url('../../assets/images/button3_n.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
     }
     .item2{
      width: 360px;
      line-height: 70px;
      height: 70px;
      background-image: url('../../assets/images/button4_n.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
     }
     .active1{
      background-image: url('../../assets/images/button3_h.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
     }
     .active2{
      background-image: url('../../assets/images/button4_h.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
    }
   }

  }
</style>