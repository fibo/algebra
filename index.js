
require('strict-mode')(function () {
  var iterateCayleyDickson = require('cayley-dickson'),
      realField            = require('./src/realField'),
      ring                 = require('./src/ring')

  var K0 = iterateCayleyDickson(realField, 0),
      K1 = iterateCayleyDickson(realField, 1),
      K2 = iterateCayleyDickson(realField, 2),
      K3 = iterateCayleyDickson(realField, 3)

  exports.Real       = ring([K0.zero, K0.one], K0)
  exports.Complex    = ring([K1.zero, K1.one], K1)
  exports.Quaternion = ring([K2.zero, K2.one], K2)
  exports.Octonion   = ring([K2.zero, K3.one], K3)

  exports.VectorSpace = require('./src/VectorSpace')
  exports.MatrixSpace = require('./src/MatrixSpace')
})

