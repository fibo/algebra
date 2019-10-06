const algebraCyclic = require('algebra-cyclic')

const Ring = require('./Ring.js')

/**
 * Create a Cyclic algebra.
 *
 * @param {String|Array} elements
 */

function Cyclic (elements) {
  return Ring(algebraCyclic(elements))
}

module.exports = Cyclic
