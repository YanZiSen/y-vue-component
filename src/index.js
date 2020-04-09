import Button from '../components/button/index.js'

const components = {
    yButton: Button
}

const install = (Vue) => {
    Object.keys(components).forEach(key => {
        Vue.component(key, components.key)
    })
}

if (window && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    Button
}