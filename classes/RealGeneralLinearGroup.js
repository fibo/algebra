
// RealGeneralLinearGroup

var GeneralLinearGroup = require('./GeneralLinearGroup')
  , RealElement        = require('./RealElement')
  , inherits           = require('inherits')

function RealGeneralLinearGroup(degree) {
  GeneralLinearGroup.call(this, RealElement, degree)
}

inherits(RealGeneralLinearGroup, GeneralLinearGroup)

module.exports = RealGeneralLinearGroup

