
var algebra = require('..'),
     should = require('should')

var MatrixSpace = algebra.MatrixSpace,
    Real        = algebra.Real

describe('MatrixSpace', function () {
  var R2x3 = MatrixSpace(Real)(2, 3),
      R2x2 = MatrixSpace(Real)(2)

  it('has signature (Scalar)(numRows, numCols)', function () {
    R2x3.numRows.should.be.eql(2)
    R2x3.numCols.should.be.eql(3)
    R2x3.isSquare.should.be.not.ok
  })

  it('has signature (Scalar)(numRows) and numCols defaults to numRows', function () {
    R2x2.numRows.should.be.eql(2)
    R2x2.numCols.should.be.eql(2)
    R2x2.isSquare.should.be.ok
  })

  describe('static', function () {
    it('addition()', function () {
    })

    it('subtraction()', function () {
    })

    it('multiplication()', function () {
    })

    it('transpose()', function () {
    })

    it('adjoint()', function () {
    })
  })

  describe('Matrix', function () {
    var matrix1  = new R2x2([2, 3,  1, 1]),
        matrix2  = new R2x2([0, 1, -1, 0])

    matrix1.should.be.instanceOf(R2x2)

    it('determinant', function () {
      matrix1.determinant.data.should.be.eql(-1)
    })

    it('addition()', function () {
    })

    it('subtraction()', function () {
    })

    it('multiplication()', function () {
    })

    it('transpose()', function () {
    })

    it('adjoint()', function () {
    })
  })
})

