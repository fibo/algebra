
// GeneralLinearGroup

var AlgebraMatrixSpace = require('./AlgebraMatrixSpace')
  , inherits           = require('inherits')

function GeneralLinearGroup(Element, degree) {
  AlgebraMatrixSpace.call(this, Element, [degree, degree])
}

inherits(GeneralLinearGroup, AlgebraMatrixSpace)

module.exports = GeneralLinearGroup

