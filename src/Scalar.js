var CompositionAlgebra = require('./CompositionAlgebra')
var no = require('not-defined')

/**
 * Create a Scalar that belongs to a composition algebra.
 *
 * @param {Object} field
 * @param {Number} [n] must be 1, 2, 4 or 8.
 */

function Scalar (field, n) {
  if (no(n)) n = 1

  var logBase2 = [1, 2, 4, 8].indexOf(n)

  if (logBase2 === -1) {
    throw new TypeError('Argument n must be 1, 2, 4 or 8')
  }

  return CompositionAlgebra(field)(logBase2)
}

module.exports = Scalar
