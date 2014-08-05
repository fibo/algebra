
var algebra = require('../index')
  , should  = require('should')

var AlgebraVector   = algebra.AlgebraVector
  , RealElement     = algebra.RealElement
  , RealVector      = algebra.RealVector
  , RealVectorSpace = algebra.RealVectorSpace

var minusOne = new RealElement(-1)
  , zero     = new RealElement(0)
  , one      = new RealElement(1)
  , two      = new RealElement(2)
  , three    = new RealElement(3)

var vector = new RealVector(zero, two, one)
  , vector1
  , vector2

describe('RealVector', function() {
  describe('Inheritance', function() {
    it('is an AlgebraVector', function() {
      vector.should.be.instanceOf.AlgebraVector
    })
  })

  describe('Constructor', function() {
    it('has signature (v1, v2, ... vn)', function() {
      vector = new RealVector(zero, one)
      vector.should.be.instanceOf(RealVector)

      vector = new RealVector(zero, one, two)
      vector.should.be.instanceOf(RealVector)

      vector = new RealVector(zero, one, two, three)
      vector.should.be.instanceOf(RealVector)
    })

    it('has signature ([v1, v2, ... vn])', function() {
      vector = new RealVector([one, minusOne])
      vector.should.be.instanceOf(RealVector)

      vector = new RealVector([one, zero, minusOne])
      vector.should.be.instanceOf(RealVector)
    })

    it('coerces numbers to elements', function() {
      vector = new RealVector(0, 1)
      vector.should.be.instanceOf(RealVector)

      vector = new RealVector([1, 0, -1])
      vector.should.be.instanceOf(RealVector)
    })
  })

    describe('#space', function() {
      it('is a RealVectorSpace'/*, function() {
        vector.space.should.be.instanceOf(RealVectorSpace)
      }*/)
    })

    describe('#addition()', function() {
      it('implements +', function() {
        vector1 = new RealVector([two, minusOne])
        vector2 = new RealVector([zero, minusOne])

        vector1.addition(vector2)

        vector1.valueOf().should.be.eql([2, -2])
      })
    })

    describe('#subtraction()', function() {
      it('implements -', function() {
        vector1 = new RealVector([two, one])
        vector2 = new RealVector([zero, one])

        vector1.subtraction(vector2)

        vector1.valueOf().should.be.eql([2, 0])
    })
  })
})

