
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

  describe('getElements()', function () {
    it('', function () {
    });
  });

  describe('rightMultiplication()', function () {
    it('implements row by column multiplication at right side', function () {
      var arg = {};
      arg.order = 2;
      arg.elements = [2, 0, 0, 2];
      var elements;

      var matrix1 = new RealSquareMatrix(arg);

      arg.elements = [-1, 0, 0, -1];
      var matrix2 = new RealSquareMatrix(arg);

      matrix1.rightMultiplication(matrix2);

      elements = matrix1.getElements();
      assert.ok(elements[0].eq(-2));
      assert.ok(elements[1].eq(0));
      assert.ok(elements[2].eq(0));
      assert.ok(elements[3].eq(-2));

/*
TODO
      arg.elements = [-0.5, 0, 0, -0.5];
      var matrix3 = new RealSquareMatrix(arg);

      elements = matrix3.getElements();
      assert.ok(elements[0].eq(1));
      assert.ok(elements[1].eq(0));
      assert.ok(elements[2].eq(0));
      assert.ok(elements[3].eq(1));
*/
    });
  });

  describe('leftMultiplication()', function () {
    it('implements row by column multiplication at left side', function () {
    });
  });

  describe('mul()', function () {
    it('is an alias of rightMultiplication', function () {
      var arg = {};
      arg.order = 2;

      var matrix = new RealSquareMatrix(arg);

      assert.ok(matrix.mul === matrix.rightMultiplication);
    });
  });

  describe('lmul()', function () {
    it('is an alias of leftMultiplication', function () {
      var arg = {};
      arg.order = 2;

      var matrix = new RealSquareMatrix(arg);

      assert.ok(matrix.lmul === matrix.leftMultiplication);
    });
  });

  describe('rmul()', function () {
    it('is an alias of rightMultiplication', function () {
      var arg = {};
      arg.order = 2;

      var matrix = new RealSquareMatrix(arg);

      assert.ok(matrix.rmul === matrix.rightMultiplication);
    });
  });
});

