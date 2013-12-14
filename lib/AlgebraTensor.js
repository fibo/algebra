
// # AlgebraTensor
//
// It is an abstract algebra tensor.
//

var _ = require('underscore')

function AlgebraTensor(Element, indices, elements) {
  if (arguments.length === 0)
    throw new Error()

  var zero
    , one
    , field

  // # Attributes
  //
  // ## Element

  try {
    zero = new Element(0)
    one  = new Element(1)
  }
  catch (ignore) {
    throw new TypeError()
  }

  function getElement () { return Element }

  Object.defineProperty(this, 'Element', {get: getElement})


  // ## field
  //
  // it is an instance of algebrafield
  //
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
      // it is mandatory to clone elements, so every element refer to its own 
      // object instance, otherwise can lead to weird behaviourswhen applying operators.
      elements[i] = element.clone()
    }
    else {
      try {
        // I suppose *element* is raw data
        elements[i] = new Element(element)
      }
      catch (err) { throw err }
    }
  }

  function getElements () { return elements }

  /* TODO; non mi piace molto, ma, mi serve per AlgebraMatrix per l momento
   magari dovrei solo abbellirla
   */

  function setElements (newElements) { elements = newElements }

  Object.defineProperty(this, 'elements', {get: getElements, set: setElements})


  // # data

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

function computeIndex (positions) {
  var index = positions[0]

  for (var i = 0; i < indices.length - 1; i++)
    index = index * indices[i] + positions[i + 1]

  return index
}

AlgebraTensor.prototype.computeIndex = computeIndex

module.exports = AlgebraTensor

