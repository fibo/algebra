
algebra = require '../index.js'

AlgebraElement = algebra.AlgebraElement
RealElement    = algebra.RealElement
RealField      = algebra.RealField

Real = new RealField()

element = new RealElement()

x = new RealElement(2)
y = new RealElement(-10)

describe 'RealElement', ->
  describe 'inheritance', ->
    it 'is an AlgebraElement', ->
      element.should.be.instanceOf AlgebraElement

  describe 'constructor', ->
    it 'data should default to 1', ->
      element.data.should.equal Real.one

    it 'accepts one argument', ->
      x.data.should.equal 2
      y.data.should.equal -10

  describe 'methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        // x -> x + y = 2 + (-10) = -8
        x.addition(y)
        x.data.should.equal -8

      it 'can be chained', ->

    describe '#subtraction()', ->
      it 'implements -', ->
        // y -> y - x = 2 - (-8) = 10
        y.subtraction(x)
        y.data.should.equal 10

      it 'can be chained', ->


