var algebraCyclic = require('algebra-cyclic')

function Cyclic (elements) {
  var cyclicRing = algebraCyclic(elements)

  return Scalar.bind(null, cyclicRing)
}

module.exports = Cyclic
