
var algebra = require('..')
  , should  = require('should')

var AlgebraMatrixSpace = algebra.AlgebraMatrixSpace
  , RealElement        = algebra.RealElement
  , RealMatrixSpace    = algebra.RealMatrixSpace

var numberOfRows    = 2
  , numberOfColumns = 3
  , space           = new RealMatrixSpace(numberOfRows, numberOfColumns)

describe('RealMatrixSpace', function() {
  describe('Inheritance', function() {
    it('is an AlgebraMatrixSpace', function() {
      space.should.be.instanceOf(AlgebraMatrixSpace)
    })
  })

  describe('Constructor', function() {
    it('has signature (numberOfRows, numberOfColumns)', function () {
      numberOfRows    = 2
      numberOfColumns = 2
      space           = new RealMatrixSpace(numberOfRows, numberOfColumns)
     
      space.should.be.instanceOf(RealMatrixSpace)
      space.numberOfRows.should.be.eql(numberOfRows)
      space.numberOfColumns.should.be.eql(numberOfColumns)
    })
  })

  describe('Element', function() {
    it('is the RealElement', function () {
      space.Element.should.be.eql(RealElement)
    })
  })
})

