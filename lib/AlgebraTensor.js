
var AlgebraElement = require('./AlgebraElement')
  , AlgebraField   = require('./AlgebraField')
  , _              = require('underscore')

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
      try {
        element.field === field
      }
      catch(err) {
        throw err
      }
    }
    else {
      elements[i] = element.data
    }
  }

  // elements
  function getElements() { return elements }
  Object.defineProperty(this, 'elements', {get: getElements})

  // data
  function getData() {
    var data = []

    for (var i in elements) {
	    console.log(elements)
      data.push(elements[i].data)

    }

    return data
  }
  Object.defineProperty(this, 'data', {get: getData})

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

