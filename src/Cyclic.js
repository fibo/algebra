var Scalar = require('./Scalar')
var algebraCyclic = require('algebra-cyclic')

/**
 * Create a Cyclic algebra.
 *
 * @param {String|Array} elements
 * @param {Number} [n] must be 1, 2, 4 or 8.
 */

function Cyclic (elements, n) {
  var cyclicRing = algebraCyclic(elements)

  return Scalar(cyclicRing, n)
}

module.exports = Cyclic
