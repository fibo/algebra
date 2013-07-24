
algebra = require '../index.js'

AlgebraVector = algebra.AlgebraVector

RealField  = algebra.RealField
RealTensor = algebra.RealTensor
RealVector = algebra.RealVector

vector = new RealVector()

describe 'RealVector', ->
  describe 'inheritance', ->
    it 'is an AlgebraVector', ->
      vector.should.be.instanceOf AlgebraVector

  describe 'attributes', ->
    describe '#field', ->
      it 'is a RealField', ->
        vector.field.should.be.instanceOf RealField

  describe 'methods', ->
    describe '#addition()', ->
      it 'implements +', ->
      
