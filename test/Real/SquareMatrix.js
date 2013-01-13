
var assert = require('assert');
var algebra = require('../../index.js');

var RealSquareMatrix = algebra.Real.SquareMatrix;

describe('RealSquareMatrix', function () {
  describe('constructor:', function () {
    it('works', function () {
      var arg = {};
      arg.order = 2;
      arg.elements = [0, 0, 0, 1];

      var matrix = new RealSquareMatrix(arg);

      assert.ok(matrix instanceof RealSquareMatrix);
    });
  });
});



