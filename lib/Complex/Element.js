
var ComplexField = require('./Field.js');

var C = new ComplexField();

var ComplexElement = function(a, b) {
  var real = a;
  this.re = function() { return real; }

  var imaginary = b || 0;
  this.im = function() { return imaginary; }

  this.conjugate = function() {
    imaginary = - imaginary;
    return this;
  }
}

ComplexElement.prototype = {
  add: function(z) { return C.add(this, z); },
  mul: function(z) { return C.mul(this, z); },
  sub: function(z) { return C.sub(this, z); },
  div: function(z) { return C.div(this, z); }
};

module.exports = ComplexElement;

