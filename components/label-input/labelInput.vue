<template>
  <div class="label-input" :class="{large: size === 'large'}">
    <input :readonly="disabled" type="text" v-sel-init @mousedown.stop :value="value" @click.stop v-if="edit" ref="input" @input="(e) => $emit('change', e.target.value)" @blur="hideEdit" @keydown.enter="hideEdit">
    <span v-else @dblclick.prevent.stop="showEdit" class="label-input-text">{{value}}</span>
  </div>
</template>

<script>
export default {
  name: 'labelInput',
  props: {
    width: '',
    value: '',
    edit: false,
    disabled: false,
    size: {
      default: 'normal',
      type: String
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  methods: {
    showEdit () {
      this.$emit('switch-edit', true)
    },
    hideEdit () {
      this.$emit('switch-edit', false)
    }
  },
  directives: {
    selInit: {
      inserted (el) {
        el.select()
      }
    }
  },
  watch: {
    eidt: {
      immediate: true,
      handler (val) {
        if (val) {
          this.$refs.input.focus()
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '~css/const.styl'
.label-input
  text-align left
  width 160px
  display inline-block
  vertical-align middle
  &.large
    font-size 20px
  .label-input-text
    cursor pointer
    color fontLevelOne
    font-weight 500
</style>
