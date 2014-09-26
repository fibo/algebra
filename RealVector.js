
var AlgebraVector   = require('./AlgebraVector')
  , RealVectorSpace = require('./RealVectorSpace')
  , inherits        = require('inherits')

/**
 * Vector over the real field
 *
 * @param {Array} elements
 */

function RealVector (elements) {
  var space = new RealVectorSpace(elements.length)

  AlgebraVector.call(this, space, elements)
}

inherits(RealVector, AlgebraVector)

module.exports = RealVector

