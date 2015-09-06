
var algebra = require('algebra'),
    should  = require('should')

var VectorSpace = algebra.VectorSpace,
    Real        = algebra.Real

var mutatorBinaryOperator = require('./features/mutatorBinaryOperator'),
    mutatorUnaryOperator  = require('./features/mutatorUnaryOperator'),
    staticBinaryOperator  = require('./features/staticBinaryOperator'),
    staticUnaryOperator   = require('./features/staticUnaryOperator')

var R2 = VectorSpace(Real)(2)

describe('VectorSpace', function () {
  var operator

  describe('addition()', function () {
    operator = 'addition'

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [-1, 5]))

    it('is a mutator method', mutatorBinaryOperator(R2, operator, [0, 1], [1, 1], [1, 2]))
  })

  describe('subtraction()', function () {
    operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R2, operator, [0, 2], [-1, 3], [1, -1]))

    it('is a mutator method', mutatorBinaryOperator(R2, operator, [0, 1], [1, 1], [-1, 0]))
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

  describe('norm', function () {
    var vector1 = new R2([0, 1]),
        vector2 = new R2([1, 1])

    it('is a scalar', function () {
      vector1.norm.data.should.be.eql(1)
      vector2.norm.data.should.be.eql(2)
    })
  })
})
