
var CayleyDickson = require('./constructCayleyDicksonAlgebra'),
    ring          = require('./ring')

function CayleyDicksonAlgebra (K, iterations) {
  var Kn = CayleyDickson(K, iterations)

  return ring([Kn.zero, Kn.one], K)
}

module.exports = CayleyDickson

