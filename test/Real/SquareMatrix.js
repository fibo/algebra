
var assert = require('assert');
var algebra = require('../../index.js');

var RealSquareMatrix = algebra.Real.SquareMatrix;

var matrix = new RealSquareMatrix({
  order:4,
  elements: [1, 2, 3, 4,
             5, 6, 7, 8,
             9, 0, 1, 2,
             3, 4, 5, 6]
});

describe('RealSquareMatrix', function () {
  describe('constructor:', function () {
    it('works', function () {
      var arg = {};
      arg.order = 2;
      arg.elements = [0, 0, 0, 1];

      var matrix1 = new RealSquareMatrix(arg);

      assert.ok(matrix1 instanceof RealSquareMatrix);
    });
  });

  describe('row(<number>)', function () {
    it('is an alias of getRowByIndex(<number>)', function () {
      assert.ok(matrix.row === matrix.getRowByIndex);
    });
  });

  describe('col(<number>)', function () {
    it('is an alias of getColumnByIndex(<number>)', function () {
      assert.ok(matrix.col === matrix.getColumnByIndex);
    });
  });

  describe('det()', function () {
    it('is an alias of determinant()', function () {
      assert.ok(matrix.det === matrix.determinant);
    });
  });

  describe('determinant()', function () {
    it('Computes the determinant of the matrix', function () {
      var arg = {};
      arg.order = 2;
      arg.elements = [1, 2, 2, 1];

      var matrix1 = new RealSquareMatrix(arg);
      assert.equal(matrix1.determinant().num(), -3);
    });
  });

  describe('getColumnByIndex(<number>)', function () {
    it('', function () {
      var col = matrix.getColumnByIndex(0);
      assert.ok(col[0].eq(1));
      assert.ok(col[1].eq(5));
      assert.ok(col[2].eq(9));
      assert.ok(col[3].eq(3));

      var col = matrix.getColumnByIndex(3);
      assert.ok(col[0].eq(4));
      assert.ok(col[1].eq(8));
      assert.ok(col[2].eq(2));
      assert.ok(col[3].eq(6));
    });
  });

  describe('getRowByIndex(<number>)', function () {
    it('', function () {
      var row = matrix.getRowByIndex(0);
      assert.ok(row[0].eq(1));
      assert.ok(row[1].eq(2));
      assert.ok(row[2].eq(3));
      assert.ok(row[3].eq(4));

      var row = matrix.getRowByIndex(3);
      assert.ok(row[0].eq(3));
      assert.ok(row[1].eq(4));
      assert.ok(row[2].eq(5));
      assert.ok(row[3].eq(6));
    });
  });

  describe('getElements()', function () {
    it('', function () {
      var elements = matrix.getElements();

      assert.ok(elements[0].eq(1));
      assert.ok(elements[1].eq(2));
      assert.ok(elements[2].eq(3));
      assert.ok(elements[3].eq(4));
      assert.ok(elements[4].eq(5));
      assert.ok(elements[5].eq(6));
      assert.ok(elements[6].eq(7));
      assert.ok(elements[7].eq(8));
      assert.ok(elements[8].eq(9));
      assert.ok(elements[9].eq(0));
      assert.ok(elements[10].eq(1));
      assert.ok(elements[11].eq(2));
      assert.ok(elements[12].eq(3));
      assert.ok(elements[13].eq(4));
      assert.ok(elements[14].eq(5));
      assert.ok(elements[15].eq(6));
    });
  });

  describe('rightMultiplication(<Matrix>)', function () {
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

      arg.elements = [-0.5, 0, 0, -0.5];
      var matrix3 = new RealSquareMatrix(arg);

      matrix3.mul(matrix1);
      elements = matrix3.getElements();
      assert.ok(elements[0].eq(1));
      assert.ok(elements[1].eq(0));
      assert.ok(elements[2].eq(0));
      assert.ok(elements[3].eq(1));
    });
  });

  describe('leftMultiplication()', function () {
    it('implements row by column multiplication at left side', function () {
    });
  });

  describe('ij()', function () {
    it('is an alias of getElementByIndexes', function () {
      assert.ok(matrix.ij === matrix.getElementByIndexes);
    });
  });

  describe('getElementByIndexes()', function () {
    it('', function () {
      assert.ok(matrix.ij(0,0).eq(1));
      assert.ok(matrix.ij(0,1).eq(2));
      assert.ok(matrix.ij(0,2).eq(3));
      assert.ok(matrix.ij(0,3).eq(4));
      assert.ok(matrix.ij(1,0).eq(5));
      assert.ok(matrix.ij(1,1).eq(6));
      assert.ok(matrix.ij(1,2).eq(7));
      assert.ok(matrix.ij(1,3).eq(8));
      assert.ok(matrix.ij(2,0).eq(9));
      assert.ok(matrix.ij(2,1).eq(0));
      assert.ok(matrix.ij(2,2).eq(1));
      assert.ok(matrix.ij(2,3).eq(2));
      assert.ok(matrix.ij(3,0).eq(3));
      assert.ok(matrix.ij(3,1).eq(4));
      assert.ok(matrix.ij(3,2).eq(5));
      assert.ok(matrix.ij(3,3).eq(6));
    });
  });

  describe('mul()', function () {
    it('is an alias of rightMultiplication', function () {
      assert.ok(matrix.mul === matrix.rightMultiplication);
    });
  });

  describe('dot()', function () {
    it('is an alias of dotMultiplication', function () {
      //assert.ok(matrix.dot === matrix.dotMultiplication);
    });
  });

  describe('dotMultiplication()', function () {
    it('', function () {
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

