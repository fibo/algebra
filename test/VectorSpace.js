
var algebra = require('..')
  , should = require('should')

var VectorSpace = algebra.VectorSpace
  , Real = algebra.Real


describe('VectorSpace', function () {
  var R2 = VectorSpace(Real)(2)

  it('has signature (Scalar)(dimension)'/*, function () {
    R2.dimension = 2
  }*/)

  describe('static', function () {
    it('addition', function () {
      var data = R2.addition([0, 2], [-1, 3])

      data.should.eql([-1, 5])
    })
  })

  describe('Vector', function () {
    var vector1 = new R2([0, 1]),
        vector2 = new R2([1, 1])

    it('scalarProduct()', function () {
      var scalar = vector1.scalarProduct(vector2)

      scalar.should.be.instanceOf(Real)

      scalar.data.should.be.eql(1)
    })

    it('norm', function () {
      vector1.norm.data.should.be.eql(1)
      vector2.norm.data.should.be.eql(2)
    })

    it('addition()', function () {
      vector1.addition(vector2)
      vector1.data.should.be.eql([1, 2])
    })

    it('subtraction()', function () {
      vector2.subtraction(vector1)
      vector2.data.should.be.eql([0, -1])
    })
  })
})

