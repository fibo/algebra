

var VectorSpace = require('./VectorSpace.js');

var Matrix = function() {


  arg.dim = arg.numRows * arg.numCols;

  // Inherit ... bla bla TODO eredita per scalare e somma
  // in quanto spazio vettoriale.
  VectorSpace.call(this, arg);

}

module.exports = Matrix;

