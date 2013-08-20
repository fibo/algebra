
// RealVector

var AlgebraVector = require('./AlgebraVector')
  , RealField     = require('./RealField')
  , util          = require('util')
  , _             = require('underscore')

var real     = new RealField()

function RealVector() {
  var elements = []

  if ((arguments.length === 0) && (_.isArray(arguments[0])))
    elements = arguments[0]

  if (arguments.length > 1)
    for (var i in arguments)
      elements.push(arguments[i])

  AlgebraVector.call(this, real, elements)
}

util.inherits(RealVector, AlgebraVector)

module.exports = RealVector

