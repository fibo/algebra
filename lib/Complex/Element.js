
var GLn = require('../Real/GeneralLinearGroup.js');

var GL2 = new GLn(2);

var ComplexElement = function(a, b) {
  var self = this;

  var _re = a;
  self.re = function() { return _re; }

  var _im = b || 0;
  self.im = function() { return _im; }

  var coerce = function (z) {
    if (typeof z == 'number') {
      return [z, 0];
    }
    else {
      return [z.re(), z.im()];
    }
  }

  self.conj = function() {
    _im = 0 - _im;
    return self;
  }

  self.eq = function(z) {
    var z = coerce(z);

    return ((_re == z[0]) && (_im == z[1]));
  }

  self.neg = function() {
    _re = 0 - _re;
    _im = 0 - _im;

    return self;
  }

  self.add = function(z) {
    var z = coerce(z);

    _re += z[0];
    _im += z[1];

    return self;
  }

  self.sub = function(z) {
    var z = coerce(z);

    _re -= z[0];
    _im -= z[1];

    return self;
  }

  self.inv = function() {
    var abs = self.abs();

    _re /= abs;
    _im /= abs;

    return self.conj();
  }

  self.mul = function(z) {
    var z = coerce(z);

    var re = _re;
    var im = _im;

    _re = re * z[0] - im * z[1];
    _im = im * z[0] + re * z[1];

    return self;
  }

  self.div = function(z) {
    var z = coerce(z);

    // Invert z.
    var zAbs = Math.sqrt(z[0] * z[0] + z[1] * z[1]);

    var zRe = z[0] / zAbs;
    var zIm = z[1] / zAbs;

    zIm = 0 - zIm;

    // Multipliy by the inverse of z.
    var re = _re;
    var im = _im;

    _re = re * zRe - im * zIm;
    _im = im * zRe + re * zIm;

    return self;
  }

  self.abs = function() {
    return Math.sqrt(_re * _re + _im * _im);
  }

  self.arg = function() {
// TODO vedi http://en.wikipedia.org/wiki/Complex_number
    return 0;
  }
}

ComplexElement.prototype.clone =  function () {
  return new ComplexElement(this.re(), this.im());
}

ComplexElement.prototype.toMatrix = function () {
  var im = this.im();
  var re = this.re();

  return new GL2.Matrix(re, -im, im, re);
}

ComplexElement.prototype.toString = function () {
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

module.exports = ComplexElement;

