var CayleyDickson = require('cayley-dickson')
var createScalar = require('./createScalar')
var no = require('not-defined')

/**
 * A composition algebra is one of ℝ, ℂ, ℍ, O:
 * Real, Complex, Quaternion, Octonion.
 *
 * https://en.wikipedia.org/wiki/Composition_algebra
 *
 * @param {Object} field
 * @param {Number} [num] of CayleyDickson construction iterations. Can be 1, 2, 4 or 8.
 *
 * @returns {Object} Scalar
 */

function CompositionAlgebra (field, num) {
  if (no(num)) num = 1

  var logBase2 = [1, 2, 4, 8].indexOf(num)

  if (logBase2 === -1) {
    throw new TypeError('Argument n must be 1, 2, 4 or 8')
  }

  return createScalar(CayleyDickson(field, logBase2))
}

module.exports = CompositionAlgebra
