<script>
export default {
  name: 'yPage',
  props: {
    total: {
      type: Number,
      default: 48
    },
    pageSize: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 1
    },
    pagerCount: { // 设置最大页码数
      type: Number,
      default: 5
    }
  },
  model: {
    prop: 'page',
    event: 'change'
  },
  render (h) {
    let self = this
    let pagesNum = Math.ceil(this.total / this.pageSize)
    // 左边从开头能显示到当前页就左边的三个点就没有
    // 右边从末尾能显示到当前页右边的三个点就没有
    let halfMedium = Math.ceil(this.pagerCount / 2)
    let fastForward = false, fastBack = false
    let pagesList = []
    if (pagesNum > this.pagerCount) {
      if (this.page <= halfMedium) { // 减一是减去三个点所占位置
        pagesList = Array(this.pagerCount - 1).fill('').map((item, idx) => {
          return idx + 1
        })
        pagesList.push(pagesNum) 
        fastForward = true
      } else if (this.page > pagesNum - halfMedium) {
        pagesList = Array(this.pagerCount - 1).fill('').map((item, idx) => {
          return pagesNum - halfMedium + idx
        }) 
        pagesList.unshift(1) 
        fastBack = true
      } else { // 有两个点所以减二
        pagesList = Array(this.pagerCount -2).fill('').map((item, idx) => {
          return this.page - Math.floor((this.pagerCount -2) / 2) + idx
        })
        pagesList.unshift(1) 
        pagesList.push(pagesNum) 
        fastForward = true
        fastBack = true
      }
    } else {
      pagesList = Array(pagesNum).fill('').map((item, idx) => {
        return idx + 1
      })
    }
    let children = pagesList.map((pageNum, index) => {
      return h('span', {
        class: {
          'y-page-item': true,
          'active': self.page === pageNum
        },
        domProps: {
          innerHTML: pageNum
        },
        on: {
          click () {
            console.log('change')
            self.$emit('change', pageNum)
          }
        }
      })
    })
    // 添加翻页
    let pre = h('span', {
      class: {
        'y-page-pre': true,
        'y-icon': true,
        'y-icon-arrow-ios-back': true,
        disabled: self.page === 1
      },
      on: {
        click () {
          if (self.page === 1) {
            return
          }
          self.$emit('change', self.page - 1)
        }
      }
    })
    let next = h('span', {
      class: {
        'y-page-next': true,
        'y-icon': true,
        'y-icon-arrow-ios-forward': true,
        disabled: self.page === pagesNum
      },
      on: {
        click () {
          if (self.page === pagesNum) {
            return
          }
          self.$emit('change', self.page + 1)
        }
      }
    })
    let fastForwardDom = h('span', {
      class: {
        'y-icon': true,
        'y-page-fast-forward': true,
        'y-icon-arrowhead-right': true
      },
      on: {
        click () {
          self.$emit('change', self.page + halfMedium)
        }
      }
    })
    let fastBackDom = h('span', {
      class: {
        'y-page-fast-back': true,
        'y-icon': true,
        'y-icon-arrowhead-left': true  
      },
       on: {
        click () {
          self.$emit('change', self.page - halfMedium)
        }
      }
    })
    let firstPage = h('span', {
      class: {
          'y-page-item': true,
          'active': self.page === 1
        },
        domProps: {
          innerHTML: 1
        },
        on: {
          click () {
            self.$emit('change', 1)
          }
        }
    })
    let lastPage = h('span', {
      class: {
          'y-page-item': true,
          'active': self.page === pagesNum
        },
        domProps: {
          innerHTML: pagesNum
        },
        on: {
          click () {
            self.$emit('change', 1)
          }
        }
    }) 
    if (fastForward) {
      children.splice(children.length - 1, 0, fastForwardDom)
    }
    if (fastBack) {
      children.splice(1, 0, fastBackDom)
    }
    children.unshift(pre)
    children.push(next)
    return h('div', {
      class: 'y-page-warpper'
    }, children)
  }
}
</script>

<style lang="stylus" scoped>
@import '~css/const.styl'
.y-page-warpper
  text-align center
  .y-page-item,.y-page-pre, .y-page-next, .y-page-fast-forward, .y-page-fast-back
    display inline-block
    cursor pointer
    height 24px
    width 24px
    line-height 24px
    text-align center
    border-radius 4px
    margin 0 5px
    &:hover
      color mainColor
  .y-page-item
    &.active
      background-color mainColor
      color #fff
  .y-page-pre, .y-page-next 
    &.disabled
      cursor not-allowed
</style>