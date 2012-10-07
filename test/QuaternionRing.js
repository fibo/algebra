
var assert = require('assert');
var algebra = require('../index.js');

var Quaternion      = algebra.Quaternion.Element;
var QuaternionRing = algebra.Quaternion.Ring;

var H = new QuaternionRing();

describe('QuaternionRing', function () {
  //describe('constructor', function () {
  //  it('requires: ..., ...', function() {
  //    //assert.ok(... instanceof ...);
  //  });
  //});

  //describe('inherits', function () {
  //  it('from ...', function() {
  //  });
  //});

  describe('getZero()', function () {
    it('returns the 0 element', function() {
      var zero = H.getZero();
      assert.equal(zero.re(), 0);
      //TODO Vector.eq() assert.equal(zero.im(), 0);
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
      //assert.equal(one.im(), 0);
    });
  });

  describe('getMinusOne()', function () {
    it('returns the -1 element', function() {
      var minusOne = C.getMinusOne();
      minusOne.mul(minusOne);
      assert.equal(minusOne.re(), 1);
      //assert.equal(minusOne.im(), 0);
    });
  });

  describe('getI()', function () {
    it('returns the i element', function() {
      var i = C.getI();
      assert.equal(i.re(), 0);
      assert.equal(i.im(), 1);
    });

    it('is a -1 square root', function() {
      var i = C.getI();
      var minusOne = i.mul(i);
      assert.ok(minusOne.eq(C.getMinusOne()));
    });
  });

  describe('getMinusI()', function () {
    it('returns the -i element', function() {
      var minusI = C.getMinusI();
      assert.equal(minusI.re(), 0);
      //assert.equal(minusI.im(), -1);
    });
  });

  describe('getJ()', function () {
    it('returns the j element', function() {
      var j = C.getJ();
      assert.equal(j.re(), 0);
      //assert.equal(i.im(), 1);
    });

    it('is a -1 square root', function() {
      var j = C.getI();
      var minusOne = j.mul(j);
      assert.ok(minusOne.eq(H.getMinusOne()));
    });
  });

  describe('getMinusJ()', function () {
    it('returns the -j element', function() {
      var minusJ = H.getMinusJ();
      assert.equal(minusJ.re(), 0);
      //assert.equal(minusI.im(), -1);
    });
  });

  describe('getK()', function () {
    it('returns the k element', function() {
      var k = C.getK();
      assert.equal(k.re(), 0);
      //assert.equal(k.im(), 1);
    });

    it('is a -1 square root', function() {
      var j = C.getJ();
      var minusOne = j.mul(j);
      assert.ok(minusOne.eq(H.getMinusOne()));
    });
  });

  describe('getMinusJ()', function () {
    it('returns the -j element', function() {
      var minusJ = C.getMinusJ();
      assert.equal(minusJ.re(), 0);
      //assert.equal(minusI.im(), -1);
    });
  });
});


