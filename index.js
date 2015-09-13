
require('strict-mode')(function () {
  var CayleyDickson = require('./src/cayley-dickson'),
      Real          = require('./src/Real')

  exports.CayleyDickson = CayleyDickson
  exports.group = require('./src/group')
  exports.ring = require('./src/ring')

  exports.VectorSpace = require('./src/VectorSpace')
  exports.MatrixSpace = require('./src/MatrixSpace')

  exports.Real       = Real
//  exports.Complex    = CayleyDickson(Real, 1)
  exports.Quaternion = CayleyDickson(Real, 2)
//  exports.Octonion   = CayleyDickson(Real, 3)
})

