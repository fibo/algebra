
var algebra = require('..')
  , should = require('should')

var R = algebra.Real
//  , Scalar = algebra.Scalar

describe('Real', function () {
  it('inherits from Scalar'/*, function () {
      var x = new Real(2)

      x.should.be.instanceOf(Scalar)
  }*/)

  it('implements static addition() operator', function () {
    R.addition(2, 3).should.eql(5) 
  })

  describe('object', function () {
    it('implements addition() operator', function () {
      var x = new R(1)

      x.addition(2)

      x.data.should.eql(3)
    })
  })
})

