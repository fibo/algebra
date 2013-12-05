
algebra = require '../index'

AlgebraInvertibleMatrix = algebra.AlgebraInvertibleMatrix
ComplexElement          = algebra.ComplexElement
GeneralLinearGroup      = algebra.GeneralLinearGroup
RealElement             = algebra.RealElement

describe 'GeneralLinearGroup', ->
  describe 'Constructor', ->
    it 'has signature (Element, degree)', ->
      Element = RealElement
      degree = 2
      Gl      = new GeneralLinearGroup(Element, degree)

      Gl.should.be.instanceOf GeneralLinearGroup

  describe 'Attributes', ->
    Element = ComplexElement
    degree  = 3
    Gl      = new GeneralLinearGroup(Element, degree)

    describe '#dimension', ->
      it 'is a number' # , ->
        #Gl.dimension.should.be.a.number

      it 'is the square of degree' # , ->
        #dimension = degree * degree
        #Gl.dimension.should.be.eql dimension

  describe 'Methods', ->
    Element = RealElement
    degree  = 2
    Gl      = new GeneralLinearGroup(Element, degree)

    describe '#Matrix()', ->
      it 'is a constructor' # , ->
        # matrix = new Gl.Matrix([1 ,  2
        #                        0 , -1])
        # matrix.should.be.instanceOf AlgebraInvertibleMatrix

    describe '#containsMatrix()', ->
      it 'checks that the given matrix belongs to this matrix Gl'

