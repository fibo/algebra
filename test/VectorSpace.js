
var algebra = require('algebra'),
    should  = require('should')

var MatrixSpace = algebra.MatrixSpace,
    Real        = algebra.Real,
    VectorSpace = algebra.VectorSpace

var methodBinaryOperator = require('./features/methodBinaryOperator'),
    methodUnaryOperator  = require('./features/methodUnaryOperator'),
    staticBinaryOperator  = require('./features/staticBinaryOperator'),
    staticUnaryOperator   = require('./features/staticUnaryOperator')

var R2 = VectorSpace(Real)(2),
    R3 = VectorSpace(Real)(3)

var R2x2 = MatrixSpace(Real)(2, 2)

describe('VectorSpace', function () {
  var operator

  describe('addition()', function () {
    operator = 'addition'

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [-1, 5]))

    it('is a class method', methodBinaryOperator(R2, operator, [0, 1], [1, 1], [1, 2]))
  })

  describe('subtraction()', function () {
    operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [1, -1]))

    it('is a class method', methodBinaryOperator(R2, operator, [0, 1], [1, 1], [-1, 0]))
  })

  describe('scalarProduct()', function () {
    var vector1 = new R2([0, 1]),
        vector2 = new R2([1, 1])

    it('is a static operator', function () {
      var data = R2.scalarProduct([0, 1], [1, 1])

      data.should.eql(1)
    })

    it('is returns a scalar', function () {
      var scalar = vector1.scalarProduct(vector2)

      scalar.should.be.instanceOf(Real)

      scalar.data.should.be.eql(1)
    })
  })

  describe('transpose()', function () {
    it('returns a row-vector (as a matrix)', function () {
      var vector1 = new R3([0, 1, 0])

      var transposed = vector1.transpose()

      should.deepEqual(transposed.data, vector1.data)
      transposed.numCols.should.be.eql(1)
      transposed.numRows.should.be.eql(3)
    })

    it('is used to right multiply a vector by a matrix'/*, function () {
      var matrix  = new R2x2([0, 1,
                              1, 0]),
          vector1 = new R2([0, 1])

      // tr | 0 | | 0 1 | = | 0 1 | | 0 1 | = | 1 |
      //    | 1 | | 1 0 |           | 1 0 |   | 0 |
      var vector2 = vector1.transpose().multiplication(matrix)

      should.deepEqual(vector2.data, [1, 0])
    }*/)
  })

  describe('norm', function () {
    var vector1 = new R2([0, 1]),
        vector2 = new R2([1, 1])

    it('is a scalar', function () {
      vector1.norm.data.should.be.eql(1)
      vector2.norm.data.should.be.eql(2)
    })
  })

})
