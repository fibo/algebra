
var iterateCayleyDickson = require('cayley-dickson'),
    Scalar               = require('./Scalar')

function CayleyDickson (K, iterations) {
  var Kn = iterateCayleyDickson(K, iterations)

  return Scalar([Kn.zero, Kn.one], Kn)
}

module.exports = CayleyDickson

