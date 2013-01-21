
var _ = require('underscore');

var RealElement = require('./Element.js');
var RealField   = require('./Field.js');

var R = new RealField();

function index(i, j, numberOfColumns) {
  return i * numberOfColumns + j;
};

function RealSquareMatrix(arg) {
  var self = this;

  var _order = arg.order;
  self.getOrder = function getOrder() { return _order; };

  var _elements = [];

  function getElements() { return _elements };

  self.getElements = getElements;

  // Defaults to Identity.
  if (! _.isArray(arg.elements)) {
    for (var i = 0; i < _order; i++) {
      for (var j = 0; j < _order; j++) {
        i == j ? _elements.push(R.getOne()) : _elements.push(R.getZero());
      }
    }
  }

  for (var i in arg.elements) {
    var element = new RealElement(arg.elements[i]);
    _elements.push(element);
  }

  function getNumberOfColumns() { return _order; };
  
  self.numCols = self.getNumberOfColumns = getNumberOfColumns;

  function getNumberOfRows() { return _order; };

  self.numRows = self.getNumberOfRows = getNumberOfRows;

  function getElementByIndexes(i, j) {
    return _elements[index(i, j, self.numCols())];
  };

  self.ij = self.getElementByIndexes = getElementByIndexes;

  function scalarMultiplication(scalar) {

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

  self.scalar = self.scalarMultiplication = scalarMultiplication;

  // TODO wquesto modo di definire le funzioni sarebbe consigliabile
  // per non farle anomime e avere uno  stack migliore.
  function getRowByIndex(rowIndex) {
    var row = [];
    for (var j = 0; j < self.numCols(); j++) {
      var element = self.ij(rowIndex, j);
      row.push(element);
    }
    return row;
  };

  self.row = self.getRowByIndex = getRowByIndex;

  function getColumnByIndex(colIndex) {
    var col = [];
    for (var i = 0; i < self.numRows(); i++) {
      var element = self.ij(i, colIndex);
      col.push(element);
    }
    return col;
  };

  self.col = self.getColumnByIndex = getColumnByIndex;

  function rowByColumnMultiplication(leftMatrix, rightMatrix) {
    var matricesCanNotBeMultiplied = (leftMatrix.getNumberOfColumns() !== rightMatrix.getNumberOfRows());

    var elements = [];

    // TODO dovrei controllare anche il Field o Ring del Gruppo di Matrici
    // per ora uso secco R
    var ring = R;

    if (matricesCanNotBeMultiplied) throw new Error();

    for (var i = 0; i < leftMatrix.getNumberOfRows(); i++) {
      for (var j = 0; j < rightMatrix.getNumberOfColumns(); j++) {
        var element = ring.getZero();

        for (var k = 0; k < leftMatrix.getNumberOfColumns(); k++) {
	  // TODO funzione generica di somma sugli indici, tipo notazione di Einstein.
          var rightElement = leftMatrix.ij(i, k);
          var leftElement = rightMatrix.ij(k, j);
          element.add(ring.mul(rightElement,leftElement));
console.log(element.num());
        }

        elements.push(element);
      }
    }

    return elements;
  };

  function rightMultiplication(matrix) {
    _elements = rowByColumnMultiplication(self, matrix);
  };

  self.mul = self.rmul = self.rightMultiplication = rightMultiplication;

  function leftMultiplication(matrix) {
    // TODO dovrei poter passare un array di matrici, cioè fare tipo
    // for (var i in arguments) _elements = rowByColumnMultiplication(arguments[i], self);
    _elements = rowByColumnMultiplication(matrix, self);
  };

  // TODO rightMultiplication leftMultiplication in mxn matrix

  self.lmul = self.leftMultiplication = leftMultiplication;

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

  function realSquareMatrixDeterminant() {
    return determinant(_order, _elements);
  }

  self.det = self.determinant = realSquareMatrixDeterminant;

  self.toString = function () {
    var str = '';
    for (var i = 0; i < self.numRows(); i++) {
      str += '|';
      for (var j = 0; j < self.numCols(); j++) {
        str += ' ' + self.ij(i, j).num() + ' ';
      }
      str += '|\n';
    }
    return str;
  };
  
};

module.exports = RealSquareMatrix;

