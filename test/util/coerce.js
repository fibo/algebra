
var algebra = require('../../index.js')
  , assert  = require('assert')

var coerce = algebra.util.coerce
  , is     = algebra.util.is

describe('util.coerce', function () {
  describe('toNumber', function () {
  })

  describe('argumentsToArray', function () {
    it('returns first arguments if it is an array', function () {
      var arg1 = [1, 2]
      var arg2 =coerce.argumentsToArray(arg1)
      assert.deepEqual(arg1, arg2)
    })

    it('returns an array composed by arguments', function () {
      var arg1 = [1, 2, 3]
      var arg2 =coerce.argumentsToArray(1, 2, 3)
      assert.deepEqual(arg1, arg2)
    })
  })
})

