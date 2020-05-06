<template>
  <div class="search-input-warpper">
      <input type="text" :style="{paddingRight: closeShow ? '60px': '30px'}" class="search-input" 
       @input="handleInput"
       @change="(e) => $emit('change', e.target.value)" ref="input" 
       @compositionstart = "handleCompositionStart"
       @compositionend = "handleCompositionEnd"
       @compositionupdate = "handleCompositionUpdate"
       @keydown.enter.prevent="search"
       placeholder="请输入关键字">
      <span class="el-icon-close search-close" v-if="closeShow" @click="clear"></span>
      <span class="el-icon-search search-btn" @click="search"></span>
  </div>
</template>

<script>
export default {
    props: {
        value: ''
    },
    model: {
        props: 'value',
        event: 'change'
    },
    computed: {
        nativeValue () {
            return this.value === null || this.value === undefined ? "" : String(this.value)
        }
    },
    data () {
        return {
            closeShow: !!this.value,
            isComposing: false
        }
    },
    watch: {
        nativeValue () {
            this.setNativeValue()
        }
    },
    methods: {
        handleCompositionStart () {
            // 触发与一段文字的输入之前
            console.log('compositionStart')
            this.isComposing = true
        },
        handleCompositionUpdate () {
            // 饿了么在此处对韩文做了处理
            console.log('compositionUpdate')
        },
        handleCompositionEnd (e) {
            // 当组成文本段落的组成完成或取消时触发
            console.log('compositionEnd')
            this.isComposing = false
            this.handleInput(e)
        },
        search () {
            this.$emit('search')
        },
        handleInput (e) {
            if (this.isComposing) {
                return
            }
            this.$emit('change', e.target.value)
            this.closeShow = !!e.target.value
            this.$nextTick(this.setNativeValue)
        },
        setNativeValue (e) {
            const input = this.$refs.input
            if (input.value === this.nativeValue) return;
            input.value = this.nativeValue
        },
        clear () {
            this.$emit('change', '')
            this.closeShow = false
            this.$emit('clear')
            this.search()
        }
    },
    mounted () {
        this.setNativeValue()
    }
}
</script>

<style lang="stylus">
.search-input-warpper
    vertical-align middle
    height 32px
    line-height 30px
    display inline-block
    // border 1px solid blockSplit
    position relative
    width 280px
    background-color #f6f6f6
    border-radius 16px
    margin-bottom 15px
    .search-input
        background-color transparent
        padding 0 10px
        border none
        outline none
        width 100%
    .search-close
        cursor pointer
        text-align center
        line-height 30px
        position absolute
        width 30px
        height 30px
        top 1px
        right 31px
    .search-btn
        cursor pointer
        // border-left 1px solid blockSplit
        text-align center
        line-height 30px
        position absolute
        width 30px
        height 30px
        top 1px
        right 1px
</style>