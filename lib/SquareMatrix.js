
var util = require('util');

var Matrix = require('./Matrix.js');

function SquareMatrix(arg) {
  var order = arg.order;
  this.getOrder = function() { return order; };

console.log('xxx'+order);
  arg.numRows = order;
  arg.numCols = order;

  //trace: function() { // TODO somma degli elementi della diagonale.  },
  //adjoint: function() { // TODO matrice aggiunta.  };

  Matrix.call(this, arg);
};

// TODO fai il metodo clone
// da vedere se qua posso chiamare getField(), getNumRows(), ecc che stanno nella classe padre.
//SquareMatrix.prototype = {
//  clone: function() {
//    return new SquareMatrix();
//  }
//}

util.inherits(SquareMatrix, Matrix);

module.exports = SquareMatrix;

