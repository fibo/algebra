
var AlgebraVector = require('./AlgebraVector')
  , RealField    = require('./RealField')
  , RealTensor    = require('./RealTensor')
  , util          = require('util')

var real = new RealField()

function RealVector() {
  AlgebraVector.call(this, real, arguments)
}

util.inherits(RealVector, AlgebraVector)

module.exports = RealVector

