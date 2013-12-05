
algebra = require '../index'

AlgebraField = algebra.AlgebraField
RealField    = algebra.RealField

real = new RealField()

describe 'RealField', ->
  describe 'Inheritance', ->
    it 'is an AlgebraField', ->
      real.should.be.instanceOf AlgebraField

  describe 'Constructor', ->

  describe 'Attributes', ->
    describe '#one', ->
      it 'should be 1', ->
        real.one.should.eql 1

      it 'cannot be overridden' # , ->
        #(() ->
        #  real.one = 5
        #).should.throwError()

    describe '#zero', ->
      it 'should be 0', ->
        real.zero.should.eql 0

      it 'cannot be overridden' # , ->
        #(() ->
        #  real.zero = 5
        #).should.throwError()

  describe 'Methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        real.addition(4, 3).should.eql 7

    describe '#subtraction()', ->
      it 'implements -', ->
        real.subtraction(4, 3).should.eql 1

    describe '#multiplication()', ->
      it 'implements *', ->
        real.multiplication(4, 3).should.eql 12

    describe '#division()', ->
      it 'implements /', ->
        real.division(12, 3).should.eql 4

