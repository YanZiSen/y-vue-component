class Popper {
    constructor (baseDom, insertedDom, config) {
        if (typeof insertedDom === 'function') {
            insertedDom = insertedDom()
        }
        insertedDom.classList.add('y-popper')
        this.state = {
            elements: {
                baseDom,
                insertedDom
            },
            scrollParents: {},
            position: {}
        }
        this.bindScroll()
        this.update()
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
        this.showPopper()
    }
    calcPosition () {
        let {baseDom, insertedDom} = this.state.elements
        // 获取popper元素和参考元素相对于视口的位置
        let baseDomRect = baseDom.getBoundingClientRect()
        let insertedDomRect = insertedDom.getBoundingClientRect()
        let position = {
            left: baseDomRect.width / 2 + baseDomRect.x - insertedDomRect.width / 2,
            top: baseDomRect.y - insertedDomRect.height,
        }
        if (position.top < insertedDomRect.height) {
            position.top = baseDomRect.y + baseDomRect.height
            insertedDom.classList.remove('bottom')
            insertedDom.classList.add('top')
        } else {
            insertedDom.classList.remove('top')
            insertedDom.classList.add('bottom')
        }
        this.state.position = position
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
    inserted (el, vNode) {
        console.log('inserted')
        let parentEl = el.parentNode
        let {width} = el.getBoundingClientRect()
        let {width: parentWidth} = parentEl.getBoundingClientRect()
        el._mouseOver = () => {
          el._popper = new Popper(parentEl, () => {
            let div = document.createElement('div')
            div.innerHTML = el.innerHTML
            div.style.position = 'fixed'
            div.style.opacity = 0
            div.style.maxWidth = '300px'
            document.body.appendChild(div)
            return div
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
        if (width > parentWidth) {
          el.addEventListener('mouseover', el._mouseOver, false)
          el.addEventListener('mouseout', el._mouseOut, false)
        }
    },
    componentUpdated (el, vNode) {
        let parentEl = el.parentNode
        let {width} = el.getBoundingClientRect()
        let {width: parentWidth} = parentEl.getBoundingClientRect()
        el.removeEventListener('mouseover', el._mouseOver, false)
        el.removeEventListener('mouseout', el._mouseOut, false)
        el._mouseOver = () => {
            console.log('over')
        }
        el._mouseOut = () => {
            console.log('out')
        }
        if (width > parentWidth) {
            el.addEventListener('mouseover', el._mouseOver, false)
            el.addEventListener('mouseout', el._mouseOut, false)
        }
    },
    unbind (el, vNode) {
        el.removeEventListener('mouseover', el._mouseOver, false)
        el.removeEventListener('mouseout', el._mouseOut, false)
    }
}