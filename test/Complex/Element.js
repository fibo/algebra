
var assert = require('assert');
var algebra = require('../../index.js');

var Complex = algebra.Complex.Element;


describe('ComplexElement', function () {
  describe('constructor:', function () {
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

  describe('inheritance:', function () {
    it('is a FieldElement', function() {
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
      assert.equal(z.im(), 0 - im);
    });

    it('returns a reference to the complex number object', function() {
      assert.ok(z.conj() instanceof Complex);
    });
  });

  describe('clone()', function () {
    it('returns a copy of the object', function() {
      var z = new Complex(-1, 5);
      var w = z.clone();
      assert.ok(w instanceof Complex);
      assert.ok(z.eq(w));
    });
  });

  describe('eq()', function () {
    it('returns true if two elements are equal', function() {
      var z1 = new Complex(-1, 5);
      var z2 = new Complex(-1, 5);
      assert.ok(z1.eq(z2));
      assert.ok(z2.eq(z1));
    });
  });

  //TODO describe('add(<Complex|Real>)', function () {
  describe('add(<Complex>)', function () {
    it('implements the addition operator', function() {
      var one = new Complex(1);
      var i = new Complex(0, 1);
      var z = one.add(i);
      assert.equal(z.re(), 1);
      assert.equal(z.im(), 1);
    });
  });

  describe('sub()', function () {
    it('implements the subtraction operator', function() {
      var one = new Complex(1);
      var i = new Complex(0, 1);
      var z = one.sub(i);
      assert.equal(z.re(), 1);
      assert.equal(z.im(), -1);
    });
  });

  describe('mul()', function () {
    it('implements the multiplication operator', function() {
      var two = new Complex(2);
      var z = new Complex(1, 1);
      var twoZ = two.mul(z);
      assert.equal(twoZ.re(), 2);
      assert.equal(twoZ.im(), 2);

      z.mul(z);
      assert.equal(z.re(), 0);
      assert.equal(z.im(), 2);
    });
  });

  describe('div()', function () {
    it('implements the division operator', function() {
      var z = new Complex(5);
      var w = new Complex(2, 1);
      //console.log(w.inv().toString());
      z.div(w);
      /*
      assert.equal(z.re(), 2);
      assert.equal(z.im(), -1);
      */
    });
  });

  describe('neg()', function () {
    it('...', function() {
      var z = new Complex(3, 4);
      assert.equal(z.abs(), 5);
    });
  });

  describe('abs()', function () {
    it('', function() {
    });
  });

  describe('arg()', function () {
    it('...', function() {
    });
  });

  describe('inv()', function () {
    it('returns the inverse of an element', function() {
      var z = new Complex(0, 1);
      z.inv();
      assert.equal(z.re(), 0);
      assert.equal(z.im(), -1);
    });
  });

  describe('toString()', function () {
    it('...', function() {
    });
  });

  describe('toMatrix()', function () {
    it('...', function() {
    });
  });
});


