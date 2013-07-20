
algebra = require '../index.js'

AlgebraElement = algebra.AlgebraElement

element = new AlgebraElement()

describe 'AlgebraElement', ->
  describe '#addition()', ->
    it 'is abstract', ->
      element.addition.should.throwError()

  describe '#subtraction()', ->
    it 'is abstract', ->
      element.subtraction.should.throwError()

