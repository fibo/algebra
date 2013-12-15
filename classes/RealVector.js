
//
// # RealVector
//
// It is a vector over the real field
//
// ## Examples
//
// * [realVectors](../examples/realVectors.html)
//

// ## Imports

var AlgebraVector = require('./AlgebraVector')
  , RealElement   = require('./RealElement')
  , inherits      = require('inherits')
  , _             = require('underscore')

// ## Constructor

function RealVector() {
  var arg0 = arguments[0]
    , numArgs = arguments.length
    , elements = []

  if ((numArgs === 1) && (_.isArray(arg0)))
    elements = arg0

  if (numArgs > 1)
    for (var i in arguments)
      elements.push(arguments[i])

// ## Inheritance

  AlgebraVector.call(this, RealElement, elements)
}

inherits(RealVector, AlgebraVector)

module.exports = RealVector

