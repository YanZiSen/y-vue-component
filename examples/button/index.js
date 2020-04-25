import Vue from 'vue'
import yview from '../../src/index.js'
import App from './app'
Vue.use(yview)

window.app = new Vue({
    el: '#app',
    components: {App},
    template: '<App/>'
})