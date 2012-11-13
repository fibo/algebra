
var assert  = require('assert');
var algebra = require('../../index.js');

var MatrixRing = algebra.MatrixRing;
var MnR        = algebra.Real.MatrixRing;
var RealField  = algebra.Real.Field;
var SquareMatrix  = algebra.SquareMatrix;

var M2R = new MnR(2);

describe('RealMatrixRing', function () {
  describe('constructor:', function () {
    it('', function () {
    });
  });

  describe('inheritance:', function () {
    it('is a MatrixRing', function () {
      assert.ok(M2R instanceof MatrixRing);
    });
  });

  describe('getField()', function () {
    it('returns the Real field', function () {
      assert.ok(M2R.getField() instanceof RealField);
    });
  });

  describe('getOrder()', function () {
    it('returns the order', function () {
      assert.equal(M2R.getOrder(), 2);
    });
  });

  describe('Matrix()', function () {
    it('returns a SquareMatrix constructor', function () {
      var matrix = new M2R.Matrix(1,2,3,4);
      assert.ok(typeof matrix == 'object');
      console.log(matrix.ij(0,0));
    });
  });
});

