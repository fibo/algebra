
var VectorSpace = require('../VectorSpace.js');
var RealField = require('../RealField.js');

var RealVectorSpace = function(dim) {

  var arg = {};

  arg.dim = dim;
  arg.field = new RealField();

  VectorSpace.apply(this, arg);

}

module.exports = RealVectorSpace;

