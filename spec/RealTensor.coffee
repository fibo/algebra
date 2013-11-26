
algebra = require '../index'

AlgebraTensor = algebra.AlgebraTensor
RealField     = algebra.RealField
RealElement   = algebra.RealElement
RealTensor    = algebra.RealTensor

zero = new RealElement(0)
one  = new RealElement(1)

indices = [1, 2]
elements = [zero, one]

tensor = new RealTensor(indices, elements)

describe 'RealTensor', ->
  describe 'Inheritance', ->
    it 'is an AlgebraTensor', ->
      tensor.should.be.instanceOf AlgebraTensor

  describe 'Constructor', ->
    it 'has signature (indices, elements)', ->
      # TODO sta roba è da mettere negli esempi
      tensor = new RealTensor(indices, elements)

      tensor.should.be.instanceOf RealTensor

    it 'has signature (indices)', ->
      # TODO sta roba è da mettere negli esempi
      tensor = new RealTensor(indices)

      tensor.should.be.instanceOf RealTensor

  describe 'Attributes', ->
    describe '#field', ->
      it 'is the real field', ->
        tensor.field.should.be.instanceOf RealField

