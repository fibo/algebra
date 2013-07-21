
algebra = require '../index.js'

AlgebraElement = algebra.AlgebraElement

element = new AlgebraElement()

describe 'AlgebraElement', ->
  describe 'methods', ->
    describe '#addition()', ->
      it 'is abstract', ->
        element.addition.should.throwError()
   
    describe '#subtraction()', ->
      it 'is abstract', ->
        element.subtraction.should.throwError()
   
    describe '#multiplication()', ->
      it 'is abstract', ->
        element.multiplication.should.throwError()
   
    describe '#division()', ->
      it 'is abstract', ->
        element.division.should.throwError()

