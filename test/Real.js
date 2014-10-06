
var algebra = require('..')
  , should = require('should')

var R = algebra.Real

var mutatorBinaryOperator = require('./features/mutatorBinaryOperator')
  , staticBinaryOperator = require('./features/staticBinaryOperator')

describe('Real', function () {
  var operator
    , x

  describe('addition', function () {
    operator = 'addition'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, 5))

    it('is a mutator method', mutatorBinaryOperator(R, operator, 1, 2, 3))

    it('accepts many arguments', function () {
      x = new R(1)
      x.addition(2, 3, 4)
      x.data.should.eql(10)
    })
  })

  describe('subtraction', function () {
    operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, -1))

    it('is a mutator method', mutatorBinaryOperator(R, operator, -1, -4, 3))
  })

  describe('multiplication', function () {
    operator = 'multiplication'

    it('is a static method', staticBinaryOperator(R, operator, 8, -2, -16))

    it('is a mutator method', mutatorBinaryOperator(R, operator, 2, 2, 4))
  })

  describe('equal', function () {
    operator = 'equal'

    it('is a static method', staticBinaryOperator(R, operator, 10, 10, true))

    it('is a class method', function () {
      x = new R(10)
      x.equal(10).should.be.ok
    })
  })

  describe('negation', function () {
    it('is a static method', function () {
      R.negation(-2).should.eql(2)
    })

    it('is a class method', function () {
      x = new R(8)
      x.negation()
      x.data.should.eql(-8)
    })
  })
})

