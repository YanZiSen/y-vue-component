function debounce (fn, delay) { // 防抖
    let timer
    return function () {
        let args = arguments
        if (timer) {
            setTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(null, args)
        }, delay)
    }
}

function throttle (fn, interval, config) {
    let start = Date.now(), timer = null, args 
    return function () {
        args = arguments // 保存最后参数
        if (timer) {
            return 
        } else {
            timer = setTimeout(() => {
                fn.apply(null, args)
                start = Date.now()
                timer = null
            }, interval)
        }
    }
}

export default {
    throttle,
    debounce
}