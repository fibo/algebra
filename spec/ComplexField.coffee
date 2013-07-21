
algebra = require '../index.js'

AlgebraField = algebra.AlgebraField
ComplexField = algebra.ComplexField

complex = new ComplexField()

describe 'ComplexField', ->
  describe 'inheritance', ->
    it 'is an AlgebraField', ->
      complex.should.be.instanceof AlgebraField

  describe 'attributes', ->
    describe '#one', ->
      it 'should be [1, 0]', ->
        complex.one.should.eql [1, 0]

      it 'cannot be overridden', ->
        (() ->
           complex.one = [1, 1]
        ).should.throwError()

    describe '#zero', ->
      it 'should be [0, 0]', ->
        complex.zero.should.eql [0, 0]

      it 'cannot be overridden', ->
        (() ->
          complex.zero = [1, 1] 
        ).should.throwError()

  describe 'methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        complex.addition([1, 4], [-1, 1]).should.eql [0, 5]

    describe '#subtraction()', ->
      it 'implements -', ->
        complex.subtraction([2, 3], [2, -5]).should.eql [0, 8]

