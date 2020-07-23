import Sortable from 'sortablejs'

console.log('Sortable', Sortable)

let el = document.getElementById('draggable-container')

let sortable = new Sortable(el)