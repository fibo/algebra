
var algebra = require('..')
  , should  = require('should')

var AlgebraVector      = algebra.AlgebraVector
  , ComplexElement     = algebra.ComplexElement
  , ComplexVector      = algebra.ComplexVector
  , ComplexVectorSpace = algebra.ComplexVectorSpace

var minusOne = new ComplexElement(-1)
  , zero     = new ComplexElement(0)
  , one      = new ComplexElement(1)
  , two      = new ComplexElement(2)
  , twoPlusI = new ComplexElement([2, 1])

var vector = new ComplexVector(minusOne, twoPlusI)
  , vector1
  , vector2

describe('ComplexVector', function() {
  describe('Inheritance', function() {
    it('is an AlgebraVector', function() {
      vector.should.be.instanceOf.AlgebraVector
    })
  })

  describe('Constructor', function() {
    it('has signature (v1, v2, ... vn)', function() {
      vector = new ComplexVector(zero, one)
      vector.should.be.instanceOf(ComplexVector)

      vector = new ComplexVector(zero, one, two)
      vector.should.be.instanceOf(ComplexVector)

      vector = new ComplexVector(zero, one, two, twoPlusI)
      vector.should.be.instanceOf(ComplexVector)
    })

    it('has signature ([v1, v2, ... vn])', function() {
      vector = new ComplexVector([one, minusOne])
      vector.should.be.instanceOf(ComplexVector)

      vector = new ComplexVector([one, zero, minusOne])
      vector.should.be.instanceOf(ComplexVector)
    })

    it('coerces numbers to elements', function() {
      vector = new ComplexVector(0, 1)
      vector.should.be.instanceOf(ComplexVector)

      vector = new ComplexVector([1, 0, -1])
      vector.should.be.instanceOf(ComplexVector)
    })
  })

    describe('#space', function() {
      it('is a ComplexVectorSpace'/*, function() {
        vector.space.should.be.instanceOf(ComplexVectorSpace)
      }*/)
    })

    describe('#addition()', function() {
      it('implements +'/*, function() {
        vector1 = new ComplexVector([two, minusOne])
        vector2 = new ComplexVector([zero, minusOne])

        vector1.addition(vector2)

        vector1.valueOf().should.be.eql([2, -2])
      }*/)
    })

    describe('#subtraction()', function() {
      it('implements -'/*, function() {
        vector1 = new ComplexVector([two, one])
        vector2 = new ComplexVector([zero, one])

        vector1.subtraction(vector2)

        vector1.valueOf().should.be.eql([2, 0])
    }*/)
  })
})


