
var assert = require('assert');
var algebra = require('../../index.js');

var Field     = algebra.Field;
var Real      = algebra.Real.Element;
var RealField = algebra.Real.Field;

var R = new RealField();

describe('RealField', function () {
  describe('constructor', function () {
    it('requires no argument', function() {
      assert.ok(R instanceof RealField);
    });
  });

  describe('inherits', function () {
    it('from Field', function() {
      assert.ok(R instanceof Field);
    });
  });

  describe('getZero()', function() {
    it('returns zero', function() {
      assert.equal(R.getZero().num(), 0);
    });
  });

  describe('getOne()', function() {
    it('returns one', function() {
      assert.equal(R.getOne().num(), 1);
    });
  });

  describe('eq(<number|Real>,<number|Real>)', function() {
  });

  describe('neg()', function() {
  });

  describe('add(<number|Real>,<number|Real>)', function() {
  });

  describe('sub(<number|Real>,<number|Real>)', function() {
  });

  describe('mul(<number|Real>,<number|Real>)', function() {
    it('implements the multiplication operator', function() {
      var x1 = new Real(2);
      var x2 = new Real(5);
      var x = R.mul(x1, x2);
      assert.equal(x.num(), 10);
    });

    it('coerces number type', function() {
      //var x = R.mul(2, 5);
      //assert.equal(x.num(), 10);
    });
  });

  describe('div(<number|Real>,<number|Real>)', function() {
  });

  describe('inv(<number|Real>)', function() {
  });
});


