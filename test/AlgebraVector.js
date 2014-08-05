var algebra = require('../index')
  , should  = require('should')

var AlgebraVector   = algebra.AlgebraVector
  , RealElement     = algebra.RealElement
  , RealField       = algebra.RealField
  , RealVectorSpace = algebra.RealVectorSpace

var one      = new RealElement(1)
  , minusOne = new RealElement(-1)
  , two      = new RealElement(2)
  , zero     = new RealElement(0)

var elements
  , space
  , vector

var R  = algebra.R
  , R3 = new RealVectorSpace(3)

describe('AlgebraVector', function() {
  describe('Constructor', function() {
    it('has signature (space, elements)', function() {
      elements = [one, two]
      vector = new AlgebraVector(R, elements)

      vector.should.be.instanceOf(AlgebraVector)
    })
  })

  describe('dimension', function() {
    it('is equal space dimension', function() {
      elements = [one, zero, minusOne]
      space    = R3
      vector = new AlgebraVector(space, elements)

      vector.dimension.should.be.eql(space.dimension)
    })
  })

  describe('valueOf()', function() {
    it('returns element data', function() {
      elements = [one, zero, minusOne]
      space    = R3
      vector = new AlgebraVector(space, elements)

      vector.valueOf().should.be.eql([1, 0, -1])
    })
  })
})

