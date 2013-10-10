
// RealGeneralLinearGroup

var GeneralLinearGroup = require('./GeneralLinearGroup')
  , RealField          = require('./RealField')
  , inherits           = require('inherits')

var real = new RealField()

function RealGeneralLinearGroup(degree) {
  GeneralLinearGroup.call(this, real, degree)
}

inherits(RealGeneralLinearGroup, GeneralLinearGroup)

module.exports = RealGeneralLinearGroup

