
var SquareMatrix = require('./SquareMatrix.js');

function MatrixRing(arg) {
  var self = this;

  var _field = arg.field;
  this.getField = function () { return _field; };

  var _order = arg.order;
  this.getOrder = function () { return _order; };

  var zeroElement = _field.getZero();
  var oneElement = _field.getOne();

  self.getOne = function () {
    var arg = {};
    arg.field = _field;
    arg.order = _order;

    var elements = [];
    for (var i = 0; i < _order; i++) {
      for (var j = 0; j < _order; j++) {
        if (i == j) {
          elements.push(oneElement.clone());
        }
        else {
          elements.push(zeroElement.clone());
        }
      }
    }
    arg.elements = elements;

    var one = new SquareMatrix(arg);

    return one;
  };

  self.getZero = function () {
    var arg = {};
    arg.field = _field;
    arg.order = _order;

    var elements = [];
    for (var i = 0; i < _order * _order; i++) {
      elements.push(zeroElement.clone());
    }
    arg.elements = elements;

    var zero = new SquareMatrix(arg);

    return zero;
  };
}

module.exports = MatrixRing;

