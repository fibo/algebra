
var algebra = require('algebra')
var notDefined = require('not-defined')
var should = require('should')

var MatrixSpace = algebra.MatrixSpace
var Real = algebra.Real
var VectorSpace = algebra.VectorSpace

var methodBinaryOperator = require('./features/methodBinaryOperator')
var methodUnaryOperator = require('./features/methodUnaryOperator')
var staticBinaryOperator = require('./features/staticBinaryOperator')
var staticUnaryOperator = require('./features/staticUnaryOperator')

var R2 = VectorSpace(Real)(2)
var R3 = VectorSpace(Real)(3)

var R2x2 = MatrixSpace(Real)(2, 2)

describe('VectorSpace', () => {
  var operator

  describe('addition()', () => {
    operator = 'addition'

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [-1, 5]))

    it('is a class method', methodBinaryOperator(R2, operator, [0, 1], [1, 1], [1, 2]))
  })

  describe('subtraction()', () => {
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

  describe('transpose()', () => {
    it('returns a row-vector (as a matrix)'/*, () => {
      var vector1 = new R3([0, 1, 0])

      var transposed = vector1.transpose()

      should.deepEqual(transposed.data, vector1.data)
      transposed.numCols.should.be.eql(3)
      transposed.numRows.should.be.eql(1)
    }*/)

    it('can be used to right multiply a vector by a matrix'/*, () => {
      var matrix  = new R2x2([0, 1,
                              1, 0]),
          vector1 = new R2([0, 1])

      // tr | 0 | | 0 1 | = | 0 1 | | 0 1 | = | 1 |
      //    | 1 | | 1 0 |           | 1 0 |   | 0 |
      var vector2 = vector1.transpose().multiplication(matrix)

      should.deepEqual(vector2.data, [1, 0])
    }*/)
  })

  describe('norm', () => {
    it('is an attribute holding a scalar', () => {
      var vector1 = new R2([0, 1])
      var vector2 = new R3([1, 1, 2])

      vector1.norm.data.should.be.eql(1)
      vector2.norm.data.should.be.eql(6)
    })
  })

  describe('norm()', () => {
    it('is a static method', () => {
      R2.norm([0, 1]).data.should.be.eql(1)
      R3.norm([1, 1, 2]).data.should.be.eql(6)
    })
  })

  describe('crossProduct()', () => {
    it('is a static method'/*, () => {
      R3.crossProduct([1, 0, 0], [0, 1, 0]).data.should.be.eql([0, 0, 1])
    }*/)

    it('is a class method'/*, () => {
      var vector1 = new R3([1, 0, 0])
      var vector2 = new R3([0, 1, 0])

      vector1.crossProduct(vector2).data.should.be.eql([0, 0, 1])
    }*/)

    it('is defined only in dimension 3', () => {
      notDefined(R2.cross).should.be.ok

      var vector = new R2([1, 0])
      notDefined(vector.cross).should.be.ok
    })
  })

  describe('cross()', () => {
    it('is an alias of crossProduct()', () => {
      R3.crossProduct.should.be.eql(R3.cross)

      var vector = new R3([1, 0, 1])
      vector.crossProduct.should.be.eql(vector.cross)
    })
  })
})
