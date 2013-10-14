
algebra = require '../index'

AlgebraField       = algebra.AlgebraField
AlgebraMatrixSpace = algebra.AlgebraMatrixSpace
AlgebraTensorSpace = algebra.AlgebraTensorSpace
RealElement        = algebra.RealElement

describe 'AlgebraMatrixSpace', ->
  describe 'Inheritance', ->
    it 'is an AlgebraTensorSpace', ->
      Element = RealElement
      degree  = 2
      space   = new AlgebraMatrixSpace(Element, degree)

      space.should.be.instanceOf AlgebraTensorSpace

  describe 'Constructor', ->
    it 'has signature (Element, degree)', ->

      #space.should.be.instanceOf AlgebraMatrixSpace

    it 'has signature (Element, [numRows, numColumns])', ->
      Element = RealElement
      mXn     = [2, 3]
      space   = new AlgebraMatrixSpace(Element, mXn)

      space.should.be.instanceOf AlgebraMatrixSpace

  describe 'Attributes', ->
    Element = RealElement
    mXn     = [2, 3]
    space   = new AlgebraMatrixSpace(Element, mXn)

    describe '#dimension', ->
      it 'is a number', ->
        space.dimension.should.be.a.number

      it 'is the numRows by numColumns', ->
        dimension = mXn[0] * mXn[1]
        space.dimension.should.be.eql dimension

    describe '#field', ->
      it 'is a real field', ->
        space.field.should.be.instanceOf AlgebraField

  describe 'Methods', ->
    describe '#Matrix()', ->
      it 'is a constructor' # , ->
        # vector = new space.Matrix()

    describe '#containsMatrix()', ->
      it 'checks that the given matrix belongs to this matrix space'

