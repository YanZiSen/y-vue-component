<template>
  <div class="card-list " :style="{'margin-right': -margin + 'px'}">
      <slot></slot>
  </div>
</template>

<script>
export default {
    props: {
        column: {
            type: Number,
            default: 5
        },
        margin: {
            type: Number,
            default: 20
        }
    },
    created () {
    },
    mounted () {
        // console.log('children', this.$children)
    }
}
</script>

<style lang="stylus">
.card-list
    padding 30px 0px
    &:after
      clear both 
</style>