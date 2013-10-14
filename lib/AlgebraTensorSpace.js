
var AlgebraElement = require('./AlgebraElement')
  , _              = require('underscore')

// AlgebraTensorSpace

function AlgebraTensorSpace(Element, indices) {


  var zero = new Element(0)
    , one  = new Element(1)

  if (! (zero instanceof AlgebraElement) )
    throw new TypeError()

  // indices

  if (_.isUndefined(indices))
    throw new TypeError()

  function getIndices () { return indices }

  Object.defineProperty(this, 'indices', {get: getIndices})
}

module.exports = AlgebraTensorSpace

