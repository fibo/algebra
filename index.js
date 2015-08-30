
require('strict-mode')(function () {
  exports.group = require('algebra-group')
  exports.ring  = require('algebra-ring')

  exports.Field       = require('./src/Field')
  exports.Space       = require('./src/Space')
  exports.VectorSpace = require('./src/VectorSpace')
  exports.MatrixSpace = require('./src/MatrixSpace')
  exports.TensorSpace = require('./src/TensorSpace')

  exports.Real    = require('./src/Real')
  exports.Complex = require('./src/Complex')

  exports.buildCyclicSpaceOf = require('./src/buildCyclicSpaceOf')
})

