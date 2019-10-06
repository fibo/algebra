const algebraCyclic = require('algebra-cyclic')

const Scalar = require('./Scalar.js')

/**
 * Create a Cyclic algebra.
 *
 * @param {String|Array} elements
 */

function Cyclic (elements) {
  return Scalar(algebraCyclic(elements))
}

module.exports = Cyclic
