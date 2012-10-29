
exports.Field              = require('./lib/Field.js');
exports.Matrix             = require('./lib/Matrix.js');
exports.SquareMatrix       = require('./lib/SquareMatrix.js');
exports.GeneralLinearGroup = require('./lib/GeneralLinearGroup.js');
exports.Group              = require('./lib/Group.js');
exports.Vector             = require('./lib/Vector.js');
exports.VectorSpace        = require('./lib/VectorSpace.js');


var Real = {};

Real.Element            = require('./lib/Real/Element.js');
Real.Field              = require('./lib/Real/Field.js');
Real.Vector             = require('./lib/Real/Vector.js');
Real.VectorSpace        = require('./lib/Real/VectorSpace.js');
Real.GeneralLinearGroup = require('./lib/Real/GeneralLinearGroup.js');

exports.Real = Real;

var Complex = {};

Complex.Element = require('./lib/Complex/Element.js');
Complex.Field   = require('./lib/Complex/Field.js');

exports.Complex = Complex;

var Quaternion = {};

//Quaternion.Element = require('./lib/Quaternion/Element.js');
//Quaternion.Ring   = require('./lib/Quaternion/Ring.js');

exports.Quaternion = Quaternion;

