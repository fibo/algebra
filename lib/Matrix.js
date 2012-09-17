
var Matrix = function(arg) {
  var field = arg.field;

  var numRows = arg.numRows;
  this.getNumRows = function() { return numRows; }

  var numCols = arg.numCols;
  this.getNumCols = function() { return numCols; }

  var elements = arg.elements;
  this.getElements = function() { return elements; }

  var index = function(i ,j) {
    return i * numCols + j % numRows;
  }

  this.ij = function(i, j) {
    return elements[index(i, j)];
  }

  this.transpose = function() {
    var swap;

    for(var i = 0; i < numRows) {
      for(var j = 0; j < numCols) {
        if ( i != j ) {
          var origIndex = index(i, j);
          var newIndex = index(j, i);

          swap = elements[origIndex];
          elements[origIndex] = elements[newIndex];
          elements[newIndex] = swap;
        }
      }
    }

    swap = numRows;
    numCols = numRows;
    numRows = swap;

    return this;
  }
}

Matrix.prototype = { };

module.exports = Matrix;

