<template>
  <div class="y-flex-table">
    <table class="y-table">
      <thead class="t-head" :class="{ 'max-height': maxHeight }">
        <tr>
          <th class="t-th" v-for="(column, idx) in columns" :key="idx" :style="{ width: column.width + 'px' }">
            {{ column.title }}
            <span v-if="column.rules && column.rules.required" style="color:red;">*</span>
          </th>
        </tr>
      </thead>
      <tbody class="t-body" v-if="data.length">
        <tr class="t-tr" v-for="(item, idx) in data" :key="item.id">
          <td class="t-td" v-for="(c, index) in columns" :key="index + ',' + c.name + ',' + idx" :style="{ width: c.width + 'px' }">
            <!-- <validation-provider :rules="c.rules" :name="c.name" v-slot="{ failed }"> 
              <input v-else type="text" v-model="item[c.name]" class="t-input" :class="{ 'has-error': failed }"/> -->
              <component class='t-input' @hide-popper='hidePopper'
               @show-popper='showPopper' :is="componentMap[c.type] || 'el-input'" v-model="item[c.name]"/>            
            <!-- </validation-provider> -->
          </td>
        </tr>
        <!-- <el-tooltip effect='dark' placement="top" ref="tooltip" :content="tooltipContent"></el-tooltip> -->
      </tbody>
    </table>
    <div id="popper-warpper"></div>
    <div class="t-nodata" v-if="!data.length">
      暂无数据
    </div>
  </div>
</template>

<script>
import Txt from './Text'
import {Tooltip} from 'element-ui'
import Vue from 'vue'
import {throttle, debounce} from 'throttle-debounce'
export default {
  name: "flex-table",
  props: {
    dictMap: {
      type: Object,
      default() {
        return {};
      }
    },
    canAdd: {
      type: Boolean,
      default: true
    },
    type: {
      type: String
    },
    maxHeight: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {Txt},
  computed: {
    componentMap() {
      return {
        'input': 'el-input',
        'select': 'el-select',
        'date': 'el-date-picker',
        'text': 'txt'
      }
    }
  },
  data() {
    return {
      tooltipContent: ''
    };
  },
  methods: {
    showPopper ({txt, referEle}) {
      console.log('txt', txt);
      this._popper.content = txt;
      this._popper.referenceElm = referEle;
      // debugger
      this._popper.$refs.popper.style.display = 'none';
      this._popper.doDestroy();
      this._popper.setExpectedState(true);
      this.activateTooltip(this._popper);
    },
    hidePopper () {
      console.log('hide-popper')
      if (this._popper) {
        this._popper.setExpectedState(false);
        this._popper.handleClosePopper();
      }
    }
  },
  created () {
 
  },
  updated () {
    console.log('updated');
  },
  mounted () {
    this.activateTooltip = debounce(120, tooltip => tooltip.handleShowPopper());
    let Popper = Vue.extend(Tooltip);
    this._popper = new Popper();
    this._popper.$mount(document.querySelector('#popper-warpper'));
  }
};
</script>

<style lang="stylus" scoped>
.y-flex-table
    position relative
    .delete
      line-height 30px
      text-align center
      .el-icon-minus
          background-color #E21F44
          border-radius 15px
          width 20px
          height 20px
          line-height 20px
          font-weight bold
          color #fff
          cursor pointer
    .y-table
        width 100%
        table-layout fixed
        border-collapse collapse
        .t-head
            overflow hidden
            background-color #ededed
            .t-th
                font-weight normal
                font-size 14px
                padding 8px 0px
                text-align center
                border-right 1px solid #d8d8d8
                &:first-child
                    border-left 1px solid #d8d8d8
        .t-body
            border-left 1px solid #d8d8d8
            border-right 1px solid #d8d8d8
            .t-tr
                height 40px
                border-bottom 1px solid #d8d8d8
                .t-td
                    height 38px
                    line-height 38px
                    padding 0 2px
                    text-align center
                    border-left 1px solid #d8d8d8
                    &:first-child
                        border-left 0 none
                    .t-input
                        box-sizing border-box
                        border: 1px solid transparent;
                        outline: none;
                        text-align: center;
                        line-height: 32px;
                        width: 100%;
                        vertical-align: middle;
                        &.has-error
                            border-color red;
                    >>>.el-input
                      .el-input__inner
                        border none 
                    .uploader
                        color #078DF9
                        .el-icon-upload2,.el-icon-edit
                            cursor pointer
                            margin-right 20px
                        .el-icon-document
                            cursor pointer
    .t-nodata
        border 1px solid #d8d8d8
        padding 12px 0px
        text-align center

    .t-opt
        margin-top 13px
        .el-icon-plus
            cursor pointer
            color #078DF9
            font-size 16px
            line-height 20px
            &:before
                display inline-block
                vertical-align middle
                font-weight bold
                font-size 12px
                margin-top: -4px;
                margin-right 10px
                background-color #078DF9
                border-radius 50%
                color #fff
                line-height 20px
                text-align center
                width 20px
    .y-table-img
        max-width 600px
        max-height 600px
</style>
