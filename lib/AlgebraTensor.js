
var AlgebraElement = require('./AlgebraElement')
  , AlgebraField   = require('./AlgebraField')
  , _             = require('underscore')

function AlgebraTensor(field, indices, elements) {
  if (arguments.length === 0)
    throw new Error()

  // field
  if (! (field instanceof AlgebraField))
    throw new Error()

  function getField() { return field }
  Object.defineProperty(this, 'field', {get: getField})

  // elements
  if ((_.isUndefined(elements)))
    elements = []

  if (! (_.isArray(elements)))
    throw new Error()

  for (var i in elements) {
    var element = elements[i]
    if (element instanceof AlgebraElement) {
      elements[i] = element.data
    }
  }

  function getElements() { return elements }
  Object.defineProperty(this, 'elements', {get: getElements})

  // indices
  function getIndices() { return indices || [0] }
  Object.defineProperty(this, 'indices', {get: getIndices})
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

