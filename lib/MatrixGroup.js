
var VectorSpace = require('./VectorSpace.js');

var MatrixGroup = function(arg) {
  var numRows = arg.numRows;
  var numCols = arg.numCols;

  arg.dim = numRows * numCols;
  VectorSpace.call(this, arg);
}

MatrixGroup.prototype = {
  addition: function(a, b){},
  subratction: function(a, b){},
  Matrix: function() {
    var field = this.getField();

    var arg = {};
    arg.elements = arguments;
    arg.field = field;

    var matrix = new Matrix(arg);
    return matrix;
  }
};

module.exports = MatrixGroup;

