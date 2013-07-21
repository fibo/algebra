
algebra = require '../index.js'

AlgebraElement = algebra.AlgebraElement
RealElement    = algebra.RealElement
RealField      = algebra.RealField

element = new RealElement()
real    = new RealField()

x = new RealElement(2)
y = new RealElement(-10)

describe 'RealElement', ->
  describe 'inheritance', ->
    it 'is an AlgebraElement', ->
      element.should.be.instanceOf AlgebraElement

  describe 'constructor', ->
    it 'data should default to 1', ->
      element.data.should.equal real.one

    it 'accepts one argument', ->
      x.data.should.equal 2
      y.data.should.equal -10

  describe 'methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        # x = 2
        # y = -10
        # x -> x + y = 2 + (-10) = -8
        x.data = 2
        y.data = -10
        x.addition(y)
        x.data.should.equal -8

      it 'can be chained', ->

    describe '#subtraction()', ->
      it 'implements -', ->
        # x = 8
        # y = 4
        # y -> y - x = 4 - 8 = -4
        x.data = 8
        y.data = 4
        y.subtraction(x)
        y.data.should.equal -4

      it 'can be chained', ->


