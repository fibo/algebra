
require('strict-mode')(function () {
  exports.AlgebraElement          = require('./AlgebraElement')
  exports.AlgebraField            = require('./AlgebraField')
  exports.AlgebraInvertibleMatrix = require('./AlgebraInvertibleMatrix')
  exports.AlgebraMatrix           = require('./AlgebraMatrix')
  exports.AlgebraVector           = require('./AlgebraVector')
  
  exports.AlgebraVectorSpace = require('./AlgebraVectorSpace')
  
  exports.GeneralLinearGroup     = require('./GeneralLinearGroup')
  exports.RealGeneralLinearGroup = require('./RealGeneralLinearGroup')
  
  var RealField       = require('./RealField')
    , ComplexField    = require('./ComplexField')
    , QuaternionField = require('./QuaternionField')
  
  exports.RealElement = require('./RealElement')
  exports.RealField   = RealField
  exports.RealVector  = require('./RealVector')
  
  exports.RealVectorSpace = require('./RealVectorSpace')
  

  exports.ComplexElement = require('./ComplexElement')
  exports.ComplexField   = ComplexField
  
  exports.QuaternionElement = require('./QuaternionElement')
  exports.QuaternionField   = QuaternionField
  
  var R = new RealField()
    , C = new ComplexField()
    , H = new QuaternionField()
  
  Object.defineProperty(exports, 'R', {value: R, writable: false})
  Object.defineProperty(exports, 'C', {value: C, writable: false})
  Object.defineProperty(exports, 'H', {value: H, writable: false})
})

