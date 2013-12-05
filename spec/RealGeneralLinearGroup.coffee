
algebra = require '../index'

AlgebraField            = algebra.AlgebraField
GeneralLinearGroup      = algebra.GeneralLinearGroup
RealGeneralLinearGroup  = algebra.RealGeneralLinearGroup
AlgebraInvertibleMatrix = algebra.AlgebraInvertibleMatrix

degree = 4
gl = new RealGeneralLinearGroup(degree)

describe 'RealGeneralLinearGroup', ->
  describe 'Inheritance', ->
    it 'is a GeneralLinearGroup', ->

      gl.should.be.instanceOf GeneralLinearGroup

  describe 'Constructor', ->
    it 'has signature (degree)', ->
      degree = 2
      gl = new RealGeneralLinearGroup(degree)

      gl.should.be.instanceOf RealGeneralLinearGroup

  describe 'Attributes', ->
    describe '#dimension', ->
      it 'is a number' #, ->
        #gl.dimension.should.be.a.number

      it 'is the square of degree' #, ->
        #dimension = degree * degree
        #gl.dimension.should.be.eql dimension

  describe 'Methods', ->
    describe '#Matrix()', ->
      it 'is a constructor that returns an invertible matrix' , ->
        matrix = new gl.Matrix()
        matrix.should.be.instanceOf AlgebraInvertibleMatrix

    describe '#containsMatrix()', ->
      it 'checks that the given matrix belongs to this matrix space'

