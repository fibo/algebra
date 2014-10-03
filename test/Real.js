
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

    it('is chainable', function () {
      x = new R(1)
      x.addition(2).addition(3)
      x.data.should.eql(6)
    })

    it('accepts many arguments', function () {
      x = new R(1)
      x.addition(2, 3, 4)
      x.data.should.eql(10)
    })
  })

  describe('subtraction', function () {
    operator = 'subtraction'

    it('is a static method', staticBinaryOperator(R, operator, 2, 3, -1))

    it('is a mutator method', mutatorBinaryOperator(R, operator, -1, -2, 3))
  })

  describe('multiplication', function () {
    operator = 'multiplication'

    it('is a static method', staticBinaryOperator(R, operator, 8, -2, -16))

    it('is a mutator method', mutatorBinaryOperator(R, operator, 2, 2, 4))
  })

  it('implements static equal() operator', function () {
    R.equal(-2, -2).should.be.ok
  })

  it('implements static negation() operator', function () {
    R.negation(-2).should.eql(2)
  })

  describe('object', function () {

    it('implements equal() operator', function () {
      x = new R(10)
      x.equal(10).should.be.ok
    })

    it('implements negation() operator', function () {
      x = new R(8)
      x.negation()
      x.data.should.eql(-8)
    })
  })
})

