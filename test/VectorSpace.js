
var algebra = require('..')
  , should = require('should')

var VectorSpace = algebra.VectorSpace
  , Real = algebra.Real

describe('VectorSpace', function () {
  describe('constructor', function () {
    it('has signature (Field, dimension)', function () {
      var R2 = new VectorSpace(Real, 2)

      R2.should.be.instanceOf(VectorSpace)
    })
  })

  describe('addition', function () {
    var R2 = new VectorSpace(Real, 2)

    var vector = R2.addition([0, 2], [-1, 3])

    vector.should.eql([-1, 5])
  })
})

