
var AlgebraVector = require('./AlgebraVector')
  , RealField     = require('./RealField')
  , util          = require('util')

var real = new RealField()
  , elements = []

function RealVector() {

  if (arguments.length > 1)
    for (var i in arguments)
      elements.push(arguments[i])

  AlgebraVector.call(this, real, elements)
}

util.inherits(RealVector, AlgebraVector)

module.exports = RealVector

