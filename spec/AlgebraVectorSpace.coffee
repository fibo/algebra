
algebra = require '../index'

AlgebraField       = algebra.AlgebraField
AlgebraVectorSpace = algebra.AlgebraVectorSpace
AlgebraTensorSpace = algebra.AlgebraTensorSpace
RealField          = algebra.RealField

real = new RealField()

describe 'AlgebraVectorSpace', ->
  describe 'Inheritance', ->
    it 'is an AlgebraTensorSpace', ->
      field     = real
      dimension = 2
      space     = new AlgebraVectorSpace(field, dimension)

      space.should.be.instanceOf AlgebraTensorSpace

  describe 'Constructor', ->
    it 'has signature (field, dimension)', ->
      field     = real
      dimension = 2
      space     = new AlgebraVectorSpace(field, dimension)

      space.should.be.instanceOf AlgebraVectorSpace

  describe 'Attributes', ->
    field     = real
    dimension = 2
    space     = new AlgebraVectorSpace(field, dimension)

    describe '#dimension', ->
      it 'is a number', ->
        # space.dimension.should.be.a.number

    describe '#field', ->
      it 'is a real field', ->
        space.field.should.be.instanceOf AlgebraField

  describe 'Methods', ->
    describe '#Vector()', ->
      it 'is a constructor' # , ->
        # vector = new space.Vector()

    describe '#containsVector()', ->
      it 'checks that the given vector belongs to this vector space'

