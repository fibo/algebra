
var algebra = require('..')
  , should = require('should')

var R     = algebra.Real
  , Space = algebra.Space

var space
  , indices

describe('Space', function () {
  it('implements static addition() operator', function () {
    space = new Space(R, [2])
    space.addition([2, 3], [1, -1]).should.eql([3, 2])

    space.addition([2, 3], [1, -1], [1, 1]).should.eql([4, 3])

    space = new Space(R, [2, 3])
    space.addition([2, 1, 2, 1, 4, 0], [1, -1, 1, -1, 1, -1]).should.eql([3, 0, 3, 0, 5, -1])
  })

  it('implements static subtraction() operator', function () {
    space = new Space(R, [2, 2])
    space.subtraction([2, 2, 2, 2], [1, 1, 1, 1]).should.eql([1, 1, 1, 1])  
  })

  describe('dimension', function () {
    it('is the product of indices', function () {
      indices = [2, 3]
      space = new Space(R, indices)
      space.dimension.should.be.eql(6)

      indices = [2, 2, 2]
      space = new Space(R, indices)
      space.dimension.should.be.eql(8)
    })
  })
})
