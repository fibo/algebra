
var VectorSpace = require('../VectorSpace.js');
var RealField = require('../Real/Field.js');

var R = new RealField();

var RealVectorSpace = function(dim) {
  var arg = {};

  arg.dim = dim;
  arg.field = R;

  VectorSpace.call(this, arg);
}

RealVectorSpace.prototype = VectorSpace.prototype;

module.exports = RealVectorSpace;

