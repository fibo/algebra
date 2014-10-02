
var algebra = require('..')
  , should = require('should')

var R = algebra.Real

describe('Real', function () {
  it('implements static addition() operator', function () {
    R.addition(2, 3).should.eql(5)
  })

  it('implements static subtraction() operator', function () {
    R.subtraction(2, 3).should.eql(-1)
  })

  it('implements static multiplication() operator', function () {
    R.multiplication(8, -2).should.eql(-16)
  })

  it('implements static equal() operator', function () {
    R.equal(-2, -2).should.be.ok
  })

  it('implements static negation() operator', function () {
    R.negation(-2).should.eql(2)
  })

  describe('object', function () {
    var x

    it('implements addition() operator', function () {
      x = new R(1)
      x.addition(2)
      x.data.should.eql(3)
    })

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

