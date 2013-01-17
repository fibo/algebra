
var _ = require('underscore');

var RealElement = require('./Element.js');
var RealField   = require('./Field.js');

var R = new RealField();

function RealSquareMatrix(arg) {
  var self = this;

  var _elements = arg.elements;
  self.getElements = function () { return _elements };

  var _order = arg.order;

  var _numRows = _order;
  var _numCols = _order;

  function index(i ,j) {
    return i * _numCols + j;
  };

  self.ij = function (i, j) {
    return _elements[index(i, j)];
  };

  self.row = function (rowIndex) {
    var row = [];
    for (var j = 0; j < _numCols; j++) {
      var element = self.ij(rowIndex, j);
      row.push(element);
    }
    return row;
  };

  self.col = function (colIndex) {
    var col = [];
    for (var i = 0; i < _numRows; i++) {
      var element = self.ij(i, colIndex);
      col.push(element);
    }
    return col;
  };

  self.rightMultiplication = function (matrix) {
    for (var i = 0; i < _numRows; i++) {
      var row = self.row(i);

      for (var j = 0; j < _numCols; j++) {
        var col = matrix.col(j);

        var element = R.getZero();

        for (var k = 0; k < _order; k++) {
          var rk = new RealElement(row[k]);
          var ck = new RealElement(col[k]);
          element.add(rk.mul(ck)); 
        }
        _elements[index(i, j)] = element;
      }
    }
  };

  self.mul = self.rightMultiplication;
  self.rmul = self.rightMultiplication;

  self.leftMultiplication = function (matrix) {

  };

  // TODO rightMultiplication leftMultiplication in mxn matrix

  self.lmul = self.leftMultiplication;

  self.toString = function () {
    var str = '';
    for (var i = 0; i < _numRows; i++ ) {
      str += '|';
      for (var j = 0; j < _numCols; j++ ) {
        str += ' ' + self.ij(i, j) + ' ';
      }
      str += '|\n';
    }
    return str;
  };
  
};

module.exports = RealSquareMatrix;

