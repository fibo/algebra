
algebra = require '../index'

AlgebraElement = algebra.AlgebraElement
ComplexElement = algebra.ComplexElement
ComplexField   = algebra.ComplexField

element = new ComplexElement()
complex = new ComplexField()

z = new ComplexElement([2, 1])
w = new ComplexElement(2, 1)

describe 'ComplexElement', ->
  describe 'Inheritance', ->
    it 'is an AlgebraElement', ->
      element.should.be.instanceOf AlgebraElement

  describe 'Constructor', ->
    it 'data should default to [1, 0]', ->
      element.data.should.eql complex.one

    it 'has signature ([number, number])', ->
      z.data.should.eql [2, 1]

    it 'has signature (number, number)', ->
      w.data.should.eql [2, 1]

  describe 'Methods', ->
    describe '#addition()', ->
      it 'implements +', ->
        # z = [2, 1]
        # w = [-1, 4]
        # z -> z + w = [2, 1] + [-1, 4] = [1, 5] 
        z.data = [2, 1]
        w.data = [-1, 4]

        z.addition(w)

        z.data.should.eql [1, 5]

      it 'can be chained', ->
        z.addition(w).should.be.instanceOf ComplexElement

    describe '#add()', ->
      it 'is an alias of #addition()', ->
        element.add.should.eql element.addition

    describe '#subtraction()', ->
      it 'implements -' , ->
        # z = [8, 1]
        # w = [4, 2]
        # z -> z - w = [8, 1] - [4, 2] = [4, -1]
        z.data = [8, 1]
        w.data = [4, 2]

        z.subtraction(w)

        z.data.should.eql [4, -1]

      it 'can be chained', ->
        z.subtraction(w).should.be.instanceOf ComplexElement

    describe '#sub()', ->
      it 'is an alias of #subtraction()', ->
        element.sub.should.eql element.subtraction

    describe '#multiplication()', ->
      it 'implements *', ->
        # z = [2, 1]
        # w = [-1, 0]
        # z -> z * w = [2, 1] * [-1, 0] = [-2, -1]
        z.data = [2, 1]
        w.data = [-1, 0]

        z.multiplication(w)

        z.data.should.eql [-2, -1]

      it 'can be chained', ->
        z.multiplication(w).should.be.instanceOf ComplexElement

    describe '#mul()', ->
      it 'is an alias of #multiplication()', ->
        element.mul.should.eql element.multiplication

    describe '#division()', ->
      it 'implements /', ->
        # z = [-2, -1]
        # w = [-1, 0]
        # z -> z / w = [-2, -1] / [-1, 0] = [2, 1]
        z.data = [-2, -1]
        w.data = [-1, 0]

        z.division(w)

        z.data.should.eql [2, 1]

      it 'can be chained', ->
        z.division(w).should.be.instanceOf ComplexElement

    describe '#div()', ->
      it 'is an alias of #division()', ->
        element.div.should.eql element.division

