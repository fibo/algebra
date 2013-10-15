
// RealVector

var AlgebraVector = require('./AlgebraVector')
  , RealElement   = require('./RealElement')
  , inherits      = require('inherits')
  , _             = require('underscore')

function RealVector() {
  var arg0 = arguments[0]
    , numArgs = arguments.length
    , elements = []

  if ((numArgs === 1) && (_.isArray(arg0)))
    elements = arg0

  if (numArgs > 1)
    for (var i in arguments)
      elements.push(arguments[i])

  AlgebraVector.call(this, RealElement, elements)
}

inherits(RealVector, AlgebraVector)

module.exports = RealVector

