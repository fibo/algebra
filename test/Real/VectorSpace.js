
var algebra = require('../../index.js')
  , assert  = require('assert')

var RealVector      = algebra.Real.Vector
  , RealVectorSpace = algebra.Real.VectorSpace
  , VectorSpace     = algebra.VectorSpace

var R2 = new RealVectorSpace(2)

describe('RealVectorSpace', function () {
  describe('Constructor', function () {
    it('accepts 1 argument', function () {
      var R2 = new RealVectorSpace(2)
      assert.ok(R2 instanceof RealVectorSpace)
    })
  })

  describe('Inheritance', function () {
    it('is a VectorSpace', function () {
      var R4 = new RealVectorSpace(4)
      assert.ok(R4 instanceof VectorSpace)
    })
  })

  describe('Methods', function () {
    describe('Vector', function () {
      it('is a RealVector constructor'/*, function () {
        var vector = new R2.Vector([0, 0])

        assert.ok(vector instanceof RealVector)
      }*/)
    })
  })
})

