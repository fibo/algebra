
algebra = require '../index'

AlgebraMatrix = algebra.AlgebraMatrix
RealElement   = algebra.RealElement
RealField     = algebra.RealField

one      = new RealElement(1)
two      = new RealElement(2)
zero     = new RealElement(0)
minusOne = new RealElement(-1)

describe 'AlgebraMatrix', ->
  describe 'Inheritance', ->
    it 'is an AlgebraTensor' # , ->
      # matrix.should.be.instanceOf AlgebraTensor

  describe 'Constructor', ->
    it 'has signature (Element, dimensionArray, elements)'

  describe 'Attributes', ->
    describe '#numberOfColumns', ->
      it 'returns the number of columns'

    describe '#numberOfRows', ->
      it 'returns the number of rows'

  describe 'Methods', ->
    describe '#addition', ->

    describe '#multiplication', ->

