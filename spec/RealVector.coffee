
algebra = require '../index'

AlgebraVector = algebra.AlgebraVector

RealField  = algebra.RealField
RealTensor = algebra.RealTensor
RealVector = algebra.RealVector

real = new RealField()

vector = new RealVector(0, 0, 1)
abstractVector = new AlgebraVector(real, [0, 0, 1])

describe 'RealVector', ->
  describe 'Inheritance', ->
    it 'is an AlgebraVector', ->
      vector.should.be.instanceOf AlgebraVector

  describe 'Constructor', ->
    it 'has signature (v1, v2, ... vn)', ->
      vector = new RealVector(0, 1)
      vector.should.be.instanceOf RealVector

      vector = new RealVector(0, 1, 2)
      vector.should.be.instanceOf RealVector

      vector = new RealVector(0, 1, 2, 3)
      vector.should.be.instanceOf RealVector

    it 'has signature ([v1, v2, ... vn])', ->
      vector = new RealVector([1, -1])
      vector.should.be.instanceOf RealVector

      vector = new RealVector([1, 0, -1])
      vector.should.be.instanceOf RealVector

  describe 'Attributes', ->
    describe '#field', ->
      it 'is a RealField', ->
        vector.field.should.be.instanceOf RealField

    describe '#dimension', ->
      it 'returns vector dimension, that is the number of elements', ->
        vector = new RealVector(0, 1)
        vector.dimension.should.be.eql 2

        vector = new RealVector([1, 0, -1])
        # vector.dimension.should.be.eql 3

  describe 'Methods', ->
    describe '#addition()', ->
      it 'implements +' # , ->
        # vector1 = new RealVector([2, -1])
        # vector2 = new RealVector([0, -1])

        # vector1.addition(vector2)
        # vector1.data.should.be.eql [2, -2]

