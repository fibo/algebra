
algebra = require '../index'

AlgebraVector = algebra.AlgebraVector
RealField     = algebra.RealField

real = new RealField()

describe 'AlgebraVector', ->
  describe 'Constructor', ->
    it 'has signature (field, elements)', ->
      field = real
      elements = [1, 2]
      vector = new AlgebraVector(field, elements)
      vector.should.be.instanceOf AlgebraVector

  describe 'Attributes', ->
    describe '#dimension', ->
      it 'returns vector dimension, that is the number of elements', ->
        field = real
        elements = [1, 0, -1]
        vector = new AlgebraVector(field, elements)
        vector.dimension.should.be.eql 3

