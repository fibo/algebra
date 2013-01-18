
var _ = require('underscore');

var RealElement = require('./Element.js');
var RealField   = require('./Field.js');

var R = new RealField();

function index(i, j, numberOfColumns) {
  return i * numberOfColumns + j;
};

function RealSquareMatrix(arg) {
  var self = this;

  var _elements = [];
  for (var i in arg.elements) {
    if (typeof arg.elements[i] == 'number') {
      var element = new RealElement(arg.elements[i]);
      _elements.push(element);
    }
    else {
      _elements.push(arg.elements[i]);
    }
  }
  self.getElements = function () { return _elements };

  // TODO order ricavato in automatico in base al numero di elementi
  // se non si tratta di un quadrato pero?
  var _order = arg.order;

  var _numRows = _order;
  var _numCols = _order;

  self.ij = self.getElementByIndexes = function getElementByIndexes(i, j) {
    return _elements[index(i, j, _numCols)];
  };

  // TODO wquesto modo di definire le funzioni sarebbe consigliabile
  // per non farle anomime e avere uno  stack migliore.
  self.row = self.getRowByIndex = function getRowByIndex(rowIndex) {
    var row = [];
    for (var j = 0; j < _numCols; j++) {
      var element = self.ij(rowIndex, j);
      row.push(element);
    }
    return row;
  };


  self.getColumnByIndex = function (colIndex) {
    var col = [];
    for (var i = 0; i < _numRows; i++) {
      var element = self.ij(i, colIndex);
      col.push(element);
    }
    return col;
  };

  self.col = self.getColumnByIndex;

  self.rightMultiplication = function (matrix) {
    for (var i = 0; i < _numRows; i++) {
      var row = self.row(i);

      for (var j = 0; j < _numCols; j++) {
        var col = matrix.col(j);

        var element = R.getZero();

        for (var k = 0; k < _order; k++) {
	  console.log(element.num() + ' + ' + row[k].num() + ' * ' + col[k].num());
          element.add(row[k].mul(col[k]));
        }
	console.log('element = '+element.num());
        _elements[index(i, j, _numCols)] = element;
      }
    }
  };

  self.mul = self.rightMultiplication;
  self.rmul = self.rightMultiplication;

  self.leftMultiplication = function (matrix) {

  };

  // TODO rightMultiplication leftMultiplication in mxn matrix

  self.lmul = self.leftMultiplication;

  function getAdjointElements(rowIndex, columnIndex, numRows, numCols, elements) {
    var adjointElements = [];
      for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
          if (i != rowIndex && j != columnIndex) {
            adjointElements.push(elements[index(i, j, numCols)]);
          }
        }
      }
    return adjointElements;
  };

  function determinant(order, elements) {
    var det = R.getZero();

    if (order == 2) {
      det.add(elements[0].mul(elements[3])).sub(elements[2].mul(elements[1]));
      return det;
    }

    // TODO per ora scelgo sempre la prima riga.
    var rowIndex = 0;

    for (var columnIndex = 0; columnIndex < order; columnIndex++) {
      var adjointElements=getAdjointElements(rowIndex,columnIndex,order,order,elements);
      var adjointDeterminant=determinant(order - 1,adjointElements);
      var element = elements[index(rowIndex, columnIndex, order)];
      if (columnIndex % 2 == 0) {
        det.add(element);
      }
      else {
        det.sub(element);
      }
      det.mul(adjointDeterminant);
    }
    return det;
  }

  self.determinant = function () {
    return determinant(_order,_elements);
  }

  self.toString = function () {
    var str = '';
    for (var i = 0; i < _numRows; i++) {
      str += '|';
      for (var j = 0; j < _numCols; j++) {
        str += ' ' + self.ij(i, j).num() + ' ';
      }
      str += '|\n';
    }
    return str;
  };
  
};

module.exports = RealSquareMatrix;

