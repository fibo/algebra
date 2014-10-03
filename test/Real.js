
var algebra = require('..')
  , should = require('should')

var R = algebra.Real

var staticBinaryOperator = require('./features/staticBinaryOperator')

describe('Real', function () {
  var x

  describe('addition operator', function () {
    it('is implemented as a static method', staticBinaryOperator(R, 'addition', 2, 3, 5))

    it('is implemented as a mutator', function () {
      x = new R(1)
      x.addition(2)
      x.data.should.eql(3)
    })

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

  describe('subtraction operator', function () {
    it('is implemented as a static method', staticBinaryOperator(R, 'subtraction', 2, 3, -1))
  })

  describe('multiplication operator', function () {
    it('is implemented as a static method', staticBinaryOperator(R, 'multiplication', 8, -2, -16))
  })

  it('implements static equal() operator', function () {
    R.equal(-2, -2).should.be.ok
  })

  it('implements static negation() operator', function () {
    R.negation(-2).should.eql(2)
  })

  describe('object', function () {

    it('implements subtraction() operator', function () {
      x = new R(-1)
      x.subtraction(-2)
      x.data.should.eql(1)
    })

    it('implements multiplication() operator', function () {
      x = new R(2)
      x.multiplication(2)
      x.data.should.eql(4)
    })

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

