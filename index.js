require('strict-mode')(() => {
  var Cyclic = require('./src/Cyclic')
  exports.Cyclic = Cyclic

  var CompositionAlgebra = require('./src/CompositionAlgebra')
  exports.CompositionAlgebra = CompositionAlgebra

  var field = require('./src/realField')

  var Real = CompositionAlgebra(field, 1)
  var Complex = CompositionAlgebra(field, 2)
  var Quaternion = CompositionAlgebra(field, 4)
  var Octonion = CompositionAlgebra(field, 8)

  exports.Real = Real
  exports.Complex = Complex
  exports.Quaternion = Quaternion
  exports.Octonion = Octonion

  var VectorSpace = require('./src/VectorSpace')
  var MatrixSpace = require('./src/MatrixSpace')

  exports.C = Complex
  exports.H = Quaternion
  exports.R = Real
  exports.R2 = VectorSpace(Real)(2)
  exports.R3 = VectorSpace(Real)(3)
  exports.R2x2 = MatrixSpace(Real)(2)

  exports.VectorSpace = VectorSpace
  exports.MatrixSpace = MatrixSpace
  exports.TensorSpace = require('./src/TensorSpace')
})
