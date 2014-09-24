
var algebra = require('..')
  , should  = require('should')

var AlgebraMatrix       = algebra.AlgebraMatrix
  , AlgebraMatrixSpace  = algebra.AlgebraMatrixSpace
  , AlgebraSquareMatrix = algebra.AlgebraSquareMatrix
  , RealElement         = algebra.RealElement

var C    = algebra.C
  , R    = algebra.R
  , R2x2 = algebra.R2x2

var zero     = new RealElement(0)
  , one      = new RealElement(1)
  , two      = new RealElement(2)

var matrix = new AlgebraMatrix(R2x2, [one, zero, two, one])

describe('AlgebraSquareMatrix', function() {
  describe('Inheritance', function() {
    it('is an AlgebraMatrix', function() {
      matrix.should.be.instanceOf(AlgebraMatrix)
    })
  })

  describe('Constructor', function() {
    it('has signature (space, elements)', function() {
      matrix.should.be.instanceOf(AlgebraSquareMatrix)
    })
  })

  describe('determinant', function() {
    it('computes the determinant'/*, function() {
      var det = data1 * data1 - data2 * data2

      matrix.determinant.valueOf().should.eql(det)
    }*/)
  })

  describe('inverse()', function() {
    it('inverts the matrix')

    it('throws error if determinant is not zero')
  })
})

