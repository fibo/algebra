
var algebra = require('../index')
  , should  = require('should')

var AlgebraField = algebra.AlgebraField
  , RealField    = algebra.RealField

var real = new RealField()

describe('RealField', function() {
  describe('Inheritance', function() {
    it('is an AlgebraField', function() {
      real.should.be.instanceOf(AlgebraField)
    })
  })

  describe('Constructor', function() {})

  describe('Attributes', function() {
    describe('#one', function() {
      it('should be 1', function() {
        real.one.should.eql(1)
      })
    })

    describe('#zero', function() {
      it('should be 0', function() {
        real.zero.should.eql(0)
      })
    })
  })

  describe('addition()', function() {
    it('implements +', function() {
      real.addition(4, 3).should.eql(7)
    })
  })

  describe('subtraction()', function() {
    it('implements -', function() {
      real.subtraction(4, 3).should.eql(1)
    })
  })

  describe('multiplication()', function() {
    it('implements *', function() {
      real.multiplication(4, 3).should.eql(12)
    })
  })

  describe('division()', function() {
    it('implements /', function() {
      real.division(12, 3).should.eql(4)
    })
  })

  describe('equal()', function() {
    it('implements =', function() {
      real.equal(4, 4).should.be.ok
    })
  })
})

