
var CayleyDickson = require('cayley-dickson'),
    ring          = require('./ring')

function CayleyDickson (K, iterations) {
  var Kn = CayleyDickson(K, iterations)

  return ring([Kn.zero, Kn.one], Kn)
}

module.exports = CayleyDickson

