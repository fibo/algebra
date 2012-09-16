
var MatrixGroup = function(arg) {
  var numRows = arg.numRows;
  var numCols = arg.numCols;
}

MatrixGroup.prototype = {
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

