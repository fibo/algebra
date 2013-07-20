
function AlgebraTensor(elements, indices, field) {
  this.elements = elements
  this.indices  = indices
  this.field    = field
}

function addition(a, b) {
  for (var i in a.elements)
    this.field(a.elements[i], b.elements[i])

  return this
}
AlgebraTensor.prototype.addition = addition
AlgebraTensor.prototype.add      = addition

module.exports = AlgebraTensor

