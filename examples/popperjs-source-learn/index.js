import {createPopper} from '@popperjs/core/lib/popper'
// import {createPopper} from '@popperjs/core'
// import './promiseTest'
// poperjs 的基本功能， 
// placement：设置Popper元素的位置，overflowPreventing, 
// 防止被overflow：hidden，auto的元素盖住（只要参考元素在窗口中的话）
// flipping placement翻转，根据元素的位置计算，如果top不能显示出来就会翻转过来以bottom显示
// Popper 的生命周期，createPoper调用的时候初始化，然后修饰函数的效果开始执行，进入修饰函数的相关逻辑
// 在这个时候，可以拿到正常的定位数据，然后根据这些数据进行更新

let instance = createPopper(
    document.getElementById('button'), 
    document.getElementById('tooltip'), 
    {
        placement: 'right'
    }
)
console.log('poperInstance', instance)

// 源码解析 为什么比较undefined 会用void 0, undefined 不是保留字，在局部作用域中被赋值
// {
//     (function () {
//         let undefined = '123'
//         console.log(undefined === window.undefined)
//     })()
// }
let tip = document.createElement('div')
tip.innerHTML = `
    <p>这个是测试</p>
    <p>这个是测试</p>
`
let instance1 = createPopper(
    document.getElementById('reference'),
    tip,
    {
        placement: 'right'
    }
)

console.log('popperInstance', instance1)