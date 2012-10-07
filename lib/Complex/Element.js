
var GLn = require('./Real/GeneralLinearGroup.js');

var GL2 = new GLn(2);

var ComplexElement = function(a, b) {
  var self = this;

  var real = a;
  self.re = function() { return real; }

  var imaginary = b || 0;
  self.im = function() { return imaginary; }

  self.eq = function(z) {
    return ((real == z.re()) && (imaginary == z.im()));
  }

  self.conj = function() {
    imaginary = - imaginary;
    return self;
  }

  self.add = function(z) {
    // Assume z is a Complex ... TODO exceptions
    //
    // TODO if z instanceof Quaternion
    real      += z.re();
    imaginary += z.im();
    return self;
  }

  self.sub = function(z) {
    real      -= z.re();
    imaginary -= z.im();
    return self;
  }

  self.mul = function(z) {
    var zRe = z.re();
    var zIm = z.im();

    var re = real;
    var im = imaginary;

    real      = re * zRe - im * zIm;
    imaginary = im * zRe + re * zIm;

    return self;
  }

  self.div = function(z) {
  //TODO gestisci caso z == 0, potrei compattificare aggiungendo infinito
  // se faccio che posso sommare un reale un complesso e un quaternione
  // Infinity potrebbe essere la compattificazione di S1, S3, S5
    return self.mul(z.inv());
  }

  self.neg = function(z) {
    real      = - real;
    imaginary = - imaginary;
    return self;
  }

  self.abs = function() {
    return Math.sqrt(real * real + imaginary * imaginary);
  }

  self.arg = function() {
// TODO vedi http://en.wikipedia.org/wiki/Complex_number
    return 0;
  }

  self.inv = function() {
    // TODO caso self = 0

    var abs = self.abs();
    real      /= abs;
    imaginary /= abs;

    return self.conj();
  }
}

ComplexElement.prototype = {
  toMatrix: function() {
    var im = this.im();
    var re = this.re();

    return new GL2.Matrix(re, -im, im, re);
  },
  clone: function() {
    return new ComplexElement(this.re(), this.im());
  },
  toString: function() {
    var im = this.im();
    var re = this.re();

    if (im) {
      if (re) {
        return re + '+' + im + 'i';
      }
      else {
        return im + 'i';
      }
    }
    else {
        return re;
    }
  }
};

module.exports = ComplexElement;

