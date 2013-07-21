
algebra = require '../index.js'

AlgebraField = algebra.AlgebraField

element = new AlgebraField()

describe 'AlgebraField', ->
  describe 'attributes', ->
    describe '#one()', ->

    describe '#zero()', ->

  describe 'methods', ->
    describe '#addition()', ->
      it 'is abstract', ->
        element.addition.should.throwError()

    describe '#add()', ->
      it 'is abstract', ->
        element.add.should.throwError()

    describe '#subtraction()', ->
      it 'is abstract', ->
        element.subtraction.should.throwError()

    describe '#sub()', ->
      it 'is abstract', ->
        element.sub.should.throwError()

    describe '#multiplication()', ->
      it 'is abstract', ->
        element.multiplication.should.throwError()

    describe '#mul()', ->
      it 'is abstract', ->
        element.mul.should.throwError()

    describe '#division()', ->
      it 'is abstract', ->
        element.division.should.throwError()

    describe '#div()', ->
      it 'is abstract', ->
        element.div.should.throwError()

    describe '#equal()', ->
      it 'is abstract', ->
        element.equal.should.throwError()

    describe '#eq()', ->
      it 'is abstract', ->
        element.eq.should.throwError()

    describe '#notEqual()', ->
      it 'is abstract', ->
        element.notEqual.should.throwError()

    describe '#ne()', ->
      it 'is abstract', ->
        element.ne.should.throwError()

    describe '#inversion()', ->
      it 'is abstract', ->
        element.inversion.should.throwError()

    describe '#inv()', ->
      it 'is abstract', ->
        element.inv.should.throwError()

