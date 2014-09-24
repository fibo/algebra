
var AlgebraVector   = require('./AlgebraVector')
  , RealVectorSpace = require('./RealVectorSpace')
  , inherits        = require('inherits')

/**
 * Vector over the real field
 *
 * @param {Array} elements
 */

function RealVector () {
  var elements
    , space

  if (arguments.length > 1)
    elements = Array.prototype.slice.call(arguments, 0)
  else
    elements = arguments[0]

  space = new RealVectorSpace(elements.length)

  AlgebraVector.call(this, space, elements)
}

inherits(RealVector, AlgebraVector)

module.exports = RealVector

