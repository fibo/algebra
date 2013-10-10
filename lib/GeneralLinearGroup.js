
// GeneralLinearGroup

var AlgebraMatrixSpace = require('./AlgebraMatrixSpace')
  , inherits           = require('inherits')

function GeneralLinearGroup(field, degree) {
  AlgebraMatrixSpace.call(this, field, degree)
}

inherits(GeneralLinearGroup, AlgebraMatrixSpace)

module.exports = GeneralLinearGroup

