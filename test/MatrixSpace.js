
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


  var matrix1  = new R2x2([2, 3,  1, 1]),
      matrix2  = new R2x2([0, 1, -1, 0])

  matrix1.should.be.instanceOf(R2x2)
  matrix2.should.be.instanceOf(R2x2)

  describe('determinant', function () {
    it('returns a Scalar', function () {
      matrix1.determinant.should.be.instanceOf(Real)
      matrix2.determinant.should.be.instanceOf(Real)

      matrix1.determinant.data.should.be.eql(-1)
      matrix2.determinant.data.should.be.eql(1)
    })
  })

  describe('addition()', function () {
    var matrix1  = new R2x2([2, 3,  1, 1]),
        matrix2  = new R2x2([0, 1, -1, 0])

    it('is a static operator'/*, function () {
      should.deepEqual(R2x2.addition(matrix1, matrix2), [2, 4, 0, 1])
    }*/)

    it('is a mutator', function () {
      matrix1.addition(matrix2)

      should.deepEqual(matrix1.data, [2, 4, 0, 1])
    })
  })

  describe('subtraction()', function () {
    var matrix1  = new R2x2([2, 3,  1, 1]),
        matrix2  = new R2x2([0, 1, -1, 0])

    it('is a static operator')

    it('is a mutator', function () {
      matrix1.subtraction(matrix2)

      should.deepEqual(matrix1.data, [2, 2, 2, 1])
    })
  })

  describe('subtraction()', function () {
    var matrix1  = new R2x2([2, 3,  1, 1]),
        matrix2  = new R2x2([0, 1, -1, 0])

    it('is a static operator')

    it('is a mutator', function () {
      matrix1.subtraction(matrix2)

      should.deepEqual(matrix1.data, [2, 2, 2, 1])
    })
  })


  describe('transpose()', function () {
    it('is a static operator')

    it('is a mutator'/*, function () {
    var matrix  = new R2x2([1, 2,  3,
                            4, 5,  6])

    var matrixTransposed = matrix.transpose()

    should.deepEqual(matrixTransposed.data, [1, 4,
                                             2, 5,
                                             3, 6])
  }*/)
  })

  describe('adjoin()', function () {
    it('is a static operator')

    it('is a mutator')
  })
})

