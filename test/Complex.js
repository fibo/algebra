
var algebra = require('..')
  , should = require('should')

var C = algebra.Complex

describe('Cmplex', function () {
  it('implements static addition() operator', function () {
    C.addition([2, 1], [2, 3]).should.eql([4, 4])
  })

  it('implements static subtraction() operator', function () {
    C.subtraction([1, 2], [0, 3]).should.eql([1, -1])
  })

  describe('object', function () {
    it('implements addition() operator', function () {
      var z = new C([1, 0])

      z.addition([2, 1])

      z.data.should.eql([3, 1])
    })
  })
})


