
var algebra = require('algebra')
  , should  = require('should')

var C = algebra.Complex

describe('Complex number example', function () {
  var z1, z2, z3

  it('creates few complex numbers', function () {
    z1 = new C([1, 2])
    z2 = new C([0, 3])
    z3 = new C([-4, 0])
  })

  it('shows arithmetic operators', function () {
    z1 = z1.add(z2)
    z1.data.should.be.eql([1, 5])
  })
})

