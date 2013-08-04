
var AlgebraTensorSpace = require('./AlgebraTensorSpace')
  , util               = require('util')


function AlgebraVectorSpace(field, dimension) {

  this.__defineGetter__('dimension', function () { return dimension })

  AlgebraTensorSpace.call(this, field, [dimension])
}

util.inherits(AlgebraVectorSpace, AlgebraTensorSpace)

module.exports = AlgebraVectorSpace

