
var algebra = require('..')
  , should  = require('should')

var AlgebraMatrix      = algebra.AlgebraMatrix
  , AlgebraMatrixSpace = algebra.AlgebraMatrixSpace
//  , AlgebraTensorSpace = algebra.AlgebraTensorSpace

var C = algebra.C
  , R = algebra.R

var field           = R
  , numberOfRows    = 2
  , numberOfColumns = 3
  , space           = new AlgebraMatrixSpace(R, numberOfRows, numberOfColumns)

describe('AlgebraMatrixSpace', function() {
  describe('Inheritance', function() {
    it('is an AlgebraTensorSpace'/*, function() {
      space.should.be.instanceOf(AlgebraTensorSpace)
    }*/)
  })

  describe('Constructor', function() {
    it('has signature (field, numberOfRows, numberOfColumns)', function () {
      field           = C
      numberOfRows    = 2
      numberOfColumns = 2
      space           = new AlgebraMatrixSpace(field, numberOfRows, numberOfColumns)
     
      space.should.be.instanceOf(AlgebraMatrixSpace)
    })
  })

  describe('dimension', function() {
    it('is numberOfRows by numberOfColumns', function () {
      space.dimension.should.be.eql(numberOfRows * numberOfColumns)
    })
  })
})

