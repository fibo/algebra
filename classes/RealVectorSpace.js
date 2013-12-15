
//
// # RealVectorSpace
//

var AlgebraVectorSpace = require('./AlgebraVectorSpace')
  , RealElement        = require('./RealElement')
  , inherits           = require('inherits')

function RealVectorSpace(dimension) {
  AlgebraVectorSpace.call(this, RealElement, dimension)
}

inherits(RealVectorSpace, AlgebraVectorSpace)

module.exports = RealVectorSpace

