
var algebra = require('..'),
    should = require('should')

var R     = algebra.Real,
    Space = algebra.Space

var R2     = Space(R)([2]),
    R2x2   = Space(R)([2, 2]),
    R2x3   = Space(R)([2, 3]),
    R2x2x2 = Space(R)([2, 2, 2])

describe('Space', function () {
  describe('static', function () {
    it('addition()', function () {
      R2.addition([2, 3], [1, -1]).should.eql([3, 2])

      R2.addition([2, 3], [1, -1], [1, 1]).should.eql([4, 3])

      R2x3.addition([2, 1, 2, 1, 4, 0], [1, -1, 1, -1, 1, -1]).should.eql([3, 0, 3, 0, 5, -1])
    })

    it('subtraction()', function () {
      R2x2.subtraction([2, 2, 2, 2], [1, 1, 1, 1]).should.eql([1, 1, 1, 1])
    })
  })

  describe('dimension', function () {
    it('is the product of indices', function () {
      R2x3.dimension.should.be.eql(6)

      R2x2x2.dimension.should.be.eql(8)
    })
  })
})

