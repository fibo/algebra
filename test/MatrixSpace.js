
var algebra = require('..')
  , should = require('should')

var MatrixSpace = algebra.MatrixSpace
  , Real = algebra.Real

describe('MatrixSpace', function () {
  describe('constructor', function () {
    it('has signature (Field, numRows, numCols)', function () {
      var M2x3 = new MatrixSpace(Real, 2, 3)

      M2x3.should.be.instanceOf(MatrixSpace)

      M2x3.numRows.should.be.eql(2)
      M2x3.numCols.should.be.eql(3)
    })

    it('has signature (Field, numRows) and numCols defaults to numRows', function () {
      var M2x2 = new MatrixSpace(Real, 2)

      M2x2.should.be.instanceOf(MatrixSpace)

      M2x2.numRows.should.be.eql(2)
      M2x2.numCols.should.be.eql(2)
    })
  })

  describe('Matrix', function () {/*
    var R2 = new MatrixSpace(Real, 2)
    
    var vector = R2.Matrix([0, 1])
  */})
})

