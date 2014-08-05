var algebra = require('../index')
  , should  = require('should')

var AlgebraMatrixSpace = algebra.AlgebraMatrixSpace
  , RealMatrixSpace    = algebra.RealMatrixSpace

var R = algebra.R

var field           = R
  , numberOfRows    = 2
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
    })
  })

  describe('field', function() {
    it('is the RealField'/*, function () {
      space.field.should.be.eql(R)
    }*/)
  })
})


