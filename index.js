
var Matrix             = require('./lib/Matrix.js');
var VectorSpace        = require('./lib/VectorSpace.js');
var GeneralLinearGroup = require('./lib/GeneralLinearGroup.js');

exports.Matrix             = Matrix;
exports.VectorSpace        = VectorSpace;
exports.GeneralLinearGroup = GeneralLinearGroup;

var Real = {};

Real.Element            = require('./lib/Real/Element.js');
Real.Field              = require('./lib/Real/Field.js');
Real.VectorSpace        = require('./lib/Real/VectorSpace.js');
Real.GeneralLinearGroup = require('./lib/Real/GeneralLinearGroup.js');

exports.Real = Real;

var Complex = {};

Complex.Element = require('./lib/Complex/Element.js');
Complex.Field   = require('./lib/Complex/Field.js');

exports.Complex = Complex;

var Quaternion = {};

Quaternion.Element = require('./lib/Quaternion/Element.js');
Quaternion.Ring   = require('./lib/Quaternion/Ring.js');

exports.Quaternion = Quaternion;

