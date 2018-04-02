var algebraRing= require('algebra-cyclic')
var createScalar = require('./createScalar')

/**
 * Create a Scalar.
 */

function Scalar (neutralElements, operators) {
  var ring = algebraRing(neutralElements, operators)
  console.log(operators.contains('00ff00'))
  console.log(ring.notContains('00ff00'))

  return createScalar(ring)
}

module.exports = Scalar
