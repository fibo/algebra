const CompositionAlgebra = require('./CompositionAlgebra.js')

/**
 * Create a Scalar.
 */

function Scalar (ringDefinition) {
  return CompositionAlgebra(ringDefinition)
}

module.exports = Scalar
