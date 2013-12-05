
algebra = require '../index'

AlgebraField    = algebra.AlgebraField
QuaternionField = algebra.QuaternionField

quaternion = new QuaternionField()

describe 'QuaternionField', ->
  describe 'Inheritance', ->
    it 'is an AlgebraField', ->
      quaternion.should.be.instanceof AlgebraField

  describe 'Constructor', ->
    it 'has signature ()', ->
      quaternion.should.be.instanceOf AlgebraField

  describe 'Attributes', ->
    describe '#one', ->
      it 'should be [1, 0, 0, 0]', ->
        quaternion.one.should.eql [1, 0, 0, 0]

      it 'cannot be overridden' # , ->
        #(() ->
        #  quaternion.one = [1, 1, 1, 1]
        #).should.throwError()

    describe '#zero', ->
      it 'should be [0, 0, 0, 0]', ->
        quaternion.zero.should.eql [0, 0, 0, 0]

      it 'cannot be overridden' # , ->
        #(() ->
        #  quaternion.zero = [1, 1, 1, 1] 
        #).should.throwError()

  describe 'Methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        quaternion.addition([1, 2, 3, 4], [1, 1, 1, 1]).should.eql [2, 3, 4, 5]

    describe '#subtraction()', ->
      it 'implements -', ->
        quaternion.subtraction([1, 2, 3, 4], [1, 1, 1, 1]).should.eql [0, 1, 2, 3]

    describe '#multiplication()', ->
      it 'implements *' # , ->
        # quaternion.multiplication([1, 2, 3, 4], [1, 1, 1, 1]).should.eql [2, 3, 4, 5]

    describe '#division()', ->
      it 'implements /' # , ->
        # quaternion.division([1, 2, 3, 4], [1, 1, 1, 1]).should.eql [2, 3, 4, 5]

  describe 'Methods', ->

