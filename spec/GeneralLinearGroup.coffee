
algebra = require '../index'

AlgebraField       = algebra.AlgebraField
AlgebraMatrixSpace = algebra.AlgebraMatrixSpace
ComplexField       = algebra.ComplexField
GeneralLinearGroup = algebra.GeneralLinearGroup
RealField          = algebra.RealField

complex = new ComplexField()
real    = new RealField()

describe 'GeneralLinearGroup', ->
  describe 'Inheritance', ->
    it 'is an AlgebraMatrixSpace', ->
      field  = real
      degree = 2
      gl  = new GeneralLinearGroup(field, degree)

      gl.should.be.instanceOf AlgebraMatrixSpace

  describe 'Constructor', ->
    it 'has signature (field, degree)', ->
      field  = real
      degree = 2
      gl  = new AlgebraMatrixSpace(field, degree)

      gl.should.be.instanceOf AlgebraMatrixSpace

  describe 'Attributes', ->
    field  = complex
    degree = 3
    gl  = new AlgebraMatrixSpace(field, degree)

    describe '#dimension', ->
      it 'is a number', ->
        gl.dimension.should.be.a.number

      it 'is the square of degree', ->
        dimension = degree * degree
        gl.dimension.should.be.eql dimension

    describe '#field', ->
      it 'returns the field', ->
        gl.field.should.be.eql field

  describe 'Methods', ->
    describe '#Matrix()', ->
      it 'is a constructor' # , ->
        # matrix = new gl.Matrix()

    describe '#containsMatrix()', ->
      it 'checks that the given matrix belongs to this matrix gl'

