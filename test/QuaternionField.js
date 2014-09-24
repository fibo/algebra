
var algebra = require('..')
  , should  = require('should')

var AlgebraField    = algebra.AlgebraField
  , QuaternionField = algebra.QuaternionField

quaternion = new QuaternionField();

describe('QuaternionField', function() {
  describe('Inheritance', function() {
    it('is an AlgebraField', function() {
      quaternion.should.be.instanceOf(AlgebraField)
    })
  })

  describe('Constructor', function() {
    it('has signature ()', function() {
      quaternion.should.be.instanceOf(AlgebraField);
    })
  })

  describe('one', function() {
    it('should be [1, 0, 0, 0]', function() {
      quaternion.one.should.eql([1, 0, 0, 0])
    })
  })

  describe('zero', function() {
    it('should be [0, 0, 0, 0]', function() {
      quaternion.zero.should.eql([0, 0, 0, 0])
    })
  })

  describe('addition()', function() {
    it('implements +', function() {
      quaternion.addition([1, 2, 3, 4], [1, 1, 1, 1]).should.eql([2, 3, 4, 5])
    })
  })

  describe('subtraction()', function() {
    it('implements -', function() {
      quaternion.subtraction([1, 2, 3, 4], [1, 1, 1, 1]).should.eql([0, 1, 2, 3])
    })
  })

/*
  describe('multiplication()', function() {
    it('implements *')
  })

  describe('division()', function() {
    it('implements /')
  })
*/
})

