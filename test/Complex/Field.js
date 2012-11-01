
var assert = require('assert');
var algebra = require('../../index.js');

var Field        = algebra.Field;
var Complex      = algebra.Complex.Element;
var ComplexField = algebra.Complex.Field;

var C = new ComplexField();

describe('ComplexField', function () {
  describe('constructor', function () {
    it('works', function() {
      assert.ok(C instanceof ComplexField);
    });
  });

  describe('inheritance', function () {
    it('is a Field', function() {
      assert.ok(C instanceof Field);
    });
  });

  describe('getZero()', function () {
    it('returns the 0 element', function() {
      var zero = C.getZero();

      assert.equal(zero.re(), 0);
      assert.equal(zero.im(), 0);
    });
  });

  describe('getOne()', function () {
    it('returns the 1 element', function() {
      var one = C.getOne();

      assert.equal(one.re(), 1);
      assert.equal(one.im(), 0);
    });

    it('is the multiplication neutral element', function() {
      var one = C.getOne();

      one.mul(one);

      assert.equal(one.re(), 1);
      assert.equal(one.im(), 0);
    });
  });

  describe('getMinusOne()', function () {
    it('returns the -1 element', function() {
      var minusOne = C.getMinusOne();

      minusOne.mul(minusOne);

      assert.equal(minusOne.re(), 1);
      assert.equal(minusOne.im(), 0);
    });
  });

  describe('getI()', function () {
    it('returns the i element', function() {
      var i = C.getI();

      assert.equal(i.re(), 0);
      assert.equal(i.im(), 1);
    });

    it('is the -1 square root', function() {
      var i = C.getI();

      var minusOne = i.mul(i);

      assert.ok(minusOne.eq(C.getMinusOne()));
    });
  });

  describe('getMinusI()', function () {
    it('returns the -i element', function() {
      var minusI = C.getMinusI();

      assert.equal(minusI.re(), 0);
      assert.equal(minusI.im(), -1);
    });
  });
});

