
// RealVectorSpace

var AlgebraVectorSpace = require('./AlgebraVectorSpace')
  , RealField          = require('./RealField')
  , util               = require('util')

var real = new RealField()

function RealVectorSpace(dimension) {
  AlgebraVectorSpace.call(this, real, dimension)
}

util.inherits(RealVectorSpace, AlgebraVectorSpace)

module.exports = RealVectorSpace

