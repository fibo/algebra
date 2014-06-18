
//
// # AlgebraVector
//
// Abstract algebra vector.
//

var AlgebraTensor = require('./AlgebraTensor')
  , inherits      = require('inherits')
  , _             = require('underscore')

function AlgebraVector(Element, elements) {

  //
  // ## Attributes
  //

  //
  // ### elements
  //

  if (! (_.isArray(elements)))
    throw new TypeError()

  //
  // ### dimension
  //

  function getDimension() { return elements.length }

  Object.defineProperty(this, 'dimension', {get: getDimension})

  /* inheritance */

  AlgebraTensor.call(this, Element, [this.dimension], elements)
}

inherits(AlgebraVector, AlgebraTensor)

module.exports = AlgebraVector

