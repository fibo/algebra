
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

  function scalarMultiplication() {

    var scalar = coerce.toNumber(arguments[0]);

    for (var i in _elements) _elements[i].mul(scalar);
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
    var column = [];

    for (var i = 0; i < self.numRows(); i++) {
      var element = self.ij(i, colIndex);
      column.push(element);
    }

    return column;
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

