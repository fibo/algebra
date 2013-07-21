
algebra = require '../index.js'

AlgebraField    = algebra.AlgebraField
QuaternionField = algebra.QuaternionField

quaternion = new QuaternionField()

describe 'QuaterionField', ->
  describe 'inheritance', ->
    it 'is an AlgebraField', ->
      quaternion.should.be.instanceof AlgebraField

  describe 'attributes', ->
    describe '#one', ->
      it 'should be [1, 0, 0, 0]', ->
        # complex.one.should.deepEqual [1, 0, 0, 0]

      it 'cannot be overridden', ->
        # (() ->
        #   complex.one = 5
        # ).should.throwError()

    describe '#zero', ->
      it 'should be 0', ->
        # complex.zero.should.equal 0

      it 'cannot be overridden', ->
        # (() ->
        #   complex.zero = 5
        # ).should.throwError()

  describe 'methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        # complex.addition(4, 3).should.equal 7

    describe '#subtraction()', ->
      it 'implements -', ->
        # complex.subtraction(4, 3).should.equal 1

