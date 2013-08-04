
// AlgebraTensorSpace

function AlgebraTensorSpace(field, indices) {
  this.__defineGetter__('field', function () { return field })
  this.__defineGetter__('indices', function () { return indices })
}

module.exports = AlgebraTensorSpace

