
var algebra = require('algebra'),
    should  = require('should')

var MatrixSpace = algebra.MatrixSpace
var Real = algebra.Real
var VectorSpace = algebra.VectorSpace

var methodBinaryOperator = require('./features/methodBinaryOperator')
var methodUnaryOperator = require('./features/methodUnaryOperator')
var staticBinaryOperator = require('./features/staticBinaryOperator')
var staticUnaryOperator = require('./features/staticUnaryOperator')

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

  describe('scalarProduct()', () => {
    it('is a static operator', () => {
      var data = R2.scalarProduct([0, 1], [1, 1])

      data.should.eql(1)
    })

    it('is a class method', () => {
      var vector1 = new R2([0, 1])
      var vector2 = new R2([1, 1])

      var scalar = vector1.scalarProduct(vector2)

      scalar.data.should.be.eql(1)
    })

    it('is returns a scalar'/*, () => {
      var scalar = vector1.scalarProduct(vector2)

      scalar.should.be.instanceOf(Real)

      scalar.data.should.be.eql(1)
    }*/)
  })

  describe('dotProduct()', () => {
    it('is an alias of scalarProduct()', () => {
      R2.scalarProduct.should.be.eql(R2.dotProduct)

      var vector = new R2([0, 1])
      vector.scalarProduct.should.be.eql(vector.dotProduct)
    })
  })

  describe('dot()', () => {
    it('is an alias of scalarProduct()', () => {
      R2.scalarProduct.should.be.eql(R2.dot)

      var vector = new R2([0, 1])
      vector.scalarProduct.should.be.eql(vector.dot)
    })
  })

  describe('transpose()', function () {
    it('returns a row-vector (as a matrix)'/*, function () {
      var vector1 = new R3([0, 1, 0])

      var transposed = vector1.transpose()

      should.deepEqual(transposed.data, vector1.data)
      transposed.numCols.should.be.eql(3)
      transposed.numRows.should.be.eql(1)
    }*/)

    it('can be used to right multiply a vector by a matrix'/*, function () {
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
    it('is an attribute holding a scalar', function () {
      var vector1 = new R2([0, 1])
      var vector2 = new R3([1, 1, 2])

      vector1.norm.data.should.be.eql(1)
      vector2.norm.data.should.be.eql(6)
    })
  })

  describe('norm()', function () {
    it('is a static method', function () {
      R2.norm([0, 1]).data.should.be.eql(1)
      R3.norm([1, 1, 2]).data.should.be.eql(6)
    })
  })
})
