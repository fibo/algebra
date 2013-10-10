
algebra = require '../index'

AlgebraField           = algebra.AlgebraField
GeneralLinearGroup     = algebra.GeneralLinearGroup
RealGeneralLinearGroup = algebra.RealGeneralLinearGroup
RealField              = algebra.RealField

describe 'RealGeneralLinearGroup', ->
  describe 'Inheritance', ->
    it 'is a GeneralLinearGroup', ->
      degree = 2
      gl = new RealGeneralLinearGroup(degree)

      gl.should.be.instanceOf GeneralLinearGroup

  describe 'Constructor', ->
    it 'has signature (degree)', ->
      degree = 2
      gl = new RealGeneralLinearGroup(degree)

      gl.should.be.instanceOf RealGeneralLinearGroup

  describe 'Attributes', ->
    degree = 4
    gl = new RealGeneralLinearGroup(degree)

    describe '#dimension', ->
      it 'is a number', ->
        gl.dimension.should.be.a.number

      it 'is the square of degree', ->
        dimension = degree * degree
        gl.dimension.should.be.eql dimension

    describe '#field', ->
      it 'returns the real field', ->
        gl.field.should.be.instanceOf RealField

  describe 'Methods', ->
    describe '#Matrix()', ->
      it 'is a constructor' # , ->
        # matrix = new space.Matrix()

    describe '#containsMatrix()', ->
      it 'checks that the given matrix belongs to this matrix space'

