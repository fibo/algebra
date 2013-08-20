
var AlgebraTensor = require('./AlgebraTensor')
  , util          = require('util')
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

util.inherits(AlgebraVector, AlgebraTensor)

module.exports = AlgebraVector

