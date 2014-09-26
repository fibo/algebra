
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

  describe('object', function () {
    it('implements addition() operator', function () {
      var x = new R(1)

      x.addition(2)

      x.data.should.eql(3)
    })
  })
})

