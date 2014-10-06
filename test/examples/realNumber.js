
var algebra = require('algebra')
  , should  = require('should')

var R = algebra.Real

describe('Real number example', function () {
    var x1
      , x2
      , x3
      , x4

  it('creates few real numbers', function () {
    x1 = new R(4)
    x2 = new R(-1)
    x3 = new R(0.7)
    x4 = new R(2)
  })

  it('shows arithmetic operators', function () {
    x1.add(x2)
    x1.data.should.be.eql(3)

    x1.sub(x2)
    x1.data.should.be.eql(4)

    x3.mul(10)
    x3.data.should.be.eql(7)

    x4.div(4)
    x4.data.should.be.eql(0.5)
  })

  it('shows that operators can be chained', function () {
    x1.data.should.be.eql(4) // at this point x1 data should be 4
    x1.add(2).mul(3).sub(6).div(4)
    x1.data.should.be.eql(3)
  })


})

