
var algebra = require('..')
  , should  = require('should')

var AlgebraField       = algebra.AlgebraField
  , AlgebraVector      = algebra.AlgebraVector
  , AlgebraVectorSpace = algebra.AlgebraVectorSpace

var R = algebra.R
  , C = algebra.C

var dimension = 3
  , field     = R
  , space

describe('AlgebraVectorSpace', function() {
  describe('Constructor', function() {
    it('has signature (field, dimension)', function() {
      space = new AlgebraVectorSpace(field, dimension)

      space.should.be.instanceOf(AlgebraVectorSpace)
    })
  })

  describe('dimension', function() {
  })

  describe('Vector()', function() {
    it('is a constructor')
  })

  describe('containsVector()', function() {
    it('checks that the given vector belongs to this vector space')
  })
})

