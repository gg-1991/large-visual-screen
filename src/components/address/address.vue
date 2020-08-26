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
export default {
  name: "Address",
  props: {
    item: {
      type: String,
      default () {
        return '0'
      }
    }
  },
  data() {
    return {
      allSelect: true,
      itemSelect: 0,
      activeClass: -1,
      List:['东城社区','莞城社区','万江社区','南城社区','石碣镇','石龙镇','企石镇','东城社区','莞城社区','万江社区','南城社区','石碣镇','石龙镇','企石镇','东城社区','莞城社区','万江社区','南城社区','石碣镇','石龙镇','企石镇','东城社区','莞城社区','万江社区','石碣镇','石龙镇','企石镇','东城社区','莞城社区','万江社区','南城社区','石碣镇'],
      addressList: [],
    }
  },
  created() {
    this.setAddressList()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    setAddressList () {
      if (this.item == '-1') {
         this.allSelect =true
         this.activeClass = -1
      } else {
        this.allSelect =false
        this.activeClass = this.item
      }
      for(let i = 0 ; i < this.List.length; i++) {
        let item ={}
        item.name = this.List[i];
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
      this.$emit('update', index)
    },
    selectAll () {
      this.allSelect = true
      this.activeClass = -1
      this.$emit('update', -1)
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
   .all{
      width: 360px;
      line-height: 70px;
      height: 70px;
      background-image: url('../../assets/images/button3_n.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      margin-bottom: 12px;
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