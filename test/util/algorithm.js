
var assert  = require('assert');
var algebra = require('../../index.js');

var algorithm = algebra.util.algorithm;

var determinant               = algorithm.determinant;
var getAdjointElements        = algorithm.getAdjointElements;
var matrixToArrayIndex        = algorithm.matrixToArrayIndex;
var rowByColumnMultiplication = algorithm.rowByColumnMultiplication;

describe('util.algorithm', function () {
  describe('determinant', function () {
    it('is a function', function () {
      assert.ok(determinant instanceof Function);
    });
  });

  describe('getAdjointElements', function () {
    it('is a function', function () {
      assert.ok(getAdjointElements instanceof Function);
    });
  });

  describe('matrixToArrayIndex', function () {
    it('is a function', function () {
      assert.ok(matrixToArrayIndex instanceof Function);
    });
  });

  describe('rowByColumnMultiplication', function () {
    it('is a function', function () {
      assert.ok(rowByColumnMultiplication instanceof Function);
    });
  });
});
