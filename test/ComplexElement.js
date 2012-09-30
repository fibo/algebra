
var assert = require('assert');
var algebra = require('../index.js');

var Complex = algebra.Complex.Element;


describe('ComplexElement', function () {
  describe('constructor', function () {
    it('accepts 0 arguments', function() {
      var z = new Complex();
      assert.ok(z instanceof Complex);
    });

    it('accepts 1 argument', function() {
      var z = new Complex(1);
      assert.ok(z instanceof Complex);
    });

    it('accepts 2 arguments', function() {
      var z = new Complex(1, 2);
      assert.ok(z instanceof Complex);
    });
  });

  describe('inherits', function () {
    it('from ...', function() {
    });
  });

  describe('re()', function () {
    var z = new Complex(1, 2);

    it('returns the real part', function() {
      assert.equal(z.re(), 1);
      assert.equal(z.im(), 2);
    });
  });

  describe('im()', function () {
    var z = new Complex(1, 2);

    it('returns the imaginary part', function() {
      assert.equal(z.im(), 2);
    });
  });

  describe('conj()', function () {
    var z = new Complex(1, 2);

    it('implements complex conjugation', function() {
      var im = z.im();
      z.conj();
      assert.equal(z.im(), - im);
    });

    it('returns a reference to the complex number object', function() {
      assert.ok(z.conj() instanceof Complex);
    });
  });

  describe('...()', function () {
    it('...', function() {
    });
  });
});

