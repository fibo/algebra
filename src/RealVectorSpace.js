
var AlgebraVectorSpace = require('./AlgebraVectorSpace')
  , RealElement        = require('./RealElement')
  , inherits           = require('inherits')

/**
 * Vector Space over R
 *
 * @param {Number} dimension
 */

function RealVectorSpace (dimension) {
  AlgebraVectorSpace.call(this, RealElement, dimension)
}

inherits(RealVectorSpace, AlgebraVectorSpace)

module.exports = RealVectorSpace

