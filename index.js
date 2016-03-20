require('strict-mode')(function () {
  var realField = require('./src/realField')
  var CompositionAlgebra = require('./src/CompositionAlgebra')

  exports.Real = CompositionAlgebra(realField)(0)
  exports.Complex = CompositionAlgebra(realField)(1)
  exports.Quaternion = CompositionAlgebra(realField)(2)
  exports.Octonion = CompositionAlgebra(realField)(3)

  exports.VectorSpace = require('./src/VectorSpace')
  exports.MatrixSpace = require('./src/MatrixSpace')
  exports.TensorSpace = require('./src/TensorSpace')
})
