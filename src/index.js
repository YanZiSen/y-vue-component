import Button from '../components/button/index.js'
import * as directives from './directives/index.js'
import './index.styl'

const components = {
    // yButton: Button
}

const install = (Vue) => {
    Object.keys(components).forEach(key => {
        Vue.component(key, components[key])
    })
    Object.keys(directives).forEach(key => {
        Vue.directive(key, directives[key])
    })
}

if (window && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    Button
}