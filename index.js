
require('strict-mode')(function () {
  exports.group = require('./src/group')
  exports.ring  = require('./src/ring')

  exports.VectorSpace = require('./src/VectorSpace')
  exports.MatrixSpace = require('./src/MatrixSpace')

  exports.Real       = require('./src/Real')
  exports.Complex    = require('./src/Complex')
  exports.Quaternion = require('./src/Quaternion')
})

