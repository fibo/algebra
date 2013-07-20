
var AlgebraTensor = require('./AlgebraTensor')
  , RealField     = require('./RealField')
  , util          = require('util')

var Real = new RealField()

function RealTensor(elements, indices) {
  AlgebraTensor.call(this, elements, indices, Real)
}

util.inherits(RealTensor, AlgebraTensor)

module.exports = RealTensor

