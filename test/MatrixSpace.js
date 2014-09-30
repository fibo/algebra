
var algebra = require('..')
  , should = require('should')

var MatrixSpace = algebra.MatrixSpace
  , Real = algebra.Real

describe('MatrixSpace', function () {
  describe('constructor', function () {
    it('has signature (Field, numRows, numCols)', function () {
      var M2x3 = new MatrixSpace(Real, 2, 3)

      M2x3.should.be.instanceOf(MatrixSpace)
    })
  })

  describe('Matrix', function () {/*
    var R2 = new MatrixSpace(Real, 2)
    
    var vector = R2.Matrix([0, 1])
  */})
})

