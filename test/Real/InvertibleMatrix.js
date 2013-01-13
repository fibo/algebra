
var assert = require('assert');
var algebra = require('../../index.js');

var RealInvertibleMatrix = algebra.Real.InvertibleMatrix;
var RealSquareMatrix = algebra.Real.SquareMatrix;

describe('RealInvertibleMatrix', function () {
  describe('constructor:', function () {
    it('works', function () {
      var arg = {};
      arg.order = 2;
      arg.elements = [1, 2, 3, 4];

      var matrix = new RealInvertibleMatrix(arg);

      assert.ok(matrix instanceof RealInvertibleMatrix);
    });

    it('defaults to Identity', function () {
      var arg = {};
      arg.order = 4;
      var matrix = new RealInvertibleMatrix(arg);
      //TODO
    });
  });

  describe('inheritance:', function () {
    it('from RealSquareMatrix', function () {
      var matrix = new RealInvertibleMatrix({order:3});
      assert.ok(matrix instanceof RealSquareMatrix);
    });
  });
});


