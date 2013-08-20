
var AlgebraTensorSpace = require('./AlgebraTensorSpace')
  , util               = require('util')
  , _                  = require('underscore')

function AlgebraVectorSpace(field, dimension) {

  // dimension
  if (! (_.isNumber(dimension)))
    throw new Error()

  function getDimension() { return dimension }

  Object.defineProperty(this, 'dimension', {get: getDimension})

  AlgebraTensorSpace.call(this, field, [dimension])
}

util.inherits(AlgebraVectorSpace, AlgebraTensorSpace)

module.exports = AlgebraVectorSpace

