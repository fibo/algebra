
var AlgebraTensor = require('./AlgebraTensor')

// AlgebraTensorSpace

function AlgebraTensorSpace(Tensor, indices) {

  // Tensor

  if (! (Tensor instanceof AlgebraTensor) )
    throw new TypeError()

  // indices

  if (_.isUndefined(indices))
    throw new TypeError()

  function getIndices () { return indices }

  Object.defineProperty(this, 'indices', {get: getIndices})
}

module.exports = AlgebraTensorSpace

