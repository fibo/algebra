require('strict-mode')(() => {
  const Boole = require('./src/Boole')
  exports.Boole = Boole

  const CompositionAlgebra = require('./src/CompositionAlgebra')
  exports.CompositionAlgebra = CompositionAlgebra

  const Cyclic = require('./src/Cyclic')
  exports.Cyclic = Cyclic

  const Scalar = require('./src/Scalar')
  exports.Scalar = Scalar

  const realField = require('./src/realField')

  const Real = CompositionAlgebra(realField, 1)
  const Complex = CompositionAlgebra(realField, 2)
  const Quaternion = CompositionAlgebra(realField, 4)
  const Octonion = CompositionAlgebra(realField, 8)

  exports.Real = Real
  exports.Complex = Complex
  exports.Quaternion = Quaternion
  exports.Octonion = Octonion

  const VectorSpace = require('./src/VectorSpace')
  const MatrixSpace = require('./src/MatrixSpace')

  exports.C = Complex
  exports.C2x2 = MatrixSpace(Complex)(2)
  exports.H = Quaternion
  exports.R = Real
  exports.R2 = VectorSpace(Real)(2)
  exports.R3 = VectorSpace(Real)(3)
  exports.R2x2 = MatrixSpace(Real)(2)

  exports.VectorSpace = VectorSpace
  exports.MatrixSpace = MatrixSpace
})
