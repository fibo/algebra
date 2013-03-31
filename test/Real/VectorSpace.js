
var assert = require('assert');
var algebra = require('../../index.js');

var RealVectorSpace = algebra.Real.VectorSpace;
var VectorSpace     = algebra.VectorSpace;

describe('RealVectorSpace', function () {
  describe('Constructor', function () {
    it('accepts 1 argument', function () {
      var R2 = new RealVectorSpace(2);
      assert.ok(R2 instanceof RealVectorSpace);
    });
  });

  describe('Inheritance', function () {
    it('is a VectorSpace', function () {
      var R4 = new RealVectorSpace(4);
      assert.ok(R4 instanceof VectorSpace);
    });
  });
});

