
// TODO usa le string ℝ ℂ ℍ
// usa anche ratio, lib per i numueri razionali

require('strict-mode')(function () {
  exports.Field       = require('./Field')
  exports.Space       = require('./Space')
  exports.VectorSpace = require('./VectorSpace')
//  exports.MatrixSpace = require('./MatrixSpace')
//  exports.TensorSpace = require('./TensorSpace')

  exports.Real    = require('./Real')
  exports.Complex = require('./Complex')
})

