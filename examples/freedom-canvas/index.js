import './index.styl'
import {generateUUID, performance} from '../../utils'
import sizeModule from './size'
import calcModule from './calc'
(function () {
    let drags = document.querySelectorAll('.drags')
    // 尺寸怎么和数据关联上
    Array.from(drags).forEach(drag => {
        let id = generateUUID()
        drag.dataset.uuid = id
        let size = drag.getBoundingClientRect()
        size.id = id
        sizeModule.addSize(size)
    })
    console.log(sizeModule.getSize())

    document.body.addEventListener('mousemove', performance.throttle((e) => {
        let id = sizeModule.findElement({
            x: e.pageX,
            y: e.pageY
        })
        if (id) {
            let el = document.querySelector("[data-uuid='" + id + "']")
            console.log(el)
        } else {
            console.log('not-match')
        }
    }, 300), false)
})()