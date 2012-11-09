var assert = require('assert');
var algebra = require('../../index.js');

var Field     = algebra.Field;
var Real      = algebra.Real.Element;
var RealField = algebra.Real.Field;

var R = new RealField();

describe('RealField', function () {
  describe('constructor:', function () {
    it('requires no argument', function() {
      assert.ok(R instanceof RealField);
    });
  });

  describe('inheritance:', function () {
    it('is a Field', function() {
      assert.ok(R instanceof Field);
    });

    it('implements coerceToElement()', function() {
      var x = R.coerceToElement(1);
      assert.ok(x instanceof Real);
    });
  });

  describe('getZero()', function() {
    it('returns the zero element', function() {
      assert.equal(R.getZero().num(), 0);
    });
  });

  describe('getOne()', function() {
    it('returns the one element', function() {
      assert.equal(R.getOne().num(), 1);
    });
  });

  describe('eq(<number|Real>,<number|Real>)', function() {
    it('returns true if two elements are equal', function() {
      var x = new Real(-1);
      var y = new Real(-1);

      assert.ok(R.eq(x, y));
      assert.ok(R.eq(y, x));
    });

    it('coerces number type', function() {
      var x = new Real(-1);
      assert.ok(R.eq(x, -1));
      assert.ok(R.eq(-1, x));
      assert.ok(R.eq(-1, -1));
    });
  });

  describe('neg(<number|Real>)', function() {
    it('returns the inverse by addition', function() {
      var x = new Real(2);
      var y = R.neg(x)
      assert.equal(y.num(), -2);
    });

    it('coerces number type', function() {
      var x = 5;
      var y = R.neg(x);
      assert.equal(y.num(), -5);
    });
  });

  describe('add(<number|Real>,<number|Real>)', function() {
    it('returns the result of addition', function() {
      var x = new Real(1);
      var y = new Real(-2);

      var z = R.add(x, y)

      assert.equal(z.num(), -1);
    });

    it('coerces number type', function() {
      var x = R.add(2, 5);
      assert.equal(x.num(), 7);
    });
  });

  describe('sub(<number|Real>,<number|Real>)', function() {
    it('returns the result of subtraction', function() {
      var x = new Real(1);
      var y = new Real(2);

      var z = R.sub(x, y)

      assert.equal(z.num(), -1);
    });

    it('coerces number type', function() {
      var x = R.sub(2, 5);
      assert.equal(x.num(), -3);
    });
  });

  describe('inv(<number|Real>)', function() {
    it('returns the inverse by multiplication', function() {
      var x = new Real(-2);
      var y = R.inv(x);
      assert.equal(y.num(), -0.5);
    });

    it('coerces number type', function() {
      var x = R.inv(4);
      assert.equal(x.num(), 0.25);
    });
  });

  describe('mul(<number|Real>, <number|Real>)', function() {
    it('implements the multiplication operator', function() {
      var x = new Real(2);
      var y = new Real(5);
      var z = R.mul(x, y);
      assert.equal(z.num(), 10);
    });

    it('coerces number type', function() {
      var x = R.mul(2, 5);
      assert.equal(x.num(), 10);
    });
  });

  describe('div(<number|Real>, <number|Real>)', function() {
    it('implements the division operator', function() {
      var x = new Real(20);
      var y = new Real(4);

      var z = R.div(x, y);

      assert.equal(z.num(), 5);
    });

    it('coerces number type', function() {
      var x = new Real(15);

      var y = R.div(x, 3);
      assert.equal(y.num(), 5);

      var z = R.div(30, x);
      assert.equal(z.num(), 2);
    });

  });
});

