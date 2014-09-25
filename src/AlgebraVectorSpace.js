
var AlgebraVector = require('./AlgebraVector')
  , inherits      = require('inherits')

/**
 * Vector Space over a field
 *
 * @param {Object} Element constructor
 * @param {dimension} number
 */

function AlgebraVectorSpace (Element, dimension) {
  var self = this

  this.Element = Element

  this.dimension = dimension

  /**
   * AlgebraVector constructor
   *
   * @return {Object} vector
   */

  function Vector (elements) {
    AlgebraVector.call(this, self, elements)
  }

  inherits(Vector, AlgebraVector)

  this.Vector = Vector
}

/**
 * Add vector element data
 *
 * @return {Array} data
 */

function addition (vector1, vector2) {
  var data = []
    , field = this.Element.field
    , element1
    , element2

  vector1.elements.forEach(function (element, i) {
    element1 = vector1.elements[i]
    element2 = vector2.elements[i]

    data.push(field.addition(element1, element2))
  })

  return data
}

AlgebraVectorSpace.prototype.addition = addition

module.exports = AlgebraVectorSpace

