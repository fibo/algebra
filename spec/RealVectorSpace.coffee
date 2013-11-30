
algebra = require '../index'

AlgebraVectorSpace = algebra.AlgebraVectorSpace

RealElement     = algebra.RealElement
RealVectorSpace = algebra.RealVectorSpace

dimension     = 2
space         = new RealVectorSpace(dimension)
abstractSpace = new AlgebraVectorSpace(RealElement, dimension)

describe 'RealVectorSpace', ->
  describe 'Inheritance', ->
    it 'is an AlgebraVectorSpace', ->
      space.should.be.instanceOf AlgebraVectorSpace

  describe 'Constructor', ->
    it 'has signature (dimension)'

  describe 'Attributes', ->
    describe '#dimension', ->
      it 'is a number', ->
        space.dimension.should.be.a.number

  describe 'Methods', ->
    describe '#Vector()', ->
      it 'is inherited by AlgebraVectorSpace', ->
        space.dimension.should.be.eql abstractSpace.dimension

    describe '#containsVector()', ->
      it 'is inherited by AlgebraVectorSpace' # , ->

