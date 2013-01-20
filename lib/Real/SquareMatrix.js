
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
  self.getElements = function getElements() { return _elements };

  // TODO order ricavato in automatico in base al numero di elementi
  // se non si tratta di un quadrato pero?
  var _order = arg.order;
  self.getOrder = function getOrder() { return _order; };

  var _numRows = _order;
  var _numCols = _order;

  self.ij = self.getElementByIndexes = function getElementByIndexes(i, j) {
    return _elements[index(i, j, _numCols)];
  };

  self.scalar = self.scalarMultiplication = function scalarMultiplication(scalar) {

    // TOOD funzione comune a tutti coerceToRealElement
    if (typeof scalar == 'number') {
      scalar = new RealElement(scalar);
    }
      // TODO qui presumo che scalar sia un RealElement, devo usare instanceof per assicurarmene
      // forse la cosa migliore è dare questa intelligenza al costruttore di RealElement
    for (var i in _elements) _elements[i].mul(scalar);
    // TODO sarebbe comodo fare una classe Set per fare
    // _elements = new Set di reali, a quel punto posso fare
    // _elements.mul(scalar) e li moltiplico tutti, perchè a sua volta la classe Set applica la mul a tutti
    // questo potrebbe essere usato sia da Vector che da Matrix che da Tensor
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


  
  self.col = self.getColumnByIndex = function getColumnByIndex(colIndex) {
    var col = [];
    for (var i = 0; i < _numRows; i++) {
      var element = self.ij(i, colIndex);
      col.push(element);
    }
    return col;
  };


  self.mul = self.rmul = self.rightMultiplication = function rightMultiplication(matrix) {
    var elements = [];

    for (var i = 0; i < _numRows; i++) {
      for (var j = 0; j < _numCols; j++) {
        var element = R.getZero();

        for (var k = 0; k < _order; k++) {
	  // TODO funzione generica di somma sugli indici, tipo notazione di Einstein.
          var rightElement = self.ij(i, k);
          var leftElement = matrix.ij(k, j);
          element.add(R.mul(rightElement,leftElement));
        }
        elements.push(element);
      }
    }

    _elements = elements;
  };

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
    // TODO classe Collection con metodo countZeros o numberOfZeros()
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

  self.det = self.determinant = function () {
    return determinant(_order, _elements);
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

