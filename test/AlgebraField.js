
var algebra    = require('..')
  , inherits   = require('inherits')
  , should     = require('should')
  , BooleField = require('./examples/BooleField')

var AlgebraField = algebra.AlgebraField

var field = new BooleField()

describe('AlgebraField', function() {
  describe('add()', function() {
    it('is an alias of addition', function() {
      field.addition.should.be.Function
    })
  })

  describe('sub()', function() {
    it('is an alias of subtraction', function() {
      field.subtraction.should.be.Function
    })
  })
  
  describe('mul()', function() {
    it('is an alias of multiplication', function() {
      field.multiplication.should.be.Function
    })
  })
  
  describe('div()', function() {
    it('is an alias of division', function() {
      field.division.should.be.Function
    })
  })
  
  describe('eq()', function() {
    it('is an alias of equal', function() {
      field.equal.should.be.Function
    })
  })
})
