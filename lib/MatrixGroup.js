
var VectorSpace = require('./VectorSpace.js');

function MatrixGroup(arg) {
  var self = this;

  var numRows = arg.numRows;
  var numCols = arg.numCols;

  arg.dim = numRows * numCols;
  VectorSpace.call(this, arg);

  //this.add;
  //this.sub;

  //this.Matrix = function() {}
}

module.exports = MatrixGroup;

