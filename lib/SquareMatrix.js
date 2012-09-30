
var Matrix = require('./Matrix.js');

function SquareMatrix(arg) {
  var order = arg.order;
  this.getOrder = function() { return order; }

  arg.numRows = order;
  arg.numCols = order;

  //trace: function() { // TODO somma degli elementi della diagonale.  },
  //adjoint: function() { // TODO matrice aggiunta.  }

  Matrix.call(this, arg);
}

module.exports = SquareMatrix;

