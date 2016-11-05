const algebraCyclic = require('algebra-cyclic')
const createScalar = require('./createScalar')

/**
 * Create a Cyclic algebra.
 *
 * @param {String|Array} elements
 */

function Cyclic (elements) {
  const ring = algebraCyclic(elements)

  return createScalar(ring)
}

module.exports = Cyclic
