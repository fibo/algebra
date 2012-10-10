
var assert = require('assert');
var algebra = require('../index.js');

var Vector = algebra.Vector;
var Rn = algebra.Real.VectorSpace;

var R3 = new Rn(3);

describe('RealVector', function () {
  describe('constructor', function () {
    it('requires: ', function() {
      var v = new R3.Vector();
      //assert.ok(v instanceof RealVector);
    });
  });

  describe('inherits', function () {
    it('from Vector', function() {
      var v = new R3.Vector();
      //assert.ok(v instanceof Vector);
    });
  });

  describe('x(<Integer>', function () {
    it('returns the i-esim coordinate', function() {
      var vector = new R3.Vector(1, 2, 3);
      assert.equal(vector.x(0), 1);
      assert.equal(vector.x(1), 2);
      assert.equal(vector.x(2), 3);
    });
  });

  describe('getElements()', function () {
    it('returns the vector elements', function() {
      var v = new R3.Vector(0, 1, 2);
      assert.deepEqual(v.getElements(), [0, 1, 2]);
    });
  });

  describe('scalar(<Real>)', function () {
    it('implements the per scalar multiplication', function() {
      var v = new R3.Vector(1, 1, 1);

      v.scalar(2);

      assert.deepEqual(v.getElements(), [2, 2, 2]);
    });
  });
});

