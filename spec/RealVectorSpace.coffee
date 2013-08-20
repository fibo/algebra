
algebra = require '../index.js'

AlgebraVectorSpace = algebra.AlgebraVectorSpace

RealField       = algebra.RealField
RealVectorSpace = algebra.RealVectorSpace

space = new RealVectorSpace(2)

describe 'RealVectorSpace', ->
  describe 'Inheritance', ->
    it 'is an AlgebraVectorSpace', ->
      space.should.be.instanceOf AlgebraVectorSpace

  describe 'attributes', ->
    describe '#dimension', ->
      it 'is a number', ->
        space.dimension.should.be.a.number

    describe '#field', ->
      it 'is a real field', ->
        space.field.should.be.instanceOf RealField

  describe 'methods', ->
    describe '#Vector()', ->
      it 'is a constructor', ->
        # vector = new space.Vector() 

