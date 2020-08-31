<template>
   <el-dialog title="近7天所有报障单详情" :visible.sync="visible" height="1200px" :before-close="hide" :close-on-click-modal="false" :close-on-press-escape="false" width="60%">
       <el-table :data="gridData" :cell-class-name="tableCellClassName" height="1200px" border stripe @close="hide">
         <el-table-column property="date" label="报障单ID"></el-table-column>
         <el-table-column property="name" label="报障社区名称"></el-table-column>
         <el-table-column property="address" label="报障时间"></el-table-column>
         <el-table-column property="address" label="设备编号"></el-table-column>
         <el-table-column property="address" label="故障类型"></el-table-column>
         <el-table-column property="address" label="分配时间"></el-table-column>
         <el-table-column property="address" label="分配耗时"></el-table-column>
         <el-table-column property="address" label="接单时间"></el-table-column>
         <el-table-column property="address" label="完成修复时间"></el-table-column>
         <el-table-column property="address" label="维修耗时"></el-table-column>
         <el-table-column property="address" label="整体完成耗时"></el-table-column>
         <el-table-column property="address" label="确认验收时间"></el-table-column>
         <el-table-column property="address" label="报障单状态"></el-table-column>
       </el-table>
     </el-dialog>
</template>
<script>
export default {
  name: 'TablePop',
  props: {
    gridData:{
      type:Array,
      default () {
        return []
      }
    },
    value: {
      type: Boolean,
      default () {
        return false
      }
    },
    type: {
      type: Number,
      default () {
        return 1
      }
    },
  },
  watch: {
    value (val) {
      if (val) {
        this.visible = val
        this.dataType = this.type
      }
    }
  },
  data () {
    return {
      visible:this.value,
      dataType: this.type
    }
  },
  created() {
    this.setData()
  },
  methods: {
    setData () {
    },
    tableCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === this.dataType && this.dataType === 6) {
        return 'warning-row-6'
      } else if (columnIndex === this.dataType && this.dataType === 9) {
        return 'warnimg-row-9'
      } else if(columnIndex === this.dataType && this.dataType === 10) {
        return 'warnimg-row-10'
      }else if(columnIndex === this.dataType && this.dataType === 4) {
        return 'warnimg-row-4'
      }
      return ''
    },
    hide() {
      this.visible = false
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped>
   /deep/ .el-table .warning-row {
    color: red;
  }
  /deep/ .el-table td, .el-table th{
    padding: 20px 0
  }
  /deep/ .el-table .cell{
    line-height: 40px;
  }
  /deep/  .el-table th, .el-table tr{
    border-top: 1px solid #EBEEF5;
  }
  /deep/.el-dialog__title{
    font-size:40px;
  }
  /deep/.el-table thead th, .el-table  thead tr{
    background-color: #EAF2F8;
    color:#000;
  }
   /deep/ .el-table .warning-row-6 {
    color: #4593FF;
  }
   /deep/ .el-table .warnimg-row-9 {
    color: #06C0E1;
  }
   /deep/ .el-table .warnimg-row-10 {
    color:#B945FF;
  }
  /deep/ .el-table .warnimg-row-4 {
    color:#FF9F2E;
  }
</style>
