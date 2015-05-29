
var algebra = require('..')
  , should = require('should')

var VectorSpace = algebra.VectorSpace
  , Real = algebra.Real


describe('VectorSpace', function () {
  var R2 = VectorSpace(Real)(2)

  describe('addition()', function () {
    var vector1 = new R2([0, 1]),
        vector2 = new R2([1, 1])

    it('is a static operator', function () {
      var data = R2.addition([0, 2], [-1, 3])

      data.should.eql([-1, 5])
    })

    it('is a mutator', function () {
      vector1.addition(vector2)
      vector1.data.should.be.eql([1, 2])
    })
  })

  describe('subtraction()', function () {
    var vector1 = new R2([0, 1]),
        vector2 = new R2([1, 1])

    it('is a static operator', function () {
      var data = R2.subtraction([0, 2], [-1, 3])

      data.should.eql([1, -1])
    })

    it('is a mutator', function () {
      vector2.subtraction(vector1)
      vector2.data.should.be.eql([1, 0])
    })
  })

  describe('scalarProduct()', function () {
    var vector1 = new R2([0, 1]),
        vector2 = new R2([1, 1])

    it('is a static operator', function () {
      var data = R2.scalarProduct([0, 1], [1, 1])

      data.should.eql(1)
    })

    it('is returns a scalar', function () {
      var scalar = vector1.scalarProduct(vector2)

      scalar.should.be.instanceOf(Real)

      scalar.data.should.be.eql(1)
    })
  })

  describe('norm', function () {
    var vector1 = new R2([0, 1]),
        vector2 = new R2([1, 1])

    it('is a scalar', function () {
      vector1.norm.data.should.be.eql(1)
      vector2.norm.data.should.be.eql(2)
    })
  })
})

