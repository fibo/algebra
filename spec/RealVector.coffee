
algebra = require '../index'

AlgebraVector = algebra.AlgebraVector

RealElement = algebra.RealElement
RealField   = algebra.RealField
RealTensor  = algebra.RealTensor
RealVector  = algebra.RealVector

vector = new RealVector(0, 0, 1)

minusOne = new RealElement(-1)
zero     = new RealElement(0)
one      = new RealElement(1)
two      = new RealElement(2)
three    = new RealElement(3)

describe 'RealVector', ->
  describe 'Inheritance', ->
    it 'is an AlgebraVector', ->
      vector.should.be.instanceOf AlgebraVector

  describe 'Constructor', ->
    it 'has signature (v1, v2, ... vn)', ->
      vector = new RealVector(zero, one)
      vector.should.be.instanceOf RealVector

      vector = new RealVector(zero, one, two)
      vector.should.be.instanceOf RealVector

      vector = new RealVector(zero, one, two, three)
      vector.should.be.instanceOf RealVector

    it 'has signature ([v1, v2, ... vn])', ->
      vector = new RealVector([one, minusOne])
      vector.should.be.instanceOf RealVector

      vector = new RealVector([one, zero, minusOne])
      vector.should.be.instanceOf RealVector

    it 'coerces numbers to elements', ->
      vector = new RealVector(0, 1)
      vector.should.be.instanceOf RealVector

      vector = new RealVector([1, 0, -1])
      vector.should.be.instanceOf RealVector

  describe 'Attributes', ->
    describe '#field', ->
      it 'is a RealField', ->
        vector.field.should.be.instanceOf RealField

    describe '#data', ->
      it 'returns vector data', ->
        elements = [one, two]
        vector = new RealVector(elements)

        data = []
        data = (element.data for element in elements)

        vector.data.should.eql data

    describe '#dimension', ->
      it 'returns vector dimension, that is the number of elements', ->
        vector = new RealVector(0, 1)
        vector.dimension.should.be.eql 2

        vector = new RealVector([1, 0, -1])
        vector.dimension.should.be.eql 3

  describe 'Methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        vector1 = new RealVector([2, -1])
        vector2 = new RealVector([0, -1])

        vector1.addition(vector2)
        vector1.data.should.be.eql [2, -2]

    describe '#subtraction()', ->
      it 'implements +', ->
        vector1 = new RealVector([5, 6])
        vector2 = new RealVector([2, 3])

        vector1.subtraction(vector2)
        vector1.data.should.be.eql [3, 3]

