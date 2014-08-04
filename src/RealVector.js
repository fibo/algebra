
//
// # RealVector
//
// Vector over the real field.
//
// ## Examples
//
// * [realVectors](../examples/realVectors.html)
//

var AlgebraVector   = require('./AlgebraVector')
  , RealVectorSpace = require('./RealField')
  , inherits        = require('inherits')

function RealVector(elements) {
  var space = new RealVectorSpace(elements.length)

  AlgebraVector.call(this, space, elements)
}

inherits(RealVector, AlgebraVector)

module.exports = RealVector

