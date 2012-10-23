
var assert = require('assert');
var algebra = require('../index.js');

var Vector      = algebra.Vector;
var VectorSpace = algebra.VectorSpace;
var RealField   = algebra.Real.Field;

var R = new RealField();

describe('VectorSpace', function () {
  describe('constructor:', function () {
    it('requires field', function() {
    });

    it('requires dim', function() {
    });
  });

  describe('getDim()', function () {
    it('returns space dimension', function() {
    });
  });

  describe('getZero()', function () {
    it('returns the zero vector', function() {

      var dim = 4;
      var field = R;
      var zeroElement = R.getZero();

      var V = new VectorSpace({
        dim: 4,
        field: R
      });

      var zeroVector = V.getZero();
      assert.ok(zeroVector instanceof Vector);

      for (var i = 0; i < dim; i++) {
        assert.ok(zeroVector.getElement(i).eq(zeroElement));
      }
    });
  });
});

