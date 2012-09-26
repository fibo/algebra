
var V = require('../Real/VectorSpace.js');
var R3 = new V(3);

var QuaternionElement = function(a, b, c, d) {

  var real = a;
  this.re = function() { return real; }

  var imaginary = new R3.Vector(b,c,d);
  this.im = function() { return imaginary; }

  var self = this;

  this.conj = function() {
    imaginary.neg();
    return self;
  }

  this.add = function(q) {
    // Assume q is a Quaternion ... TODO exceptions
    //
    real += q.re();

    imaginary.add(q.im());

    return self;
  }

  this.sub = function(q) {
    real -= q.re();

    imaginary.sub(q.im());

    return self;
  }
}

module.exports = QuaternionElement;

