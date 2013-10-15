
var _ = require('underscore')

function AlgebraTensor(Element, indices, elements) {
  if (arguments.length === 0)
    throw new Error()

  var zero
    , one
    , field

  // Element

  try {
    zero = new Element(0)
    one  = new Element(1)
  }
  catch (ignore) {
    throw new TypeError()
  }

  function getElement () { return Element }

  Object.defineProperty(this, 'Element', {get: getElement})

  // field

  field = one.field

  function getField() { return field }

  Object.defineProperty(this, 'field', {get: getField})

  // elements

  if ((_.isUndefined(elements)))
    elements = []

  if (! (_.isArray(elements)))
    throw new TypeError()

  for (var i in elements) {
    var element = elements[i]

    if (element instanceof Element) {
      elements[i] = new Element(element.field, element.data)
    }
    else {
      try {
        elements[i] = new Element(element)
      }
      catch (err) { throw err }
    }
  }

  function getElements () { return elements }

  // TODO; non mi piace molto, ma, mi serve per AlgebraMatrix per l momento
  function setElements (newElements) { elements = newElements }

  Object.defineProperty(this, 'elements', {get: getElements, set: setElements})


  // data

  function getData () {
    var data = []

    for (var i in elements) {
      data.push(elements[i].data)
    }

    return data
  }

  Object.defineProperty(this, 'data', {get: getData})

  // indices

  if (_.isUndefined(indices))
    indices = [0]

  function getIndices () { return indices }

  Object.defineProperty(this, 'indices', {get: getIndices})
}

function addition (tensor) {
  for (var i in this.elements)
    this.elements[i].addition(tensor.elements[i])

  return this
}
AlgebraTensor.prototype.addition = addition
AlgebraTensor.prototype.add      = addition

function subtraction (tensor) {
  for (var i in this.elements)
    this.elements[i].subtraction(tensor.elements[i])

  return this
}
AlgebraTensor.prototype.subtraction = subtraction
AlgebraTensor.prototype.sub         = subtraction

module.exports = AlgebraTensor

