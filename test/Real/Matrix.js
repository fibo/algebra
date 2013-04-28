
var assert  = require('assert')
  , algebra = require('../../index.js')

var abstractMethod = algebra.util.abstractMethod
  , Matrix         = algebra.Matrix
  , RealElement    = algebra.Real.Element
  , RealMatrix     = algebra.Real.Matrix

// TODO var matrix = new RealMatrix([2, 3], [1, 2, 3 ,4, 5 ,6])
var matrix = new RealMatrix({
  numberOfColumns : 3,
  numberOfRows    : 2,
  elements        : [1, 2, 3,
                     4, 5, 6]
})

describe('RealMatrix', function () {
  describe('Constructor', function () {
  })

  describe('Inheritance', function () {
    it('is a Matrix', function () {
      assert.ok(matrix instanceof Matrix)
    })
  })

  describe('Methods', function () {
    describe('getElementConstructor()', function () {
      it('returns RealElement', function () {
        assert.ok(matrix.getElementConstructor() === RealElement)
      })
    })
  })
})

