
var AlgebraTensorSpace = require('./AlgebraTensorSpace')
  , inherits           = require('inherits')
  , _                  = require('underscore')

function AlgebraMatrixSpace() {

  var field          = arguments[0]
    , arg1           = arguments[1]
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

  // inheritance

  AlgebraTensorSpace.call(this, field, dimensionArray)
}

inherits(AlgebraMatrixSpace, AlgebraTensorSpace)

module.exports = AlgebraMatrixSpace

