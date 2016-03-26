describe('API', () => {
  var assert = require('assert')
  var Scalar = require('algebra').Scalar
  var ring = require('algebra-ring')

  var booleanField = require('../src/booleanField')

  describe('Bool', () => {
    var Bool = Scalar(booleanField)

    it('works'/*, () => {
      assert.equal(Bool.contains(true), true)
      assert.equal(Bool.contains(1), false)

      assert.equal(Bool.addition(true, false), false)

      var t = new Bool(true)

      assert.equal(t.negation().data, false)
    }*/)
  })

  describe('Byte', () => {

    it('is an octionion of booleans'/*, () => {
    var Byte = Scalar(booleanRing, 8)
      var byte1 = new Byte([1, 0, 0, 0, 0, 0, 0, 0])
    }*/)
  })
})
