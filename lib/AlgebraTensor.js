
AlgebraField = require('./AlgebraField')

function AlgebraTensor(field, indices, elements) {
  if (arguments.length === 0)
    throw new Error('Wrong signature')

  this.elements = elements
  this.indices  = indices || [0]

  this.__defineGetter__('field', function () {
    return field
  })
}

function addition(tensor) {
  for (var i in this.elements)
    this.elements[i].addition(tensor.elements[i])

  return this
}
AlgebraTensor.prototype.addition = addition
AlgebraTensor.prototype.add      = addition

function subtraction(tensor) {
  for (var i in this.elements)
    this.elements[i].subtraction(tensor.elements[i])

  return this
}
AlgebraTensor.prototype.subtraction = subtraction
AlgebraTensor.prototype.sub         = subtraction

module.exports = AlgebraTensor

