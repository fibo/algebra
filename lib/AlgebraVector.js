
var AlgebraTensor = require('./AlgebraTensor')
  , inherits      = require('inherits')
  , _             = require('underscore')

function AlgebraVector(field, elements) {

  if (_.isUndefined(elements))
    elements = [real.zero]

  if (! (_.isArray(elements)))
    throw new Error()

  // dimension
  function getDimension() { return elements.length }

  Object.defineProperty(this, 'dimension', {get: getDimension})

  AlgebraTensor.call(this, field, [this.dimension], elements)
}

inherits(AlgebraVector, AlgebraTensor)

module.exports = AlgebraVector

