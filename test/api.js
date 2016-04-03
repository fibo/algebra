describe('API', () => {
  var algebra = require('algebra')
  var Scalar = algebra.Scalar
  var ring = require('algebra-ring')

  var R2 = algebra.R2
  var R3 = algebra.R3

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

  describe('cross product', () => {
    it('works', () => {
      R3.crossProduct([3, -3, 1], [4, 9, 2]).should.deepEqual([-15, -2, 39])

      var vector1 = new R3([3, -3, 1])
      var vector2 = new R3([4, 9, 2])

      var vector3 = vector1.crossProduct(vector2)

      vector3.data.should.deepEqual([-15, -2, 39])
    })
  })
})
