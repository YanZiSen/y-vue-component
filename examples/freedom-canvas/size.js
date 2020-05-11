let sizes = {}

function addSize (size) {
    sizes[size.id] = size
}

function getSize(id) {
    if (id) {
        return sizes[id]
    }
    return sizes
}

function findElement (point) {
    let id = void 0
    for (var key in sizes) {
        if (isPointIn(point, sizes[key])) {
            return key
        }
    }
}

function isPointIn (point, rect) {
    let startX = rect.x, startY = rect.y
    let endX = startX + rect.width
    let endY = startY + rect.height
    if (startX < point.x && point.x < endX && point.y > startY && point.y < endY) {
        return true
    }
}

export default {
    addSize,
    getSize,
    findElement
}

