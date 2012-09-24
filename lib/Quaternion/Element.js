
var QuaternionElement = function(a, b, c, d) {

  var real = a;
  this.re = function() { return real; }

  var imaginary = {};
  var imaginary.i = b || 0;
  var imaginary.j = c || 0;
  var imaginary.k = d || 0;
  this.im = function() { return imaginary; }

  var self = this;

  this.conj = function() {
    imaginary.i = - imaginary.i;
    imaginary.j = - imaginary.j;
    imaginary.k = - imaginary.k;
    return self;
  }

  this.add = function(q) {
    // Assume q is a Quaternion ... TODO exceptions
    //
    real += q.re();

    var im = q.im();
    imaginary.i += im.i;
    imaginary.j += im.j;
    imaginary.k += im.k;
    return self;
  }

  this.sub = function(q) {
    real -= q.re();

    var im = q.im();
    imaginary.i -= im.i;
    imaginary.j -= im.j;
    imaginary.k -= im.k;
    return self;
  }
}

module.exports.QuaternionElement = QuaternionElement;

