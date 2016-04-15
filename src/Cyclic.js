var CompositionAlgebra = require('./CompositionAlgebra')
var algebraCyclic = require('algebra-cyclic')

function Cyclic (elements) {
  var cyclicRing = algebraCyclic(elements)

  return CompositionAlgebra(cyclicRing)(1)
}

module.exports = Cyclic
