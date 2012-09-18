
var MatrixGroup = require('./MatrixGroup.js');
var MatrixRing = require('./MatrixRing.js');

var GeneralLinearGroup = function(arg) {
  var field = arg.field;
  console.log(field);
  this.getField = function() { return field; }

  var order = arg.order;
  this.getOrder = function() { return order; }

  MatrixGroup.call(this, arg);
  //MatrixRing.call(this, arg);
}

GeneralLinearGroup.prototype = {
  add: function(A, B) {},
  mul: function(A, B) {},
  sub: function(A, B) {},
  div: function(A, B) {},
  eq: function(A, B) {
    // TODO vedi se riesci a fare il confronto a meno
    //      del fattore scalare.
    return false;
  },
  Identity: function() {
    var field = this.getField();
    var order = this.getOrder();

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
  },
};

module.exports = GeneralLinearGroup;

