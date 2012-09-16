
var SquareMatrix = function(arg) {

  var order = arg.order;
  var numRows = order;
  var numCols = order;

  Matrix.apply(this, arg);
}

SquareMatrix.prototype = {
  trace: function() {
    // TODO somma degli elementi della diagonale.
  },
  transpose: function() {
    var elements = this.getElements();
  }
};

module.exports = SquareMatrix;

