
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
    it 'data should default to one', ->
      element.data.should.eql real.one

    it 'has signature (number)', ->
      x.data.should.eql 2
      y.data.should.eql -10

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
        x.addition(y).should.be.instanceOf RealElement

    describe '#add()', ->
      it 'is an alias of #addition()', ->
        element.add.should.eql element.addition

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
        x.subtraction(y).should.be.instanceOf RealElement

    describe '#sub()', ->
      it 'is an alias of #subtraction()', ->
        element.sub.should.eql element.subtraction

    describe '#multiplication()', ->
      it 'implements *', ->
        # x = 2
        # y = -10
        # x -> x * y = 2 * (-10) = -20
        x.data = 2
        y.data = -10
        x.multiplication(y)
        x.data.should.eql -20

      it 'can be chained', ->
        x.multiplication(y).should.be.instanceOf RealElement

    describe '#mul()', ->
      it 'is an alias of #multiplication()', ->
        element.mul.should.eql element.multiplication

    describe '#division()', ->
      it 'implements /', ->
        # x = 10
        # y = 20
        # x -> x / y = 10 / 20 = 0.5
        x.data = 10
        y.data = 20
        x.division(y)
        x.data.should.eql 0.5

      it 'can be chained', ->
        x.division(y).should.be.instanceOf RealElement

    describe '#div()', ->
      it 'is an alias of #division()', ->
        element.div.should.eql element.division

