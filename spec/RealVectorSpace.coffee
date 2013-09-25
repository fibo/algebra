
algebra = require '../index'

AlgebraVectorSpace = algebra.AlgebraVectorSpace

RealField       = algebra.RealField
RealVectorSpace = algebra.RealVectorSpace

dimension = 2
real = new RealField()

space = new RealVectorSpace(dimension)
abstractSpace = new AlgebraVectorSpace(real, dimension)

describe 'RealVectorSpace', ->
  describe 'Inheritance', ->
    it 'is an AlgebraVectorSpace', ->
      space.should.be.instanceOf AlgebraVectorSpace

  describe 'Constructor', ->

  describe 'Attributes', ->
    describe '#dimension', ->
      it 'is a number', ->
        space.dimension.should.be.a.number

    describe '#field', ->
      it 'is a real field', ->
        space.field.should.be.instanceOf RealField

  describe 'Methods', ->
    describe '#Vector()', ->
      it 'is inherited by AlgebraVectorSpace', ->
        space.dimension.should.be.eql abstractSpace.dimension

    describe '#containsVector()', ->
      it 'is inherited by AlgebraVectorSpace' # , ->

