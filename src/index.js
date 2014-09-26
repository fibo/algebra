
// TODO usa le string ℝ ℂ ℍ
// usa anche ratio, lib per i numueri razionali
//  
require('strict-mode')(function () {
  exports.AlgebraElement          = require('./AlgebraElement')
  exports.AlgebraField            = require('./AlgebraField')
  exports.AlgebraInvertibleMatrix = require('./AlgebraInvertibleMatrix')
  exports.AlgebraSquareMatrix     = require('./AlgebraSquareMatrix')
  exports.AlgebraMatrix           = require('./AlgebraMatrix')
  exports.AlgebraMatrixSpace      = require('./AlgebraMatrixSpace')
  exports.AlgebraVector           = require('./AlgebraVector')
  
  exports.AlgebraVectorSpace = require('./AlgebraVectorSpace')
  
  exports.GeneralLinearGroup     = require('./GeneralLinearGroup')
  exports.RealGeneralLinearGroup = require('./RealGeneralLinearGroup')
  
  exports.Real = require('./Real')
  exports.Space = require('./Space')
  exports.VectorSpace = require('./VectorSpace')

  exports.RealElement = require('./RealElement')
  exports.RealField   = require('./RealField')
  exports.RealVector  = require('./RealVector')
  
  exports.RealMatrixSpace = require('./RealMatrixSpace')
  exports.RealVectorSpace = require('./RealVectorSpace')
  

  exports.ComplexElement = require('./ComplexElement')
  exports.ComplexField   = require('./ComplexField')
  exports.ComplexVector  = require('./ComplexVector')
  
  exports.ComplexVectorSpace = require('./ComplexVectorSpace')

  exports.QuaternionElement = require('./QuaternionElement')
  exports.QuaternionField   = require('./QuaternionField')
  
  var common = require('./common')

  for (var item in common)
    Object.defineProperty(exports, item, {value: common[item], writable: false})
    
})

