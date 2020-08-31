<template>
  <div>
    <el-carousel trigger="click" height="720px" arrow="never" :interval='time' @change="((next, pre) => {setNewData(next, pre)})">
      <el-carousel-item v-for="(crad,index2 in size" :key="index2">
        <div class="item" v-for="(item,index) in itemList">
          <span class="yuan"></span>
          <span class="text">{{item.name}}</span>
          <span class="unit">{{item.value}}台</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'AllCity',
  props: {
   listData:Array,
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
      this.size =Math.ceil(this.list.length / 18);
      this.itemList = this.list.slice(0,18);
    },
    setNewData (next, pre) {
      this.itemList = this.list.slice(next*18,next*18+18);
    }

  }
}
</script>

<style scoped>
  .item{
    display: inline-block;
    width: 50%;
    text-align: left;
    margin-top: 5px;
    margin-bottom:20px;
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
      font-size: 36px;
    }
    .unit{
      font-size: 36px;
      float: right;
      margin-right: 20px;
    }
  }
</style>
