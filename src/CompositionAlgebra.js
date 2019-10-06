const CayleyDickson = require('cayley-dickson')
const no = require('not-defined')

const Ring = require('./Ring.js')

/**
 * A composition algebra is one of ℝ, ℂ, ℍ, O:
 * Real, Complex, Quaternion, Octonion.
 *
 * https://en.wikipedia.org/wiki/Composition_algebra
 *
 * @param {Object} ringDefinition
 * @param {Number} [num] of CayleyDickson construction iterations. Can be 1, 2, 4 or 8.
 *
 * @returns {Object} Scalar
 */

function CompositionAlgebra (ringDefinition, num) {
  if (no(num)) num = 1

  const logBase2 = [1, 2, 4, 8].indexOf(num)

  if (logBase2 === -1) {
    throw new TypeError('Argument n must be 1, 2, 4 or 8')
  }

  return Ring(CayleyDickson(ringDefinition, logBase2))
}

module.exports = CompositionAlgebra
