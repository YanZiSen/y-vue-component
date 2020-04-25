import Vue from 'vue'
import Table from '../../components/table'
import yView from '../../src/index.js'
import './index.styl'
let mockjs = require('mockjs')
console.log(mockjs)
Vue.component(Table.name, Table)
Vue.use(yView)
let app = new Vue({
    el: '#app',
    data () {
        return {
            columns: [
                {key: 'name', title: '姓名'},
                {key: 'age', title: '年龄'},
                {key: 'address', title: '地址', slot: 'address'},
                {key: 'email', title: '邮编'}
            ],
            data: mockjs.mock({
                'list|5-10': [{
                    name: '@name',
                    age: '@integer',
                    address: '@csentence(12,28)',
                    email: '@email'
                }]
            }).list
        }
    }
})