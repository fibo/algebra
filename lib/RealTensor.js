
// RealTensor

var AlgebraTensor = require('./AlgebraTensor')
  , RealField     = require('./RealField')
  , util          = require('util')

var real = new RealField()

function RealTensor(elements, indices) {
  AlgebraTensor.call(this, real, indices, elements)
}

util.inherits(RealTensor, AlgebraTensor)

module.exports = RealTensor

