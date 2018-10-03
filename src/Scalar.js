const algebraRing = require('algebra-ring')
const createScalar = require('./createScalar')

/**
 * Create a Scalar.
 */

function Scalar (neutralElements, operators) {
  const ring = algebraRing(neutralElements, operators)

  return createScalar(ring)
}

module.exports = Scalar
