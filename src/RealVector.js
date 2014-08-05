
var AlgebraVector   = require('./AlgebraVector')
  , RealVectorSpace = require('./RealField')
  , inherits        = require('inherits')

/**
 * Vector over the real field
 */

function RealVector(elements) {
  var space = new RealVectorSpace(elements.length)

  AlgebraVector.call(this, space, elements)
}

inherits(RealVector, AlgebraVector)

module.exports = RealVector

