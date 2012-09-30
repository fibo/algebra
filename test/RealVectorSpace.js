
var assert = require('assert');
var algebra = require('../index.js');

var RealVectorSpace = algebra.Real.VectorSpace;
var VectorSpace     = algebra.VectorSpace;

describe('RealVectorSpace', function () {
  describe('constructor', function () {
    it('accepts 1 argument', function() {
      var R2 = new RealVectorSpace(2);
      assert.ok(R2 instanceof RealVectorSpace);
    });
  });

  describe('inherits', function () {
    it('from VectorSpace', function() {
      var R4 = new RealVectorSpace(4);
      assert.ok(R4 instanceof VectorSpace);
    });
  });
});

