
var util = require('util');

var RealElement = require('./Element.js');
var RealMatrix  = require('./Matrix.js');

var algorithm   = require('../util/algorithm.js');
var coerce      = require('../util/coerce.js');

var determinant               = algorithm.determinant;
var getAdjointElements        = algorithm.getAdjointElements;
var matrixToArrayIndex        = algorithm.matrixToArrayIndex;
var rowByColumnMultiplication = algorithm.rowByColumnMultiplication;

function RealSquareMatrix(arg) {
  var self = this;

//-----------------------------------------------------------------------------

  RealMatrix.call(self, arguments);

//-----------------------------------------------------------------------------

  var _order = arg.order;

  function getOrder() { return _order; };

  self.getOrder = getOrder;

//-----------------------------------------------------------------------------

  var _elements = [];

  for (var i in arg.elements) {
    _elements[i] = new RealElement(arg.elements[i]);
  }

  function getElements() { return _elements; };

  self.getElements = getElements;

//-----------------------------------------------------------------------------

  function getNumberOfColumns() { return _order; };
  
  self.getNumberOfColumns = getNumberOfColumns;
  self.numCols            = getNumberOfColumns;

//-----------------------------------------------------------------------------

  function getNumberOfRows() { return _order; };

  self.getNumberOfRows = getNumberOfRows;
  self.numRows         = getNumberOfRows;

//-----------------------------------------------------------------------------

  function getElementByIndexes(i, j) {
    var index = matrixToArrayIndex(i, j, getNumberOfColumns());

    return _elements[index];
  };

  self.getElementByIndexes = getElementByIndexes;
  self.ij                  = getElementByIndexes;

//-----------------------------------------------------------------------------

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

  self.scalar               = scalarMultiplication;
  self.scalarMultiplication = scalarMultiplication;

//-----------------------------------------------------------------------------

  function getRowByIndex(rowIndex) {
    var row = [];

    for (var j = 0; j < self.numCols(); j++) {
      var element = self.ij(rowIndex, j);
      row.push(element);
    }

    return row;
  };

  self.getRowByIndex = getRowByIndex;
  self.row           = getRowByIndex;

//-----------------------------------------------------------------------------

  function getColumnByIndex(colIndex) {
    var col = [];

    for (var i = 0; i < self.numRows(); i++) {
      var element = self.ij(i, colIndex);
      col.push(element);
    }

    return col;
  };

  self.col              = getColumnByIndex;
  self.getColumnByIndex = getColumnByIndex;

//-----------------------------------------------------------------------------

  function rightMultiplication(matrix) {
    _elements = rowByColumnMultiplication(self, matrix);
  };

  self.mul                 = rightMultiplication;
  self.rightMultiplication = rightMultiplication;
  self.rmul                = rightMultiplication;

//-----------------------------------------------------------------------------

  function leftMultiplication(matrix) {
    // TODO dovrei poter passare un array di matrici, cioè fare tipo
    // for (var i in arguments) _elements = rowByColumnMultiplication(arguments[i], self);
    _elements = rowByColumnMultiplication(matrix, self);
  };

  // TODO rightMultiplication leftMultiplication in mxn matrix

  self.leftMultiplication = leftMultiplication;
  self.lmul               = leftMultiplication;

//-----------------------------------------------------------------------------

  function realSquareMatrixDeterminant() {
    return determinant(_order, _elements);
  }

  self.det         = realSquareMatrixDeterminant;
  self.determinant = realSquareMatrixDeterminant;

//-----------------------------------------------------------------------------

  function toString() {
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
  
  self.toString = toString;

//-----------------------------------------------------------------------------

};

//-----------------------------------------------------------------------------

util.inherits(RealSquareMatrix, RealMatrix);

//-----------------------------------------------------------------------------

module.exports = RealSquareMatrix;

