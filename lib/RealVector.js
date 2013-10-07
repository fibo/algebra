
// RealVector

var AlgebraVector = require('./AlgebraVector')
  , RealElement   = require('./RealElement')
  , inherits      = require('inherits')
  , _             = require('underscore')

function RealVector() {
  var elements = []

  if ((arguments.length === 1) && (_.isArray(arguments[0])))
    elements = arguments[0]

  if (arguments.length > 1)
    for (var i in arguments)
      elements.push(arguments[i])

  AlgebraVector.call(this, RealElement, elements)
}

inherits(RealVector, AlgebraVector)

module.exports = RealVector

