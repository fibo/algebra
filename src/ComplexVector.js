
var AlgebraVector      = require('./AlgebraVector')
  , ComplexVectorSpace = require('./ComplexVectorSpace')
  , inherits           = require('inherits')

/**
 * Vector over the real field
 *
 * @param {Array} elements
 */

function ComplexVector(elements) {
  var space = new ComplexVectorSpace(elements.length)

  AlgebraVector.call(this, space, elements)
}

inherits(ComplexVector, AlgebraVector)

module.exports = ComplexVector

