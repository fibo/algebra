require('strict-mode')(() => {
  var Boole = require('./src/Boole')
  exports.Boole = Boole

  var CompositionAlgebra = require('./src/CompositionAlgebra')
  exports.CompositionAlgebra = CompositionAlgebra

  var Cyclic = require('./src/Cyclic')
  exports.Cyclic = Cyclic

  var Scalar = require('./src/Scalar')
  exports.Scalar = Scalar

  var realField = require('./src/realField')

  var Real = CompositionAlgebra(realField, 1)
  var Complex = CompositionAlgebra(realField, 2)
  var Quaternion = CompositionAlgebra(realField, 4)
  var Octonion = CompositionAlgebra(realField, 8)

  exports.Real = Real
  exports.Complex = Complex
  exports.Quaternion = Quaternion
  exports.Octonion = Octonion

  var VectorSpace = require('./src/VectorSpace')
  var MatrixSpace = require('./src/MatrixSpace')

  exports.C = Complex
  exports.C2x2 = MatrixSpace(Complex)(2)
  exports.H = Quaternion
  exports.R = Real
  exports.R2 = VectorSpace(Real)(2)
  exports.R3 = VectorSpace(Real)(3)
  exports.R2x2 = MatrixSpace(Real)(2)

  exports.VectorSpace = VectorSpace
  exports.MatrixSpace = MatrixSpace
  exports.TensorSpace = require('./src/TensorSpace')
})
