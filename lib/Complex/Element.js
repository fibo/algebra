
var ComplexElement = function(a, b) {
  var real = a;
  this.re = function() { return real; }

  var imaginary = b || 0;
  this.im = function() { return imaginary; }

  var self = this;

  this.eq = function(z) {
    return ((real == z.re()) && (imaginary == z.im()));
  }

  this.conj = function() {
    imaginary = - imaginary;
    return self;
  }

  this.add = function(z) {
    // Assume z is a Complex ... TODO exceptions
    //
    // TODO if z instanceof Quaternion
    real      += z.re();
    imaginary += z.im();
    return self;
  }

  this.sub = function(z) {
    real      -= z.re();
    imaginary -= z.im();
    return self;
  }

  this.mul = function(z) {
    var zRe = z.re();
    var zIm = z.im();

    var re = real;
    var im = imaginary;

    real      = re * zRe - im * zIm;
    imaginary = im * zRe + re * zIm;

    return self;
  }

  this.div = function(z) {
  //TODO gestisci caso z == 0, potrei compattificare aggiungendo infinito
  // se faccio che posso sommare un reale un complesso e un quaternione
  // Infinity potrebbe essere la compattificazione di S1, S3, S5
    return self.mul(z.inv());
  }

  this.neg = function(z) {
    real      = - real;
    imaginary = - imaginary;
    return self;
  }

  this.abs = function() {
    return Math.sqrt(real * real + imaginary * imaginary);
  }

  this.arg = function() {
// TODO vedi http://en.wikipedia.org/wiki/Complex_number
    return 0;
  }

  this.inv = function() {
    // TODO caso self = 0

    var abs = this.abs();
    real      /= abs;
    imaginary /= abs;

    return self.conj();
  }
}

ComplexElement.prototype = {
  // TODO toMatrix()
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

