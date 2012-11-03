
var assert  = require('assert');
var algebra = require('../../index.js');

var MatrixRing = algebra.MatrixRing;
var MnR        = algebra.Real.MatrixRing;
var RealField  = algebra.Real.Field;

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
});

