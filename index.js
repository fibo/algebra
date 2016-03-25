require('strict-mode')(function () {
  var Scalar = require('./src/Scalar')
  exports.Scalar = Scalar

  var field = require('./src/realField')

  exports.Real = Scalar(field, 1)
  exports.Complex = Scalar(field, 2)
  exports.Quaternion = Scalar(field, 3)
  exports.Octonion = Scalar(field, 4)

  exports.VectorSpace = require('./src/VectorSpace')
  exports.MatrixSpace = require('./src/MatrixSpace')
  exports.TensorSpace = require('./src/TensorSpace')
})
