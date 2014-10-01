
var algebra = require('..')
  , should = require('should')

var MatrixSpace = algebra.MatrixSpace
  , Real = algebra.Real

describe('MatrixSpace', function () {
  describe('constructor', function () {
    it('has signature (Field, numRows, numCols)', function () {
      var R2x3 = new MatrixSpace(Real, 2, 3)

      R2x3.should.be.instanceOf(MatrixSpace)

      R2x3.numRows.should.be.eql(2)
      R2x3.numCols.should.be.eql(3)
    })

    it('has signature (Field, numRows) and numCols defaults to numRows', function () {
      var R2x2 = new MatrixSpace(Real, 2)

      R2x2.should.be.instanceOf(MatrixSpace)

      R2x2.numRows.should.be.eql(2)
      R2x2.numCols.should.be.eql(2)
    })
  })

  describe('Matrix', function () {
      var R2x2 = new MatrixSpace(Real, 2)
    var matrix = new R2x2.Matrix([1, 0, 0, 1])
  })
})

