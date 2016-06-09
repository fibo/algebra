describe('MatrixSpace', () => {
  var algebra = require('algebra')

  var notDefined = require('not-defined')

  var MatrixSpace = algebra.MatrixSpace
  var Real = algebra.Real

  var methodBinaryOperator = require('./features/methodBinaryOperator')
  var staticBinaryOperator = require('./features/staticBinaryOperator')
  var staticUnaryOperator = require('./features/staticUnaryOperator')

  var R1x4 = MatrixSpace(Real)(1, 4)
  var R2x3 = MatrixSpace(Real)(2, 3)
  var R2x2 = MatrixSpace(Real)(2)
  var R3x2 = MatrixSpace(Real)(3, 2)

  it('has signature (Scalar)(numRows, numCols)', () => {
    R2x3.numRows.should.be.eql(2)
    R2x3.numCols.should.be.eql(3)
  })

  it('has signature (Scalar)(numRows) and numCols defaults to numRows', () => {
    R2x2.numRows.should.be.eql(2)
    R2x2.numCols.should.be.eql(2)
  })

  var matrix1 = new R2x2([ 2, 3,
                           1, 1 ])
  var matrix2 = new R2x2([ 0, 1,
                          -1, 0 ])
  var matrix3 = new R2x3([ 0, 1, 2,
                          -2, 1, 0 ])

  describe('data', () => {
    it('is enumerable', () => {
      matrix1.propertyIsEnumerable('data').should.be.ok
    })

    it('is immutable', () => {
      ;(() => {
        'use strict'
        matrix1.data = [2, 1,
                        5, 4]
      }).should.throwError()
    })
  })

  describe('numRows', () => {
    it('returns the number of rows', () => {
      matrix1.numRows.should.be.eql(2)
      matrix2.numRows.should.be.eql(2)
      matrix3.numRows.should.be.eql(2)
    })
  })

  describe('numCols', () => {
    it('returns the number of cols', () => {
      matrix1.numCols.should.be.eql(2)
      matrix2.numCols.should.be.eql(2)
      matrix3.numCols.should.be.eql(3)
    })
  })

  describe('determinant', () => {
    it('returns a scalar', () => {
      matrix1.determinant.should.be.instanceOf(Real)
      matrix2.determinant.should.be.instanceOf(Real)

      matrix1.determinant.data.should.be.eql(-1)
      matrix2.determinant.data.should.be.eql(1)
    })
  })

  describe('addition()', () => {
    var operator = 'addition'

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

    it('accepts multiple arguments', () => {
      R2x2.addition([ 2, 3,
                      1, 1 ],
                    [ 0, 1,
                     -1, 0 ],
                    [ -2, -4,
                      0, -1 ]).should.deepEqual([0, 0,
                                                 0, 0])

      var matrix = new R2x2([ 2, 3,
                              1, 1 ])
      matrix.addition([ 0, 1,
                       -1, 0 ],
                      [ -2, -4,
                         0, -1 ]).data.should.deepEqual([0, 0,
                                                       0, 0])
    })
  })

  describe('subtraction()', () => {
    var operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R2x2, operator,
        [2, 3,
         1, 1],
        [0, 1,
        -1, 0],
        [2, 2,
         2, 1]
    ))

    it('is a class method', methodBinaryOperator(R2x2, operator,
        [2, 3,
         1, 1],
        [0, 1,
        -1, 0],
        [2, 2,
         2, 1]
    ))

    it('accepts multiple arguments', () => {
      R2x2.subtraction([2, 3,
                        1, 1],
                       [0, 1,
                       -1, 0],
                       [2, 4,
                        0, 1]).should.deepEqual([0, -2,
                                                 2, 0])

      var matrix = new R2x2([2, 3,
                             1, 1])
      matrix.subtraction([0, 1,
                          -1, 0],
                         [2, 4,
                          0, 1]).data.should.deepEqual([0, -2,
                                                        2, 0])
    })
  })

  describe('multiplication()', () => {
    var operator = 'multiplication'

    it('is a static method', staticBinaryOperator(R3x2, operator,
        [2, 3,
         1, 1,
         1, 1],
        [0, 1, 1, 1,
        -1, 0, 2, 3],
        [-3, 2, 8, 11,
         -1, 1, 3, 4,
         -1, 1, 3, 4]
    ))

    it('is a class method', methodBinaryOperator(R2x2, operator,
        [2, 3,
         1, 1],
        [0, 1,
        -1, 0],
        [-3, 2,
         -1, 1]
    ))

    it('accepts multiple arguments', () => {
      R2x2.multiplication([1, 2,
                           3, 4],
                          [0, 1,
                          -1, 0],
                          [-1, 0,
                            0, 1]).should.deepEqual([-2, 1,
                                                     -4, 3])

      var matrix = new R2x2([1, 2,
                             3, 4])
      matrix.multiplication([0, 1,
                            -1, 0],
                           [-1, 0,
                             0, 1]).data.should.deepEqual([-2, 1,
                                                           -4, 3])
    })
  })

  describe('trace()', () => {
    var operator = 'trace'

    it('is a static method', staticUnaryOperator(R2x2, operator,
      [1, 2,
       5, 6], 7
    ))

    it('is not available for no square matrices', () => {
      notDefined(R3x2.trace).should.be.true
    })
  })

  describe('trace', () => {
    it('is a static attribute', () => {
      var matrix2x2 = new R2x2([1, 2,
                                5, 6])

      matrix2x2.trace.should.be.eql(7)
    })

    it('is not available for no square matrices', () => {
      var matrix3x2 = new R3x2([1, 2,
                                3, 4,
                                5, 6])

      notDefined(matrix3x2.trace).should.be.true
    })
  })

  describe('transpose()', () => {
    it('is a static operator', () => {
      var matrix3x2 = new R3x2([1, 2,
                                3, 4,
                                5, 6])

      var transposed = R3x2.transpose(matrix3x2)

      transposed.should.deepEqual([1, 3, 5,
                                   2, 4, 6])
    })
  })

  describe('transposed', () => {
    it('is a class attribute', () => {
      var matrix3x2 = new R3x2([1, 2,
                                3, 4,
                                5, 6])

      var transposed = matrix3x2.transposed

      transposed.data.should.deepEqual([1, 3, 5,
                                        2, 4, 6])
    })

    it('holds a transposed matrix', () => {
      var matrix2x3 = new R2x3([1, 2, 3,
                                4, 5, 6])

      matrix2x3.transposed.data.should.deepEqual([1, 4,
                                                  2, 5,
                                                  3, 6])

      matrix2x3.numRows.should.be.eql(matrix2x3.transposed.numCols)
      matrix2x3.numCols.should.be.eql(matrix2x3.transposed.numRows)
    })

    it('is an involution', () => {
      var matrix2x2a = new R2x2([1, 2,
                                 3, 4])

      var matrix2x2b = matrix2x2a.transposed.transposed

      matrix2x2a.data.should.deepEqual(matrix2x2b.data)
    })

    it('returns a vector if the Matrix has one row', () => {
      var matrix1x4 = new R1x4([1, 2, 3, 4])

      var vector = matrix1x4.transposed

      matrix1x4.data.should.deepEqual(vector.data)
      vector.dimension.should.be.eql(matrix1x4.numCols)
    })
  })

  describe('mul()', () => {
    it('is an alias of multiplication()', () => {
      R2x2.mul.should.be.eql(R2x2.multiplication)

      var matrix2x2 = new R2x2([1, 2,
                                3, 4])

      matrix2x2.multiplication.should.be.eql(matrix2x2.mul)
    })
  })

  describe('tr()', () => {
    it('is an alias of transpose()', () => {
      R2x2.tr.should.be.eql(R2x2.transpose)
    })
  })

  describe('tr', () => {
    it('is an alias of transposed', () => {
      var matrix = new R3x2([0, 1,
                             1, 0,
                             2, 2])

      matrix.tr.data.should.be.eql(matrix.transposed.data)
    })
  })
})
