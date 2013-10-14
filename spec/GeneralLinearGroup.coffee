
algebra = require '../index'

AlgebraMatrixSpace = algebra.AlgebraMatrixSpace
ComplexElement     = algebra.ComplexElement
GeneralLinearGroup = algebra.GeneralLinearGroup
RealElement        = algebra.RealElement

describe 'GeneralLinearGroup', ->
  describe 'Inheritance', ->
    it 'is an AlgebraMatrixSpace', ->
      Element = RealElement
      degree  = 2
      gl      = new GeneralLinearGroup(Element, degree)

      gl.should.be.instanceOf AlgebraMatrixSpace

  describe 'Constructor', ->
    it 'has signature (field, degree)', ->
      Element = RealElement
      degree = 2
      gl      = new GeneralLinearGroup(Element, degree)

      gl.should.be.instanceOf AlgebraMatrixSpace

  describe 'Attributes', ->
    Element = ComplexElement
    degree  = 3
    gl      = new AlgebraMatrixSpace(Element, degree)

    describe '#dimension', ->
      it 'is a number', ->
        gl.dimension.should.be.a.number

      it 'is the square of degree', ->
        dimension = degree * degree
        gl.dimension.should.be.eql dimension

  describe 'Methods', ->
    describe '#Matrix()', ->
      it 'is a constructor' # , ->
        # matrix = new gl.Matrix()

    describe '#containsMatrix()', ->
      it 'checks that the given matrix belongs to this matrix gl'

