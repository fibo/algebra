
var algebra = require('..')
  , should  = require('should')

var AlgebraVectorSpace = algebra.AlgebraVectorSpace
  , AlgebraVector      = algebra.AlgebraVector
  , RealElement        = algebra.RealElement
  , RealVectorSpace    = algebra.RealVectorSpace

var dimension = 2
  , space     = new RealVectorSpace(dimension)

var zero = new RealElement(0)
  , one  = new RealElement(1)
  , two  = new RealElement(2)

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
    it('returns an AlgebraVector over R'/*, function() {
      vector = new space.Vector([zero, one, two])

      vector.should.be.instanceOf(AlgebraVector)
    }*/)
  })
})

