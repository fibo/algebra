
var MnR = require('../Real/MatrixRing.js');

var M2R = new MnR(2);

var ComplexElement = function (a, b) {
  var self = this;

  var _re = a || 0;
  self.re = function () { return _re; };

  var _im = b || 0;
  self.im = function () { return _im; };

  self.xy = function () { return [_re, _im]; };

  var coerce = function (z) {
    if (typeof z == 'number') {
      return [z, 0];
    }
    else {
      return [z.re(), z.im()];
    }
  };

  self.norm = function () {
    return _re * _re + _im * _im;
  };

  self.conj = function () {
    _im = 0 - _im;
    return self;
  };

  self.eq = function (z) {
    var z = coerce(z);

    return ((_re == z[0]) && (_im == z[1]));
  };

  self.isZero = function () {
    return self.eq(0);
  };

  self.isOne = function () {
    return self.eq(1);
  };

  self.neg = function () {
    _re = 0 - _re;
    _im = 0 - _im;

    return self;
  };

  self.add = function (z) {
    var z = coerce(z);

    _re += z[0];
    _im += z[1];

    return self;
  };

  self.sub = function (z) {
    var z = coerce(z);

    _re -= z[0];
    _im -= z[1];

    return self;
  };

  self.inv = function () {
    var norm = self.norm();

    _re /= norm;
    _im /= norm;

    return self.conj();
  };

  self.mul = function (z) {
    var z = coerce(z);

    var re = _re;
    var im = _im;

    _re = re * z[0] - im * z[1];
    _im = im * z[0] + re * z[1];

    return self;
  };

  self.div = function (z) {
    var z = coerce(z);

    // Invert z.
    var zNorm = z[0] * z[0] + z[1] * z[1];

    var zRe = z[0] / zNorm;
    var zIm = z[1] / zNorm;
    zIm = 0 - zIm;

    // Multipliy by the inverse of z.
    var re = _re;
    var im = _im;

    _re = re * zRe - im * zIm;
    _im = im * zRe + re * zIm;

    return self;
  };

  self.abs = function () {
	  //TODO sicuro che sia corretto? ci va la radice?
    return Math.sqrt(self.norm());
  };

  self.arg = function () {
// TODO vedi http://en.wikipedia.org/wiki/Complex_number
    return 0;
  };

  self.exp = function () {
    var re = _re;
    var im = _im;

    // TODO Matc.cos(Math.PI / 2) do not equals 0 ... this is a problem
    // also Math.sin(Math.PI) is not zero
    _re = Math.exp(re) * Math.cos(_im);
    _im = Math.exp(re) * Math.sin(_im);

    return self;
  };
}

ComplexElement.prototype.clone =  function () {
  return new ComplexElement(this.re(), this.im());
};

ComplexElement.prototype.toMatrix = function () {
  var im = this.im();
  var re = this.re();

  return new M2R.Matrix(re, -im, im, re);
};

ComplexElement.prototype.toString = function () {
  var im = this.im();
  var re = this.re();

  if (im) {
    if (re) { return re + '+' + im + 'i'; }
    else { return im + 'i'; }
  }
  else {
      return re;
  }
};

module.exports = ComplexElement;

