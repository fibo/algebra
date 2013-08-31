
algebra = require '../index.js'

AlgebraVector = algebra.AlgebraVector

RealField  = algebra.RealField
RealTensor = algebra.RealTensor
RealVector = algebra.RealVector

vector = new RealVector(0, 0, 1)

describe 'RealVector', ->
  describe 'Inheritance', ->
    it 'is an AlgebraVector', ->
      vector.should.be.instanceOf AlgebraVector

  describe 'Constructor', ->
    it 'has signature (v1, v2, ... vn)', ->
      vector = new RealVector(0, 1)
      vector.should.be.instanceOf RealVector

    it 'has signature ([v1, v2, ... vn])', ->
      vector = new RealVector([1, -1])
      vector.should.be.instanceOf RealVector

  describe 'attributes', ->
    describe '#field', ->
      it 'is a RealField', ->
        vector.field.should.be.instanceOf RealField

    describe '#dimension', ->

  describe 'Methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        # vector1 = new RealVector([2, -1])
        # vector2 = new RealVector([0, -1])
        # vector1.addition(vector2)

