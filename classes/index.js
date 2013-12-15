
//
// ## Inheritance hierarchy
//
// * AlgebraElement
//   * RealElement
//   * ComplexElement
//   * QuaternionElement
// * AlgebraField
//   * RealField
//   * ComplexField
// * AlgebraTensor
//   * AlgebraMatrix
//     * AlgebraInvertibleMatrix
//

exports.AlgebraElement          = require('./AlgebraElement')
exports.AlgebraField            = require('./AlgebraField')
exports.AlgebraInvertibleMatrix = require('./AlgebraInvertibleMatrix')
exports.AlgebraMatrix           = require('./AlgebraMatrix')
exports.AlgebraTensor           = require('./AlgebraTensor')
exports.AlgebraVector           = require('./AlgebraVector')

exports.AlgebraVectorSpace = require('./AlgebraVectorSpace')

exports.GeneralLinearGroup     = require('./GeneralLinearGroup')
exports.RealGeneralLinearGroup = require('./RealGeneralLinearGroup')

exports.RealElement     = require('./RealElement')
exports.RealField       = require('./RealField')
exports.RealTensor      = require('./RealTensor')
exports.RealVector      = require('./RealVector')

exports.RealVectorSpace = require('./RealVectorSpace')

exports.ComplexElement = require('./ComplexElement')
exports.ComplexField   = require('./ComplexField')

exports.QuaternionElement = require('./QuaternionElement')
exports.QuaternionField   = require('./QuaternionField')

