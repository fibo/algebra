
var AlgebraTensorSpace = require('./AlgebraTensorSpace')
  , AlgebraVector      = require('./AlgebraVector')
  , inherits           = require('inherits')
  , _                  = require('underscore')

function AlgebraVectorSpace(Vector, dimension) {

  // dimension

  if (! (_.isNumber(dimension)))
    throw new TypeError()

  function getDimension () { return dimension }

  Object.defineProperty(this, 'dimension', {get: getDimension})

  // inheritance

  AlgebraTensorSpace.call(this, Vector, [dimension])
}

inherits(AlgebraVectorSpace, AlgebraTensorSpace)

module.exports = AlgebraVectorSpace

