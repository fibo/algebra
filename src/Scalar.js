var CompositionAlgebra = require('./CompositionAlgebra')

function Scalar (field, n) {
  // TODO n must be a power of two
  return CompositionAlgebra(field)(n - 1)
}

module.exports = Scalar
