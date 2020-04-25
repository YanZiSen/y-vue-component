<script>
export default {
  name: 'cell',
  inject: ['tableRoot'],
  functional: true,
  props: {
    column: {},
    row: {},
    index: 0
  },
  render: (h, ctx) => {
    return h(
        'div',
        {
            class: {
                'text-flow': true
            }
        }, 
        // 获取父组件的所有作用域插槽节点 
        ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slot]({ 
            row: ctx.props.row,
            column: ctx.props.column,
            index: ctx.props.index
        })
    )
  }
}
</script>

<style lang="stylus">
</style>
