const algebraRing = require('algebra-cyclic')
const createScalar = require('./createScalar')

/**
 * Create a Scalar.
 */

function Scalar (neutralElements, operators) {
  const ring = algebraRing(neutralElements, operators)

  return createScalar(ring)
}

module.exports = Scalar
