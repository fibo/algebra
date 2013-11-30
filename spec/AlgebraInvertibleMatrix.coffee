
algebra = require '../index'

AlgebraMatrix           = algebra.AlgebraMatrix
AlgebraInvertibleMatrix = algebra.AlgebraInvertibleMatrix
RealElement             = algebra.RealElement

data1 = 2
data2 = 3

x = new RealElement(data1)
y = new RealElement(data2)

Element = RealElement
elements = [x, y
            y, x]
order = 2

matrix = new AlgebraInvertibleMatrix(Element, order, elements)

# TODO identity = new AlgebraInvertibleMatrix(Element, order)
# prima lo devo fare nei tensori, che di default fa il tensore di ricci

describe 'AlgebraInvertibleMatrix', ->
  describe 'Inheritance', ->
    it 'is an AlgebraMatrix', ->
      matrix.should.be.instanceOf AlgebraMatrix

  describe 'Constructor', ->
    it 'has signature (Element, order)'

    it 'has signature (Element, order, elements)'

  describe 'Attributes', ->
    describe '#order', ->
      it 'returns the order of the matrix', ->
        matrix.order.should.eql order

    describe '#determinant', ->
      it 'computes the determinant', ->
        det = data1 * data1 - data2 * data2

        matrix.determinant.data.should.eql det

  describe 'Methods', ->
    describe '#inverse()', ->
      it 'returns the inverse matrix'

