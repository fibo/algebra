
//var MatrixGroup  = require('./MatrixGroup.js');
//var MatrixRing   = require('./MatrixRing.js');
var SquareMatrix = require('./SquareMatrix.js');
//var util = require('util');

function GeneralLinearGroup(arg) {
  var field = arg.field;
  this.getField = function() { return field; }

  var order = arg.order;
  this.getOrder = function() { return order; }

  this.Matrix = function() {
    var arg = {
      field: field,
      order: order,
      elements: arguments
    };

    SquareMatrix.call(this, arg);
  }

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

  //MatrixGroup.call(this, arg);
  //MatrixRing.call(this, arg);
}

module.exports = GeneralLinearGroup;

