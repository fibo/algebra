require('strict-mode')(() => {
  var Scalar = require('./src/Scalar')
  exports.Scalar = Scalar

  var field = require('./src/realField')

  var Real = Scalar(field, 1)

  exports.Real = Real
  exports.Complex = Scalar(field, 2)
  exports.Quaternion = Scalar(field, 4)
  exports.Octonion = Scalar(field, 8)

  var VectorSpace = require('./src/VectorSpace')

  exports.R2 = VectorSpace(Real)(2)
  exports.R3 = VectorSpace(Real)(3)

  exports.VectorSpace = VectorSpace
  exports.MatrixSpace = require('./src/MatrixSpace')
  exports.TensorSpace = require('./src/TensorSpace')
})
