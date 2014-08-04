
var algebra = require('../index')
  , should  = require('should')

var AlgebraVectorSpace = algebra.AlgebraVectorSpace
  , RealField          = algebra.RealField
  , RealElement        = algebra.RealElement
  , RealVector         = algebra.RealVector
  , RealVectorSpace    = algebra.RealVectorSpace

var dimension = 2
  , space     = new RealVectorSpace(dimension)

/*
var zero = RealElement(0)
  , one  = RealElement(1)
  , two  = RealElement(2)
*/

describe('RealVectorSpace', function() {
  describe('Inheritance', function() {
    it('is an AlgebraVectorSpace', function() {
      space.should.be.instanceOf(AlgebraVectorSpace)
    })
  })

  describe('Constructor', function() {
    it('has signature (dimension)', function() {
      dimension = 3
      space     = new RealVectorSpace(dimension)

      space.should.be.instanceOf(RealVectorSpace)
    })
  })

  describe('Vector()', function() {
    it('returns a RealVector'/*, function() {
      vector = new space.Vector([zero, one, two])

      vector.should.be.instanceOf(RealVector)
    }*/)
  })
})
