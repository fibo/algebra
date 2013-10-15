
var AlgebraTensorSpace = require('./AlgebraTensorSpace')
  , AlgebraMatrix      = require('./AlgebraMatrix')
  , inherits           = require('inherits')
  , _                  = require('underscore')

function AlgebraMatrixSpace(Element) {

  var arg1 = arguments[1]
    , dimensionArray = []

  if (! (_.isNumber(arg1) || (_.isArray(arg1) && arg1.length === 2)))
    throw new TypeError()

  if (_.isNumber(arg1))
    dimensionArray = [arg1, arg1]

  if (_.isArray(arg1))
    dimensionArray = arg1

  // dimension

  function getDimension() { return dimensionArray[0] * dimensionArray[1] }

  Object.defineProperty(this, 'dimension', {get: getDimension})

  // Matrix

  function Matrix () {
    var arg0 = arguments[0]
      , numArgs = arguments.length
      , elements = []

    if ((numArgs === 1) && (_.isArray(arg0)))
      elements = arg0

    if (numArgs > 1)
      for (var i in arguments)
        elements.push(arguments[i])

    AlgebraMatrix.call(this, Element, elements)
  }

  inherits(Matrix, AlgebraMatrix)

  this.Matrix = Matrix

  // inheritance

  AlgebraTensorSpace.call(this, Element, dimensionArray)
}

inherits(AlgebraMatrixSpace, AlgebraTensorSpace)

module.exports = AlgebraMatrixSpace

