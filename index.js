
require('strict-mode')(function () {
  var iterateCayleyDickson = require('cayley-dickson'),
      realField            = require('./src/realField'),
      Scalar               = require('./src/Scalar')

  var K0 = iterateCayleyDickson(realField, 0),
      K1 = iterateCayleyDickson(realField, 1),
      K2 = iterateCayleyDickson(realField, 2),
      K3 = iterateCayleyDickson(realField, 3)

  exports.Real       = Scalar([K0.zero, K0.one], K0)
  exports.Complex    = Scalar([K1.zero, K1.one], K1)
  exports.Quaternion = Scalar([K2.zero, K2.one], K2)
  exports.Octonion   = Scalar([K3.zero, K3.one], K3)

  exports.VectorSpace = require('./src/VectorSpace')
  exports.MatrixSpace = require('./src/MatrixSpace')
})

