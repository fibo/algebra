
algebra = require '../index'

AlgebraElement    = algebra.AlgebraElement
QuaternionElement = algebra.QuaternionElement
QuaternionField   = algebra.QuaternionField

element = new QuaternionElement()
quaternion = new QuaternionField()

z = new QuaternionElement([2, 1])
w = new QuaternionElement(2, 1)

describe 'QuaternionElement', ->
  describe 'Inheritance', ->
    it 'is an AlgebraElement', ->
      element.should.be.instanceOf AlgebraElement

  describe 'Constructor', ->
    it 'data should default to [1, 0, 0, 0]', ->
      element.data.should.eql [1, 0, 0, 0]

    it 'has signature ([number, number])', ->
      # z.data.should.eql [2, 1]

    it 'has signature (number, number)', ->
      # w.data.should.eql [2, 1]

  describe 'Attributes', ->

  describe 'Methods', ->
    describe '#addition()', ->
      it 'implements +' # , ->
        # z = [2, 1]
        # w = [-1, 4]
        # z -> z + w = [2, 1] + [-1, 4] = [1, 5] 
        # z.data = [2, 1]
        # w.data = [-1, 4]
        # z.addition(w)
        # z.data.should.eql [1, 5]

      it 'can be chained' # , ->

    describe '#add()', ->
      it 'is an alias of #addition()', ->
        element.add.should.eql element.addition

    describe '#subtraction()', ->
      it 'implements -' #, ->
        # z = 8
        # w = 4
        # y -> y - x = 4 - 8 = -4
        #x.data = 8
        #y.data = 4
        #y.subtraction(x)
        #y.data.should.eql -4

      it 'can be chained' # , ->

    describe '#sub()', ->
      it 'is an alias of #subtraction()' # , ->
        # element.sub.should.eql element.subtraction

    describe '#multiplication()', ->
      it 'implements *' # , ->
        # z = [2, 1]
        # w = [-1, 0]
        # z -> z * w = [2, 1] * [-1, 0] = [-2, -1]
        # z.data = [2, 1]
        # w.data = [-1, 0]
        # z.multiplication(w)
        # z.data.should.eql [-2, -1]

      it 'can be chained' # , ->

    describe '#mul()', ->
      it 'is an alias of #multiplication()', ->
        element.mul.should.eql element.multiplication

    describe '#div()', ->
      it 'is an alias of #division()', ->
        element.div.should.eql element.division

