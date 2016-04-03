describe('API', () => {
  var algebra = require('algebra')
  var Scalar = algebra.Scalar
  var ring = require('algebra-ring')

  var booleanField = require('../src/booleanField')

  describe('Bool', () => {
    var Bool = Scalar(booleanField)

    it('works', () => {
      Bool.contains(true).should.be.ok
      Bool.contains(1).should.be.ko

      Bool.addition(true, false).should.eql(true)

      var t = new Bool(true)
      t.negation().data.should.eql(false)
    })
  })

  describe('Byte', () => {
    it('is an octionion of booleans'/*, () => {
      var f = false
      var t = true

      var Byte = Scalar(booleanField, 8)
      var byte1 = new Byte([t, f, f, f, f, f, f, f])
    }*/)
  })

  describe('Real', () => {
    it('works', () => {
      var Real = algebra.Real
    })
  })

  describe('Complex', () => {
    it('works', () => {
      var Complex = algebra.Complex
      var complex1 = new Complex([1, 2])
    })
  })
})
