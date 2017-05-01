var algebraCyclic = require('algebra-cyclic')
var createScalar = require('./createScalar')

/**
 * Create a Cyclic algebra.
 *
 * @param {String|Array} elements
 */

function Cyclic (elements) {
  var ring = algebraCyclic(elements)

  return createScalar(ring)
}

module.exports = Cyclic
