
//
// # AlgebraVector
//
// Abstract algebra vector.
//

var AlgebraTensor = require('./AlgebraTensor')
  , inherits      = require('inherits')
  , _             = require('underscore')

/**
 * Abstract Vector
 *
 * @param {Function} Element class
 * @param {Array} elements
 */

function AlgebraVector(Element, elements) {
  if (! (_.isArray(elements)))
    throw new TypeError()

  Object.defineProperty(this, 'dimension', {value: elements.length, writable: false})

  AlgebraTensor.call(this, Element, [this.dimension], elements)
}

inherits(AlgebraVector, AlgebraTensor)

module.exports = AlgebraVector

