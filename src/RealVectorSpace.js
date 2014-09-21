
var AlgebraVectorSpace = require('./AlgebraVectorSpace')
  , RealField          = require('./RealField')
  , inherits           = require('inherits')

/**
 * Vector Space over R
 *
 * @param {Number} dimension
 */

function RealVectorSpace (dimension) {
  AlgebraVectorSpace.call(this, RealField, dimension)
}

inherits(RealVectorSpace, AlgebraVectorSpace)

module.exports = RealVectorSpace

