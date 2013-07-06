
//-----------------------------------------------------------------------------

// TODO classe Scalar che è un Tensor con un solo Element

exports.Element     = require('./lib/Element.js')
exports.Field       = require('./lib/Field.js')
exports.Matrix      = require('./lib/Matrix.js')
exports.Tensor      = require('./lib/Tensor.js')
// TODO TensorSpace
exports.Vector      = require('./lib/Vector.js')
exports.VectorSpace = require('./lib/VectorSpace.js')

//-----------------------------------------------------------------------------

var Real = {}

Real.Element            = require('./lib/Real/Element.js')
Real.Field              = require('./lib/Real/Field.js')
Real.GeneralLinearGroup = require('./lib/Real/GeneralLinearGroup.js')
Real.Matrix             = require('./lib/Real/Matrix.js')
Real.SquareMatrix       = require('./lib/Real/SquareMatrix.js')
Real.Vector             = require('./lib/Real/Vector.js')
Real.VectorSpace        = require('./lib/Real/VectorSpace.js')

exports.Real = Real

//-----------------------------------------------------------------------------

var Complex = {}

Complex.Element = require('./lib/Complex/Element.js')
Complex.Field   = require('./lib/Complex/Field.js')
//Complex.Vector      = require('./lib/Complex/Vector.js')
//Complex.VectorSpace = require('./lib/Complex/VectorSpace.js')

exports.Complex = Complex;

//-----------------------------------------------------------------------------

var Quaternion = {}

//Quaternion.Element = require('./lib/Quaternion/Element.js')
//Quaternion.Ring    = require('./lib/Quaternion/Ring.js')

exports.Quaternion = Quaternion

//-----------------------------------------------------------------------------

var Octonion = {}

//Octonion.Element = require('./lib/Octonion/Element.js')
//Octonion.Ring   = require('./lib/Octonion/Ring.js')

exports.Octonion = Octonion

//-----------------------------------------------------------------------------

var util = {}

util.abstractMethod = require('./lib/util/abstractMethod.js')
util.algorithm      = require('./lib/util/algorithm.js')
util.coerce         = require('./lib/util/coerce.js')
util.is             = require('./lib/util/is.js')

exports.util = util

//-----------------------------------------------------------------------------

