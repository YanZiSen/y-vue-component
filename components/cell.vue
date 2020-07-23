<template>
  <div class="cell" :style="style">
      <slot></slot>
  </div>
</template>

<script>
export default {
    computed: {
        style () {
            return {
                width: this.width,
                marginRight: this.margin,
                float: 'left'
            }
        }
    },
    data () {
        return {
            width: '', 
            margin: ''
        }
    },
    methods: {
        setStyle (pWidth, margin, column) {
            this.width = (pWidth / column - margin).toFixed(2) + 'px'
            this.margin = margin + 'px'
        }
    },
    mounted () {
        let pWidth = this.$parent.$el.clientWidth
        let {margin, column} = this.$parent.$options.propsData
        this.setStyle(pWidth, margin, column)
    }
}
</script>

<style>

</style>