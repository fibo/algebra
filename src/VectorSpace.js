
var Space = require('./Space')

/**
 * Space of vectors
 *
 * ```
 * var V = VectorSpace(R)(2)
 *
 * var v = new V([1, 2])
 * ```
 *
 * @param {Object} Scalar
 *
 * @return {Function} Dimension
 */

function VectorSpace (Scalar) {

  /**
   * Dimension
   *
   * @param {Number} dimension
   *
   * @return {Constructor} Vector
   */

  function Dimension (dimension) {
    var Vector = Space(Scalar)([dimension])

    return Vector
  }

  return Dimension
}

module.exports = VectorSpace

