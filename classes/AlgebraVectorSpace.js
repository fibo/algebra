//
// # AlgebraVVectorSpace
//

var AlgebraVector      = require('./AlgebraVector')
  , inherits           = require('inherits')
  , _                  = require('underscore')

function AlgebraVectorSpace(Element, dimension) {

  // dimension

  if (! (_.isNumber(dimension)))
    throw new TypeError()

  function getDimension () { return dimension }

  Object.defineProperty(this, 'dimension', {get: getDimension})

  // Vector

  function Vector () {
    var arg0 = arguments[0]
      , numArgs = arguments.length
      , elements = []

    if ((numArgs === 1) && (_.isArray(arg0)))
      elements = arg0

    if (numArgs > 1)
      for (var i in arguments)
        elements.push(arguments[i])

    AlgebraVector.call(this, Element, elements)
  }

  inherits(Vector, AlgebraVector)

  this.Vector = Vector
}

module.exports = AlgebraVectorSpace

