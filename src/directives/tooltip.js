function getDocInnerWidth () {
    return document.documentElement.clientWidth
}

class Popper {
    constructor (baseDom, insertedDom, config) {
        if (typeof insertedDom === 'function') {
            insertedDom = insertedDom()
        }
        insertedDom.classList.add('y-popper')
        this.config = this.mergeConfig(config)
        if (this.config.effect === 'dark') {
            insertedDom.classList.add('dark')
        }
        this.position = 'top'
        this.state = {
            elements: {
                baseDom,
                insertedDom
            },
            baseDomRect: {},
            insertedDomRect: {},
            scrollParents: {},
            position: {}
        }
        this.bindScroll()
        this.update()
    }
    mergeConfig (config) {
        let defaultConfig = {
            effect: 'white'
        }
        return Object.assign(defaultConfig, config)
    }
    bindScroll () {
        let scrollList = this.getScrollParents()
        scrollList.forEach(scroll => {
            scroll.addEventListener('scroll', this.update.bind(this), false)
        })
    }
    getScrollParents () {
        let {baseDom: dom, insertedDom} = this.state.elements
        let list = []
        while ((dom.nodeName|| '').toLowerCase() !== 'body') {
            let domComputedStyle = getComputedStyle(dom)
            let overflow = domComputedStyle.overflow
            let overflowX = domComputedStyle.overflowX
            let overflowY = domComputedStyle.overflowY
            if (/auto|hidden|scroll|overlay/.test(overflow + overflowX + overflowY)) {
                list.push(dom)
            }
            dom = dom.parentNode
        }
        list.push(dom)
        this.state.scrollParents = list
        return list
    }
    update () {
        this.calcPosition()
        this.appendArrow()
        this.showPopper()
    }
    calcPosition () {
        let {baseDom, insertedDom} = this.state.elements
        // 获取popper元素和参考元素相对于视口的位置
        let baseDomRect = baseDom.getBoundingClientRect()
        let insertedDomRect = insertedDom.getBoundingClientRect()
        let docInnerWidth = getDocInnerWidth()
        let position = {
            // 这个地方有bug, 如果baseEle 顶在右边那么insertDom 会换行导致宽度变小，高度增加
            left: baseDomRect.width / 2 + baseDomRect.x - insertedDomRect.width / 2, 
            top: baseDomRect.y - insertedDomRect.height,
        }
        this.state.baseDomRect = baseDomRect
        this.state.insertedDomRect = insertedDomRect
        // 如果距离顶部的距离小于10 则重置为底部
        if (position.top < 10) {
            this.position = 'bottom'
            position.top = baseDomRect.y + baseDomRect.height
        }
        if (position.left < 0) { // 左侧超出重置
            position.left = 0
        }
        if (docInnerWidth < position.left + insertedDomRect.width) {
            position.left = docInnerWidth - insertedDomRect.width
        }

        this.state.position = position
    }
    appendArrow () { // 不用css是因为重置的问题，箭头位置不好把握, 中心可以始终以baseEle为中心
        let arrow = document.createElement('span')
        let arrowColor = this.config.effect === 'dark' ? 'rgba(0,0,0,.8)' : '#ddd'
        let offsetLeft = this.state.baseDomRect.x + this.state.baseDomRect.width / 2 - this.state.position.left 
        arrow.style.position = 'absolute'
        arrow.style.border = '8px solid transparent'
        arrow.style.left = offsetLeft - 8  + 'px'
        if (this.position === 'top') {
            arrow.style.bottom = '-16px'
            arrow.style.borderTopColor = arrowColor
        } else {
            arrow.style.top = '-16px'
            arrow.style.borderBottomColor = arrowColor
        }
        this.state.elements.insertedDom.appendChild(arrow)
        if (this.config.effect === 'white') {
            let topArrow = document.createElement('span')
            topArrow.style.position = 'absolute'
            topArrow.style.border = '7px solid transparent'
            topArrow.style.left = offsetLeft - 7 + 'px'
            if (this.position === 'top') {
                topArrow.style.bottom = '-14px'
                topArrow.style.borderTopColor = '#fff'
            } else {
                topArrow.style.top = '-14px'
                topArrow.style.borderBottomColor = '#fff'
            }
            this.state.elements.insertedDom.appendChild(topArrow)
        }
    }
    showPopper () {
        let {baseDom, insertedDom} = this.state.elements
        insertedDom.style.opacity = 1
        insertedDom.style.left = this.state.position.left + 'px'
        insertedDom.style.top = this.state.position.top + 'px'
    }
    destory () {
        let {baseDom, insertedDom} = this.state.elements
        this.state.scrollParents.forEach(scroll => {
            scroll.removeEventListener('scroll', this.update)
        })
        document.body.removeChild(insertedDom)
    }
}
export default {
    inserted (el, binding, vNode, oldNode) {
        console.log('tooltip-inserted')
        let parentEl = el.parentNode
        let {width} = el.getBoundingClientRect()
        let {width: parentWidth} = parentEl.getBoundingClientRect()
        let styles = getComputedStyle(parentEl)
        let paddingLeft = parseFloat(styles.paddingLeft) || 0
        let paddingRight = parseFloat(styles.paddingRight) || 0
        console.log('padding', paddingLeft, paddingRight)
        el._mouseOver = () => {
          el._popper = new Popper(parentEl, () => {
            let div = document.createElement('div')
            div.innerHTML = el.innerHTML
            div.style.position = 'fixed'
            div.style.opacity = 0
            div.style.maxWidth = '300px'
            document.body.appendChild(div)
            return div
          },{
              effect: binding.modifiers.dark ? 'dark' : 'white'
          })
          console.log('over')
        }
        el._mouseOut = () => {
          console.log('out')
          if (el._popper) {
            el._popper.destory()
            el._popper = null  
          }
          
        }
        if (width > (parentWidth - paddingLeft - paddingRight)) {
          el.addEventListener('mouseover', el._mouseOver, false)
          el.addEventListener('mouseout', el._mouseOut, false)
        }
    },
    componentUpdated (el, binding, vNode, oldNode) {
        let parentEl = el.parentNode
        let {width} = el.getBoundingClientRect()
        let {width: parentWidth} = parentEl.getBoundingClientRect()
        let styles = getComputedStyle(parentEl)
        let paddingLeft = parseFloat(styles.paddingLeft) || 0
        let paddingRight = parseFloat(styles.paddingRight) || 0
        el.removeEventListener('mouseover', el._mouseOver, false)
        el.removeEventListener('mouseout', el._mouseOut, false)
        if (width > parentWidth - paddingLeft - paddingRight) {
            el.addEventListener('mouseover', el._mouseOver, false)
            el.addEventListener('mouseout', el._mouseOut, false)
        } else {
            el.removeEventListener('mouseover', el._mouseOver, false)
            el.removeEventListener('mouseout', el._mouseOut, false)
        }
    },
    unbind (el, vNode) {
        el.removeEventListener('mouseover', el._mouseOver, false)
        el.removeEventListener('mouseout', el._mouseOut, false)
    }
}