
  var algebra = require('algebra'),
     should = require('should')

var MatrixSpace = algebra.MatrixSpace,
    Real        = algebra.Real

var methodBinaryOperator = require('./features/methodBinaryOperator'),
    methodUnaryOperator  = require('./features/methodUnaryOperator'),
    staticBinaryOperator  = require('./features/staticBinaryOperator'),
    staticUnaryOperator   = require('./features/staticUnaryOperator')

describe('MatrixSpace', function () {
  var R2x3 = MatrixSpace(Real)(2, 3),
      R2x2 = MatrixSpace(Real)(2),
      R3x2 = MatrixSpace(Real)(3, 2)

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

  var matrix1  = new R2x2([ 2, 3,
                            1, 1 ]),
      matrix2  = new R2x2([ 0, 1,
                           -1, 0 ])
      matrix3  = new R2x3([ 0, 1, 2,
                           -2, 1, 0 ])

  describe('numRows', function () {
    it('returns the number of rows', function () {
      matrix1.numRows.should.be.eql(2)
      matrix2.numRows.should.be.eql(2)
      matrix3.numRows.should.be.eql(2)
    })
  })

  describe('numCols', function () {
    it('returns the number of cols', function () {
      matrix1.numCols.should.be.eql(2)
      matrix2.numCols.should.be.eql(2)
      matrix3.numCols.should.be.eql(3)
    })
  })

  describe('determinant', function () {
    it('returns a Scalar', function () {
      matrix1.determinant.should.be.instanceOf(Real)
      matrix2.determinant.should.be.instanceOf(Real)

      matrix1.determinant.data.should.be.eql(-1)
      matrix2.determinant.data.should.be.eql(1)
    })
  })

  describe('addition()', function () {
    operator = 'addition'

    it('is a static method', staticBinaryOperator(R2x2, operator,
        [ 2, 3,
          1, 1 ],
        [ 0, 1,
         -1, 0 ],
        [ 2, 4,
          0, 1 ]
    ))

    it('is a class method', methodBinaryOperator(R2x2, operator,
        [ 2, 3,
          1, 1 ],
        [ 0, 1,
         -1, 0 ],
        [ 2, 4,
          0, 1 ]
    ))
  })

  describe('subtraction()', function () {
    operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R2x2, operator,
        [ 2, 3,
          1, 1 ],
        [ 0, 1,
         -1, 0 ],
        [ 2, 2,
          2, 1 ]
    ))

    it('is a class method', methodBinaryOperator(R2x2, operator,
        [ 2, 3,
          1, 1 ],
        [ 0, 1,
         -1, 0 ],
        [ 2, 2,
          2, 1 ]
    ))
  })

  describe('multiplication()', function () {
    operator = 'multiplication'

    it('is a static method', staticBinaryOperator(R3x2, operator,
        [ 2, 3,
          1, 1,
          1, 1 ],
        [ 0, 1, 1, 1,
         -1, 0, 2, 3 ],
        [ -3, 2, 8, 11,
          -1, 1, 3, 4,
          -1, 1, 3, 4 ]
    ))

    it('is a class method for square matrices', methodBinaryOperator(R2x2, operator,
        [ 2, 3,
          1, 1 ],
        [ 0, 1,
         -1, 0 ],
        [ -3, 2,
          -1, 1 ]
    ))
  })

  describe('transpose()', function () {

    it('is a static operator', function () {
      var matrix3x2a  = new R3x2([1, 2,
                                  3, 4,
                                  5, 6])

      should.deepEqual(R3x2.transpose(matrix3x2a), [1, 3, 5,
                                                    2, 4, 6])
    })

    it('returns a transposed matrix'/*, function () {
      var matrix3x2a  = new R3x2([1, 2, 3,
                                  4, 5, 6])

      var matrixTransposed = matrix3x2a.transpose()

      should.deepEqual(matrixTransposed.data, [1, 4,
                                               2, 5,
                                               3, 6])

      matrix3x2a.numRows.should.be.eql(matrixTransposed.numCols)
      matrix3x2a.numCols.should.be.eql(matrixTransposed.numRows)
    }*/)

    it('is chainable for square matrices', function () {
      var matrix2x2a  = new R2x2([1, 2,
                                  3, 4])

      var matrix2x2b = matrix2x2a.transpose().transpose()

      should.deepEqual(matrix2x2a.data, matrix2x2b.data)
    })
  })
})
