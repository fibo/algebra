
var AlgebraVectorSpace = require('./AlgebraVectorSpace')
  , ComplexElement     = require('./ComplexElement')
  , inherits           = require('inherits')

/**
 * Vector Space over C
 *
 * @param {Number} dimension
 */

function ComplexVectorSpace (dimension) {
  AlgebraVectorSpace.call(this, ComplexElement, dimension)
}

inherits(ComplexVectorSpace, AlgebraVectorSpace)

module.exports = ComplexVectorSpace

