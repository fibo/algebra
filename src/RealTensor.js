
//
// # RealTensor
//
// Tensor over the real field.
//

var AlgebraTensor = require('./AlgebraTensor')
  , RealElement   = require('./RealElement')
  , inherits      = require('inherits')

function RealTensor(elements, indices) {
  AlgebraTensor.call(this, RealElement, indices, elements)
}

inherits(RealTensor, AlgebraTensor)

module.exports = RealTensor

