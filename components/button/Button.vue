<template>
  <button class="y-button" :class="[size, type, {disabled: disabled}]" @click="click">
    <slot>测试按钮</slot>
  </button>
</template>

<script>
export default {
  name: 'yButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'blue'
    }
  },
  methods: {
    click () {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  mainColor = #229F84
  btnHoverColor = #27B898
  clickBlueColor = #1C856E
  clickWhiteColor = #229F84
clickStyle(bgColor)
  position absolute
  content ''
  top 0
  left 0
  width 100%
  height 100%
  background-image radial-gradient(circle, bgColor 100%, transparent 101%)
  background-repeat: no-repeat;
  transition transform 0.3s, opacity .5s
  opacity 0
  pointer-events none 
  user-select none
.y-button
  position relative
  display inline-block
  padding 0px 18px
  border-radius 4px
  border none
  outline none
  cursor pointer
  transition all .3s
  line-height 36px
  &.small
    line-height 32px
  &.blue
    background-color mainColor
    color #fff
    &:before
      clickStyle(clickBlueColor)
    &:hover
      background-color btnHoverColor
    &:active:before
      opacity 1
      transform scale(0, 0)
      transition 0s
    &.disabled
      background-color #C3C7C6
      cursor not-allowed
  &.white
    line-height 30px
    background-color #fff
    color mainColor
    border 1px solid #d5dae0
    &:before
      clickStyle(clickWhiteColor)
    &:hover
      border-color mainColor
      background-color #EBF8FD
    &.disabled
      background-color #f5f5f5
      border-color #f2f4f6
      color #ccc
      cursor not-allowed
    &:active:before
      opacity 1
      transform scale(0, 0)
      transition 0s
</style>
