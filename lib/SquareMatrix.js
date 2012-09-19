
var Matrix = require('./Matrix.js');

var SquareMatrix = function(arg) {
  var order = arg.order;
  this.getOrder = function() { return order; }

  arg.numRows = order;
  arg.numCols = order;

  Matrix.call(this, arg);
}

SquareMatrix.prototype = {
  trace: function() {
    // TODO somma degli elementi della diagonale.
  },
  adjoint: function() {
    // TODO matrice aggiunta.
  }
};

module.exports = SquareMatrix;

