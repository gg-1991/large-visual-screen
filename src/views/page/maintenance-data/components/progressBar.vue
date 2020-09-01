<template>
  <div>
    <span class="unit">单位：%</span>
    <ul class="progress">
      <li v-for="(item, index) in officeTroubleList" :key="index">
        <div class="progress-content">
          <div class="bar-text bar-text-left">
            {{item.officeName}} ({{item.faultCount}})
          </div>
          <div class="progressbar">
            <div class="bar bar-purple" :style="{ width: item.faultRatio + '%' }"></div>
          </div>
          <div class="bar-text bar-text-right">
            {{item.faultRatio}}%
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    officeTroubleList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.progress{
  height: 760px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.progress-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.progressbar{
  height: 20px;
  width: 740px;
  background: rgba(255,255,255,0.15);;
  border-radius: 10px;
  margin: 0 20px;
  .bar{
    height: 100%;
    width: 0;
    position: relative;
    transition: all 2s ease 0s;
    -webkit-transition: all 2s ease 0s;
    border-radius: 10px;
  }
  .bar-purple{
    background: -webkit-gradient(linear, left top, 50% top, from(#865AFF), to(#9218DC));
  }
}
.bar-text{
  font-size: 28px;
  font-family:DINPro;
  font-weight:500;
  flex: 1;
  color: #fff;
} 
.bar-text-left{
  text-align: right;
}
.bar-text-right{
  text-align: left;
}
.unit{
  font-size: 24px;
  font-family: Alibaba PuHuiTi;
  font-weight: 400;
  color: #67849F;
  padding: 25px 0 20px 20px;
  display: inline-block;
  text-align: left;
  width: 100%;
}
</style>