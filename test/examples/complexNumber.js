
var algebra = require('../../index.js')
  , assert  = require('assert')

var Complex = algebra.Complex.Element

describe('example', function () {
  it('is ok', function () {
    var z = new Complex(1, 2)
   
    // As a complex number, z has a real and an imaginary part.
   
    assert.equal(z.re(), 1)
    assert.equal(z.im(), 2)
   
    // You can conjugate z.
   
    z.conj()
   
    assert.equal(z.re(), 1)
    assert.equal(z.im(), -2)
  })
})

