
algebra = require '../index'

AlgebraVector = algebra.AlgebraVector
RealElement   = algebra.RealElement
RealField     = algebra.RealField

one      = new RealElement(1)
two      = new RealElement(2)
zero     = new RealElement(0)
minusOne = new RealElement(-1)

describe 'AlgebraVector', ->
  describe 'Constructor', ->
    it 'has signature (field, elements)', ->
      Element = RealElement
      elements = [one, two]

      vector = new AlgebraVector(Element, elements)

      vector.should.be.instanceOf AlgebraVector

  describe 'Attributes', ->
    describe '#data', ->
      it 'returns vector data', ->
        Element = RealElement
        elements = [one, two]

        vector = new AlgebraVector(Element, elements)

        data = []
        data = (element.data for element in elements)

        vector.data.should.eql data

    describe '#dimension', ->
      it 'returns vector dimension, that is the number of elements', ->
        Element = RealElement
        elements = [one, zero, minusOne]

        vector = new AlgebraVector(Element, elements)

        vector.dimension.should.be.eql 3

