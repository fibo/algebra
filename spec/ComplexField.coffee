
algebra = require '../index'

AlgebraField = algebra.AlgebraField
ComplexField = algebra.ComplexField

complex = new ComplexField()

describe 'ComplexField', ->
  describe 'Inheritance', ->
    it 'is an AlgebraField', ->
      complex.should.be.instanceOf AlgebraField

  describe 'Constructor', ->
    it 'has signature ()', ->
      complex.should.be.instanceOf AlgebraField

  describe 'Attributes', ->
    describe '#one', ->
      it 'should be [1, 0]', ->
        complex.one.should.eql [1, 0]

      it 'cannot be overridden' # , ->
        #(() ->
        #   complex.one = [1, 1]
        #).should.throwError()

    describe '#zero', ->
      it 'should be [0, 0]', ->
        complex.zero.should.eql [0, 0]

      it 'cannot be overridden' # , ->
        #(() ->
        #  complex.zero = [1, 1]
        #).should.throwError()

  describe 'Methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        complex.addition([1, 4], [-1, 1]).should.eql [0, 5]

    describe '#subtraction()', ->
      it 'implements -', ->
        complex.subtraction([2, 3], [2, -5]).should.eql [0, 8]

    describe '#multiplication()', ->
      it 'implements *', ->
        complex.multiplication([2, 1], [2, 0]).should.eql [4, 2]

        complex.multiplication([2, 1], [2, -1]).should.eql [5, 0]

    describe '#inversion()', ->
      it 'implements ^-1', ->
        complex.inversion([2, 0]).should.eql [.5, 0]

    describe '#division()', ->
      it 'implements /', ->
        complex.division([5, 0], [2, 1]).should.eql [2, -1]

    describe '#conjugation()', ->
      it 'returns the conjugation of a complex number', ->
        complex.conjugation([2, 1]).should.eql [2, -1]

    describe '#norm()', ->
      it 'returns the norm of a complex number', ->
        complex.norm([2, 1]).should.eql 5

    describe '#equal()', ->
      it 'returns true if two complexes are equal', ->
        complex.equal([0, 1], [0, 1]).should.be.true

    describe '#notEqual()', ->
      it 'returns true if two complexes are not equal', ->
        complex.notEqual([0, 1], [1, 1]).should.be.true

