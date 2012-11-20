function Matrix(arg) {
  var self = this;

  var field = arg.field;
  this.getField = function() { return field; };

  var numRows = arg.numRows;
  this.getNumRows = function() { return numRows; };

  var numCols = arg.numCols;
  this.getNumCols = function() { return numCols; };
  console.log(numCols);

  var elements = arg.elements;
  this.elems = this.getElements = function() { return elements; };

  var index = function(i ,j) {
    return i * numCols + j;
  };

  this.ij = function(i, j) {
    return elements[index(i, j)];
  };

  this.row = function(rowIndex) {
    var row = [];
    for (var j = 0; j < numCols; j++) {
      var element = self.ij(rowIndex, j);
      row.push(element);
    }
    return row;
  };

  this.col = function(colIndex) {
    var col = [];
    for (var i = 0; i < numRows; i++) {
      var element = self.ij(i, colIndex);
      col.push(element);
    }
    return col;
  };

  this.toString = function() {
    var str = '';
    for (var i = 0; i < numRows; i++ ) {
      str += '|';
      for (var j = 0; j < numCols; j++ ) {
        str += ' ' + self.ij(i, j) + ' ';
      }
      str += '|\n';
    }
    return str;
  };

  this.transpose = this.tr = function() {
    var swap;

    for(var i = 0; i < numRows; i++) {
      for(var j = 0; j < numCols; j++) {
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

    return self;
  };
};

Matrix.prototype = {
  clone: function() {
    return new Matrix({
      field: this.getField(),
      numCols: this.getNumCols(),
      numRows: this.getNumRows(),
      elements: this.getElements()
    });
  }
};

module.exports = Matrix;

