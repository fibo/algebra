
var MatrixGroup  = require('./MatrixGroup.js');
var MatrixRing   = require('./MatrixRing.js');
var SquareMatrix = require('./SquareMatrix.js');
var util = require('util');

var GeneralLinearGroup = function(arg) {
  var field = arg.field;
  this.getField = function() { return field; }

  var order = arg.order;
  this.getOrder = function() { return order; }

  arg.numRows = order;
  arg.numCols = order;

  this.Identity = function() {
    var elements = [];
    var zero = field.getZero();
    var one = field.getOne();

    for (var i = 0; i < order; i++ ) {
      for (var j = 0; j < order; j++ ) {
        if ( i == j ) {
          elements.push(one);
        }
        else {
          elements.push(zero);
        }
      }
    }

    var identity = new SquareMatrix({
      field: field,
      order: order,
      elements: elements
    });

    return identity;
  }

  MatrixGroup.call(this, arg);
  //MatrixRing.call(this, arg);
}

util.inherits(GeneralLinearGroup, MatrixGroup);
//util.inherits(GeneralLinearGroup, MatrixRing);

GeneralLinearGroup.prototype = {
  mul: function(a, b) {},
  div: function(a, b) {},
  inv: function(a, b) {}
};

module.exports = GeneralLinearGroup;

