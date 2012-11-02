
var assert  = require('assert');
var algebra = require('../../index.js');

var MatrixRing = algebra.MatrixRing;
var MnR        = algebra.Real.MatrixRing;

describe('RealMatrixRing', function () {
  describe('constructor:', function () {
    it('', function () {
    });
  });

  describe('inheritance:', function () {
    it('is a MatrixRing', function () {
      var M2R = new MnR(2);
      assert.ok(M2R instanceof MatrixRing);
    });
  });
});

