
// RealVector

var AlgebraVector = require('./AlgebraVector')
  , RealField     = require('./RealField')
  , inherits      = require('inherits')
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

inherits(RealVector, AlgebraVector)

module.exports = RealVector

