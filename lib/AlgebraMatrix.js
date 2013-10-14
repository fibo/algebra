
var AlgebraTensor = require('./AlgebraTensor')
  , inherits      = require('inherits')
  , _             = require('underscore')

function AlgebraMatrix(Element, elements) {

  // elements

  if (! (_.isArray(elements)))
    throw new TypeError()

  // inheritance

  AlgebraTensor.call(this, Element, [this.dimension], elements)
}

inherits(AlgebraMatrix, AlgebraTensor)

module.exports = AlgebraMatrix

