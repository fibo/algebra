
var assert  = require('assert');
var algebra = require('../../index.js');

var Matrix     = algebra.Matrix;
var RealMatrix = algebra.Real.Matrix;

var matrix = new RealMatrix();

describe('RealMatrix', function () {
  describe('Constructor', function () {
    it('works', function () {
    });
  });

  describe('Inheritance', function () {
    it('is a Matrix', function () {
      assert.ok(matrix instanceof Matrix);
    });
  });
});

