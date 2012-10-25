
var assert = require('assert');
var algebra = require('../../index.js');

var Complex      = algebra.Complex.Element;
var ComplexField = algebra.Complex.Field;

var C = new ComplexField();


describe('ComplexElement', function () {
  describe('constructor:', function () {
    it('accepts 0 arguments', function() {
      var z = new Complex();
      assert.ok(z instanceof Complex);
    });

    it('accepts 1 argument, second one defaults to 0', function() {
      var z = new Complex(1);

      assert.ok(z instanceof Complex);

      assert.equal(z.im(), 0);
    });

    it('accepts 2 arguments', function() {
      var z = new Complex(1, 2);

      assert.ok(z instanceof Complex);
    });
  });

  describe('inheritance:', function () {
    it('is a ...', function() {
    });
  });

  describe('clone()', function () {
    it('returns a copy of the object', function() {
      var z = new Complex(-15, 2);
      var w = z.clone();

      assert.ok(w instanceof Complex);

      assert.ok(z.eq(w));

      assert.ok(z !== w);
    });
  });

  describe('re()', function () {
    it('returns the real part', function() {
      var z = new Complex(1, 2);
      assert.equal(z.re(), 1);
    });
  });

  describe('im()', function () {
    it('returns the imaginary part', function() {
      var z = new Complex(1, 2);
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

    it('can be chained', function() {
      assert.ok(z.conj().conj() instanceof Complex);
    });
  });

  describe('eq(number|Complex)', function () {
    it('returns true if two elements are equal', function() {
      var z = new Complex(-1, 5);
      var w = new Complex(-1, 5);

      assert.ok(z.eq(w));
      assert.ok(w.eq(z));
    });

    it('corces number type', function() {
      var z = new Complex(-1);
      assert.ok(z.eq(-1));
    });
  });

  describe('neg()', function () {
    it('implements inversion by addition operator', function() {
      var z = new Complex(4, 1);
      var w = z.clone().neg();
      assert.ok(z.add(w).eq(C.getZero()));
    });

    it('can be chained', function() {
      var z = new Complex(-1,8);
      assert.ok(z.neg().neg() instanceof Complex);
    });
  });

  describe('add(<number|Complex>)', function () {
    it('implements the addition operator', function() {
      var z = new Complex(1, 4);
      var w = new Complex(0, 1);

      z.add(w);

      assert.equal(z.re(), 1);
      assert.equal(z.im(), 5);
    });

    it('coerces number type', function() {
      var z = new Complex(2, 1);

      z.add(3);

      assert.equal(z.re(), 5);
      assert.equal(z.im(), 1);
    });

    it('can be chained', function() {
      var z = new Complex(1, 2);

      assert.ok(z.add(1).add(z) instanceof Complex);
    });
  });

  // TODO continnua da qui con uniformizzazione Real - Complex
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


