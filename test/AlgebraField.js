
var algebra    = require('../index')
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
})

