
algebra = require '../index.js'

AlgebraField = algebra.AlgebraField
RealField    = algebra.RealField

R = new RealField()

describe 'RealField', ->
  describe 'inheritance', ->
    it 'is an AlgebraField', ->
      R.should.be.instanceof AlgebraField

  describe 'attributes', ->
    describe '#one', ->
      it 'should be 1', ->
        R.one.should.be.equal 1

    describe '#zero', ->
      it 'should be 0', ->
        R.zero.should.be.equal 0

