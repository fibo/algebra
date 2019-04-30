/* eslint-disable indent */

describe('MatrixSpace', () => {
  const algebra = require('algebra')

  const notDefined = require('not-defined')

  const MatrixSpace = algebra.MatrixSpace
  const Real = algebra.Real

  const methodBinaryOperator = require('./features/methodBinaryOperator')
  const staticBinaryOperator = require('./features/staticBinaryOperator')
  const staticUnaryOperator = require('./features/staticUnaryOperator')

  const R1x4 = MatrixSpace(Real)(1, 4)
  const R2x3 = MatrixSpace(Real)(2, 3)
  const R2x2 = MatrixSpace(Real)(2)
  const R3x2 = MatrixSpace(Real)(3, 2)

  it('has signature (Scalar)(numRows, numCols)', () => {
    R2x3.numRows.should.be.eql(2)
    R2x3.numCols.should.be.eql(3)
  })

  it('has signature (Scalar)(numRows) and numCols defaults to numRows', () => {
    R2x2.numRows.should.be.eql(2)
    R2x2.numCols.should.be.eql(2)
  })

  const matrix1 = new R2x2([ 2, 3,
                           1, 1 ])
  const matrix2 = new R2x2([ 0, 1,
                          -1, 0 ])
  const matrix3 = new R2x3([ 0, 1, 2,
                          -2, 1, 0 ])

  describe('data', () => {
    it('is enumerable', () => {
      matrix1.propertyIsEnumerable('data').should.be.ok()
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

  // describe('determinant', () => {
  //   it('returns a scalar', () => {
  //     matrix1.determinant.should.be.instanceOf(Real)
  //     matrix2.determinant.should.be.instanceOf(Real)

  //     matrix1.determinant.data.should.be.eql(-1)
  //     matrix2.determinant.data.should.be.eql(1)
  //   })
  // })

  // describe('addition()', () => {
  //   const operator = 'addition'

  //   it('is a static method', staticBinaryOperator(R2x2, operator,
  //     [ 2, 3,
  //       1, 1 ],
  //     [ 0, 1,
  //      -1, 0 ],
  //     [ 2, 4,
  //       0, 1 ]
  //    ))

  //   it('is a class method', methodBinaryOperator(R2x2, operator,
  //     [ 2, 3,
  //       1, 1 ],
  //     [ 0, 1,
  //      -1, 0 ],
  //     [ 2, 4,
  //       0, 1 ]
  //   ))

  //   it('accepts multiple arguments', () => {
  //     R2x2.addition([ 2, 3,
  //                     1, 1 ],
  //                   [ 0, 1,
  //                    -1, 0 ],
  //                   [ -2, -4,
  //                     0, -1 ]).should.deepEqual([ 0, 0,
  //                                                 0, 0 ])

  //     const matrix = new R2x2([ 2, 3,
  //                             1, 1 ])
  //     matrix.addition([ 0, 1,
  //                      -1, 0 ],
  //                     [ -2, -4,
  //                        0, -1 ]).data.should.deepEqual([ 0, 0,
  //                                                         0, 0 ])
  //   })
  // })

  // describe('subtraction()', () => {
  //   const operator = 'subtraction'

  //   it('is a static method', staticBinaryOperator(R2x2, operator,
  //       [2, 3,
  //        1, 1],
  //       [0, 1,
  //       -1, 0],
  //       [2, 2,
  //        2, 1]
  //   ))

  //   it('is a class method', methodBinaryOperator(R2x2, operator,
  //       [2, 3,
  //        1, 1],
  //       [0, 1,
  //       -1, 0],
  //       [2, 2,
  //        2, 1]
  //   ))

  //   it('accepts multiple arguments', () => {
  //     R2x2.subtraction([2, 3,
  //                       1, 1],
  //                      [0, 1,
  //                      -1, 0],
  //                      [2, 4,
  //                       0, 1]).should.deepEqual([0, -2,
  //                                                2, 0])

  //     const matrix = new R2x2([2, 3,
  //                            1, 1])
  //     matrix.subtraction([0, 1,
  //                         -1, 0],
  //                        [2, 4,
  //                         0, 1]).data.should.deepEqual([0, -2,
  //                                                       2, 0])
  //   })
  // })

  // describe('multiplication()', () => {
  //   const operator = 'multiplication'

  //   it('is a static method', staticBinaryOperator(R3x2, operator,
  //       [2, 3,
  //        1, 1,
  //        1, 1],
  //       [0, 1, 1, 1,
  //       -1, 0, 2, 3],
  //       [-3, 2, 8, 11,
  //        -1, 1, 3, 4,
  //        -1, 1, 3, 4]
  //   ))

  //   it('is a class method', methodBinaryOperator(R2x2, operator,
  //       [2, 3,
  //        1, 1],
  //       [0, 1,
  //       -1, 0],
  //       [-3, 2,
  //        -1, 1]
  //   ))

  //   it('accepts multiple arguments', () => {
  //     R2x2.multiplication([1, 2,
  //                          3, 4],
  //                         [0, 1,
  //                         -1, 0],
  //                         [-1, 0,
  //                           0, 1]).should.deepEqual([-2, 1,
  //                                                    -4, 3])

  //     const matrix = new R2x2([1, 2,
  //                            3, 4])
  //     matrix.multiplication([0, 1,
  //                           -1, 0],
  //                          [-1, 0,
  //                            0, 1]).data.should.deepEqual([-2, 1,
  //                                                          -4, 3])
  //   })
  // })

  // describe('trace()', () => {
  //   const operator = 'trace'

  //   it('is a static method', staticUnaryOperator(R2x2, operator,
  //     [1, 2,
  //      5, 6], 7
  //   ))

  //   it('is not available for no square matrices', () => {
  //     notDefined(R3x2.trace).should.be.ok()
  //   })
  // })

  // describe('trace', () => {
  //   it('is a static attribute', () => {
  //     const matrix2x2 = new R2x2([1, 2,
  //                               5, 6])

  //     matrix2x2.trace.should.be.eql(7)
  //   })

  //   it('is not available for no square matrices', () => {
  //     const matrix3x2 = new R3x2([1, 2,
  //                               3, 4,
  //                               5, 6])

  //     notDefined(matrix3x2.trace).should.be.ok()
  //   })
  // })

  // describe('transpose()', () => {
  //   it('is a static operator', () => {
  //     const matrix3x2 = new R3x2([1, 2,
  //                               3, 4,
  //                               5, 6])

  //     const transposed = R3x2.transpose(matrix3x2)

  //     transposed.should.deepEqual([1, 3, 5,
  //                                  2, 4, 6])
  //   })
  // })

  // describe('transposed', () => {
  //   it('is a class attribute', () => {
  //     const matrix3x2 = new R3x2([1, 2,
  //                               3, 4,
  //                               5, 6])

  //     const transposed = matrix3x2.transposed

  //     transposed.data.should.deepEqual([1, 3, 5,
  //                                       2, 4, 6])
  //   })

  //   it('holds a transposed matrix', () => {
  //     const matrix2x3 = new R2x3([1, 2, 3,
  //                               4, 5, 6])

  //     matrix2x3.transposed.data.should.deepEqual([1, 4,
  //                                                 2, 5,
  //                                                 3, 6])

  //     matrix2x3.numRows.should.be.eql(matrix2x3.transposed.numCols)
  //     matrix2x3.numCols.should.be.eql(matrix2x3.transposed.numRows)
  //   })

  //   it('is an involution', () => {
  //     const matrix2x2a = new R2x2([1, 2,
  //                                3, 4])

  //     const matrix2x2b = matrix2x2a.transposed.transposed

  //     matrix2x2a.data.should.deepEqual(matrix2x2b.data)
  //   })

  //   it('returns a vector if the Matrix has one row', () => {
  //     const matrix1x4 = new R1x4([1, 2, 3, 4])

  //     const vector = matrix1x4.transposed

  //     matrix1x4.data.should.deepEqual(vector.data)
  //     vector.dimension.should.be.eql(matrix1x4.numCols)
  //   })
  // })

  // describe('mul()', () => {
  //   it('is an alias of multiplication()', () => {
  //     R2x2.mul.should.be.eql(R2x2.multiplication)

  //     const matrix2x2 = new R2x2([1, 2,
  //                               3, 4])

  //     matrix2x2.multiplication.should.be.eql(matrix2x2.mul)
  //   })
  // })

  // describe('tr()', () => {
  //   it('is an alias of transpose()', () => {
  //     R2x2.tr.should.be.eql(R2x2.transpose)
  //   })
  // })

  // describe('tr', () => {
  //   it('is an alias of transposed', () => {
  //     const matrix = new R3x2([0, 1,
  //                            1, 0,
  //                            2, 2])

  //     matrix.tr.data.should.be.eql(matrix.transposed.data)
  //   })
  // })
})
