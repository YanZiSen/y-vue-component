import './excecise.styl'

(function () {
    let el = document.getElementById('test1')
    let child = el.querySelectorAll('.drag-item')
    console.log('child', child)
    let dragItem,dropItem
    Array.from(child).forEach(item => {
        console.log(item)
        item.setAttribute('draggable', true)
        item.addEventListener('dragstart', (e) => { // 兼容火狐
            e.dataTransfer.setData('text/plain', null)
            e.target.style.opacity = 0.5
            dragItem = item
        }, false)
        item.addEventListener('selectstart', () => {
            return false
        }, false)
        // item.addEventListener('selectstart', () => {
        //     return false
        // }, false)
        item.addEventListener('dragenter', (e) => { // 所有元素默认不可放置，所以需要组织默认行为
            e.preventDefault()
        },false)
        item.addEventListener('dragover', (e) => {
            e.preventDefault()
        },false)
        item.addEventListener('drop', (e) => {
            dropItem = item
            console.log('dragItem', dragItem, 'dropItem', dropItem, 'parentNode', item.parentNode)
            let emptyNode = document.createElement('div')
            // parentNode.insertBefore(newNode, referenceNode)
            item.parentNode.insertBefore(emptyNode, dropItem)
            item.parentNode.insertBefore(dropItem, dragItem)
            item.parentNode.insertBefore(dragItem, emptyNode)
            item.parentNode.removeChild(emptyNode)
            console.log('el', e.dataTransfer.el)
            // return false
        }, false)
        item.addEventListener('dragend', (e) => {
            e.target.style.opacity = ''
            
        },false)
    })
})()