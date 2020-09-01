<template>
  <div>
     <el-carousel trigger="click" height="720px" arrow="never" :interval='time' @change="((next, pre) => {setNewData(next, pre)})">
      <el-carousel-item v-for="(crad,index2 in size" :key="index2">
        <div :class="[index==0?'item':'item',item.value==2?'active':'']" v-for="(item,index) in itemList">
          <span class="yuan"></span>
          <span class="text">{{item.name}}</span>
           <span class="unit">{{item.value}}</span>
          <span class="code">终端号{{item.code}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'SomeCity',
  props: {
   listData:Array
  },
  data () {
    return {
      time:120000,
      list:this.listData,
      itemList:[],
      size:2
    }
  },
  created() {
    this.setData()
  },
  methods: {
    setData () {
      this.size =Math.ceil(this.list.length / 9);
      this.itemList = this.list.slice(0,9);
    },
    setNewData (next, pre) {
      this.itemList = this.list.slice(next*9,next*9+9);
    }
  }
}
</script>

<style scoped>
.item.active{
  color: #FF9F2E
}
  .item{
    text-align: left;
    margin-top: 10px;
    margin-bottom:25px;
    color: #fff;
    .yuan{
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background-color: #0BB3F1;
      margin-right: 10px;
    }
    .text{
      font-size: 28px;
    }
    .code{
      font-size: 28px;
      float: right;
      margin-right: 200px;
    }
    .unit{
      font-size: 28px;
      float: right;
      margin-right: 20px;
    }
  }
</style>
