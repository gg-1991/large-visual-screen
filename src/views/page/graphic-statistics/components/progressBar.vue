<template>
  <div>
    <ul class="progress">
      <li v-for="(item, index) in officeTransList" :key="index">
        <div class="title">{{item.officeName}}</div>
        <div class="progress-content">
          <div class="progressbar">
            <div class="bar bar-purple" :style="{ width: item.countRate + '%' }"></div>
          </div>
          <div class="bar-text bar-purple-text">
            {{item.count | formatNumber}}
          </div>
        </div>
        <div class="progress-content">
          <div class="progressbar">
            <div class="bar bar-blue" :style="{ width: item.amtRate + '%' }"></div>
          </div>
          <div class="bar-text bar-blue-text">
            {{item.totalAmt | formatNumber}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    officeTransList: {
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
  display: flex;
  flex-wrap: wrap;
  li{
    width: 50%;
    padding-bottom: 50px;
  }
}
.progress-content{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 60px;
}
.title{
  color: #FFFFFF;
  font-size: 28px;
  font-family:Alibaba PuHuiTi;
  font-weight:400;
  text-align: left;
  padding-bottom: 10px;
  padding-left: 60px;
  // height: 27px;
}
.progressbar{
  height: 20px;
  width: 480px;
  background: rgba(255,255,255,0.15);;
  border-radius: 10px;
  .bar{
    height: 100%;
    width: 0;
    position: relative;
    transition: all 2s ease 0s;
    -webkit-transition: all 2s ease 0s;
    border-radius: 10px;
  }
  .bar-blue{
    background: -webkit-gradient(linear, left top, 50% top, from(#5E99FA), to(#1A5BFF));
  }
  .bar-purple{
    background: -webkit-gradient(linear, left top, 50% top, from(#865AFF), to(#9218DC));
    
  }
}
.bar-text{
  font-size: 28px;
  font-family:DINPro;
  font-weight:500;
  // height: 25px;
} 
.bar-blue-text{
  color: rgba(72,148,254,1);
}
.bar-purple-text{
  color: #B946FF;
}
</style>