
algebra = require '../index'

AlgebraMatrix           = algebra.AlgebraMatrix
AlgebraInvertibleMatrix = algebra.AlgebraInvertibleMatrix
RealElement             = algebra.RealElement

x = new RealElement(2)
y = new RealElement(3)

describe 'AlgebraMatrix', ->
  describe 'Inheritance', ->
    it 'is an AlgebraInvertibleMatrix', ->
      Element = RealElement
      elements = [x, y
                  y, x]
      order = 2

      matrix = new AlgebraInvertibleMatrix(Element, order, elements)

      matrix.should.be.instanceOf AlgebraInvertibleMatrix

  describe 'Constructor', ->
    it 'has signature (Element, order)'

    it 'has signature (Element, order, elements)'

  describe 'Attributes', ->
    describe '#order', ->

    describe '#determinant', ->
      it 'computes the determinant'

  describe 'Methods', ->
    describe '#inverse()', ->
      it 'returns the inverse of the matrix'

