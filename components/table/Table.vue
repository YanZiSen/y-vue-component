<template>
  <div class="y-table">
    <div class="y-table-title">
      <div class="y-row title">
        <div class="y-column" v-for="(column, index) in columns" :key="index" :style="style(column)">
          <span v-if="column.type !== 'selection'">{{column.title}}</span>
          <el-checkbox :value="isSelectAll" @change="changeSelectAll" v-else></el-checkbox>
        </div>
      </div>
    </div>
    <div class="y-table-body" v-if="data.length" :style="bodyStyle">
      <div v-for="(row, index) in rebuildData" :key="index" class="y-row">
        <div v-for="(column, colIndex) in columns" :key="colIndex" class="y-column" :style="style(column)">
          <el-checkbox v-if="column.type==='selection'" :value="row._checked" @change="changeSel(index, arguments)"></el-checkbox>
          <span v-else-if="!column.slot" class="innert-text">
            {{row[column.key]}}
          </span>
          <cell v-else :column="column" :row="row" :index="index"></cell>
        </div>
      </div>
    </div>
    <div v-else class="table-no-data">
      <slot name="empty"></slot>
    </div>
  </div>
</template>

<script>
import cell from './cell.vue'
export default {
  name: 'yTable',
  provide () {
    return {
      tableRoot: this
    }
  },
  components: {cell},
  computed: {
    bodyStyle () {
      if (this.height) {
        return {
          overflow: 'auto',
          height: `${this.height - 41}px`
        }
      }
    }
  },
  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    height: {
      type: Number
    },
    count: { // 用于数组监听不到的情况的兼容处理 arr[index] = newVal arr.length change
      type: Number
    }
  },
  data () {
    return {
      isSelectAll: false,
      rebuildData: []
    }
  },
  watch: {
    data : {
      deep: true,
      handler (val) {
        if (val) {
          this.createRebuildData()
        }
      }
    },
    count () {
      this.createRebuildData()
    }
  },
  created () {
    this.createRebuildData()
  },
  methods: {
    getChecked () {
      let checkList = this.rebuildData.filter(item => item._checked)
      return JSON.parse(JSON.stringify(checkList))
    },
    createRebuildData () {
      this.rebuildData = JSON.parse(JSON.stringify(this.data)).map(item => {
        item._checked = false
        return item
      })
    },
    changeSelectAll (status) {
      this.isSelectAll = status
      this.rebuildData = this.rebuildData.map(item => {
        item._checked = status
        return item
      })
    },
    changeSel (rowIndex, arg) {
      this.rebuildData[rowIndex]._checked = arg[0]
      this.isSelectAll = this.rebuildData.every(item => item._checked)
    },
    style (column) {
      if (column.width) {
        return {
          flex: `0 0 ${column.width}px`,
          paddingRight: column.type === 'selection' ? 0 : '30px'
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.textOverflow
  text-overflow ellipsis
  overflow hidden
  white-space nowrap
.y-table
  border 1px solid #D5DAE0
  border-radius 4px
  overflow hidden
  .y-table-title
    height 45px
    line-height 44px
    background-color #fafafa
    color fontLevelThree
    .y-row
      line-height 44px
  .y-row
    line-height 40px
    display flex
    border-bottom 1px solid #d5dae0
    cursor default
    .y-column
      flex 1
      padding 0px 20px
      @extends .textOverflow
  .y-table-body
    color fontLevelOne
    .y-row:last-child
      border-bottom none
    .y-row:hover
      background-color #f6f6f7
  .table-no-data
    text-align center
    padding 30px 0px
</style>
