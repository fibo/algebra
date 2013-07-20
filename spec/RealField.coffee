
algebra = require '../index.js'

AlgebraField = algebra.AlgebraField
RealField    = algebra.RealField

Real = new RealField()

describe 'RealField', ->
  describe 'inheritance', ->
    it 'is an AlgebraField', ->
      Real.should.be.instanceof AlgebraField

  describe 'attributes', ->
    describe '#one', ->
      it 'should be 1', ->
        Real.one.should.be.equal 1

    describe '#zero', ->
      it 'should be 0', ->
        Real.zero.should.be.equal 0

  describe 'methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        Real.addition(4, 3).should.equal 7

