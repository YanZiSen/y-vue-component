import Vue from 'vue'
import Element from 'element-ui/src/index'

Vue.use(Element)

const app = new Vue({
    el: '#app',
    data () {
        return {
            data: []
        }
    }
})