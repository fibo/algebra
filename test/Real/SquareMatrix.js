
var assert = require('assert')
  , algebra = require('../../index.js')

var abstractMethod   = algebra.util.abstractMethod
  , RealSquareMatrix = algebra.Real.SquareMatrix
  , RealMatrix       = algebra.Real.Matrix

var matrix = new RealSquareMatrix([1, 2, 3,
                                   4, 5, 6,
                                   7, 8, 9])

describe('RealSquareMatrix', function () {
  describe('Constructor', function () {
    it('throws Error if order is not a positive integer', function () {
      assert.throws(function () { new RealSquareMatrix([1, 2, 3]) }, Error)
    })
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

    describe('determinant()', function () {
      it('computes the determinant of the matrix', function () {
        var matrix1 = new RealSquareMatrix([1, 2,
                                            2, 1])

        assert.equal(matrix1.determinant().num(), -3)
      })
    })

    describe('det()', function () {
      it('is an alias of determinant()', function () {
        assert.ok(matrix.det === matrix.determinant)
      })
    })
  })
})

