import Vue from 'vue'
import FlexTable from '../../components/flex-table'
import Element from 'element-ui'
import mock from 'mockjs'
import 'element-ui/lib/theme-chalk/index.css'
Vue.component(FlexTable.name, FlexTable);
Vue.use(Element);
const columnsJrCompanyShareholder = [
    {title: 'input列', name: 'input1'},
    {title: 'input列2', name: 'input2'},
    {title: 'input列3', name: 'input3'},
    {title: 'text列3', name: 'text', type: 'text'},
    {title: '选择框列', name: 'select', type: 'select', selListId: 'cert'},
    {title: '上传文件列', name: 'file',type: 'upload'},
    {title: '日期列', name: 'date', type: 'date'}
];
const data = mock.mock({
    'list|8-15':[{
        'input1': '@cname',
        'input2': '@name',
        'input3': '@province',
        'text': '@word(20, 50)',
        'select': "@pick(['a', 'e', 'i', 'o', 'u'])",
        'file': null,
        'date': '@date'
    }]
}).list;
console.log({data});
const APP = new Vue({
    el: '#app',
    data () {
        return {
            columnsJrCompanyShareholder,data
        }
    }
})