import Sortable from 'sortablejs'

(function () {
    let el = document.getElementById('items')
    var sortable = Sortable.create(el)
    let elChild = document.getElementById('item-childs')
    var sortableChild = Sortable.create(elChild)
})()