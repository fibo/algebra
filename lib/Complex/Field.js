
var Complex = require('./Element.js');

var ComplexField = function() {
  var zero = new Complex(0);
  console.log(zero);
  this.getZero = function() { return zero; }
}

ComplexField.prototype = {
  add: function(a, b) {
    var c = new Complex(a.re() + b.re(), a.im() + b.im());
    return c;
  },
  mul: function(a, b) {
    var are = a.re();
    var aim = a.im();
    var bre = b.re();
    var bim = b.im();

    var c = new Complex(a.re() + b.re(), a.im() + b.im());

    return c;
  },
  sub: function(a, b) {
    var c = new Complex(a.re() - b.re(), a.im() - b.im());
    return c;
  },
  div: function(a, b) {
    // TODO b isNotZero
    var are = a.re();
    var aim = a.im();
    var bre = b.re();
    var bim = b.im();

    var c = new Complex(a.re() + b.re(), a.im() + b.im());

    return c;
  }
};

module.exports = ComplexField;

