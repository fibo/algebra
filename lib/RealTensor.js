
// RealTensor

var AlgebraTensor = require('./AlgebraTensor')
  , RealField     = require('./RealField')
  , inherits      = require('inherits')

var real = new RealField()

function RealTensor(elements, indices) {
  AlgebraTensor.call(this, real, indices, elements)
}

inherits(RealTensor, AlgebraTensor)

module.exports = RealTensor

