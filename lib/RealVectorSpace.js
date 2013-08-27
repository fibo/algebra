
// RealVectorSpace

var AlgebraVectorSpace = require('./AlgebraVectorSpace')
  , RealField          = require('./RealField')
  , inherits           = require('inherits')

var real = new RealField()

function RealVectorSpace(dimension) {
  AlgebraVectorSpace.call(this, real, dimension)
}

inherits(RealVectorSpace, AlgebraVectorSpace)

module.exports = RealVectorSpace

