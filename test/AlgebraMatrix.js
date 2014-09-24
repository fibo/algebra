
var algebra = require('..')
  , should  = require('should')

var AlgebraMatrix      = algebra.AlgebraMatrix
  , AlgebraMatrixSpace = algebra.AlgebraMatrixSpace
  , RealElement        = algebra.RealElement

var C    = algebra.C
  , R    = algebra.R
  , R2x2 = algebra.R2x2

var zero     = new RealElement(0)
  , one      = new RealElement(1)
  , two      = new RealElement(2)

var matrix = new AlgebraMatrix(R2x2, [one, zero, two, one])

describe('AlgebraMatrix', function() {
  describe('Constructor', function() {
    it('has signature (space, elements)', function() {
      matrix.should.be.instanceOf(AlgebraMatrix)
    })
  })
})

