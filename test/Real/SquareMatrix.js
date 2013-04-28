
var assert = require('assert')
  , algebra = require('../../index.js')

var abstractMethod   = algebra.util.abstractMethod
  , RealSquareMatrix = algebra.Real.SquareMatrix
  , RealMatrix       = algebra.Real.Matrix

var matrix = new RealSquareMatrix({
  order:3,
  elements: [1, 2, 3,
             4, 5, 6,
             7, 8, 9]
})

describe('RealSquareMatrix', function () {
  describe('Constructor', function () {
  })

  describe('Inheritance', function () {
    it('is a RealMatrix', function () {
      assert.ok(matrix instanceof RealMatrix)
    })
  })

  describe('Methods', function () {
    describe('getOrder()', function () {
      it('returns the order of the matrix', function () {
        assert.equal(matrix.getOrder(), 3)
      })
    })

    describe('det()', function () {
      it('is an alias of determinant()', function () {
        assert.ok(matrix.det === matrix.determinant)
      })
    })

    describe('determinant()', function () {
      it('Computes the determinant of the matrix'/*, function () {
        var arg = {}
        arg.order = 2
        arg.elements = [1, 2, 2, 1]

        var matrix1 = new RealSquareMatrix(arg)
        assert.equal(matrix1.determinant().num(), -3)
      }*/)
    })
  })
})

