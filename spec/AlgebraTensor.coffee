
algebra = require '../index'

AlgebraTensor = algebra.AlgebraTensor

ComplexField   = algebra.ComplexField
ComplexElement = algebra.ComplexElement


RealField = algebra.RealField
RealElement = algebra.RealElement

complex = new ComplexField()
real = new RealField()

z = new ComplexElement(1, 2)
w = new ComplexElement(5, -1)

describe 'AlgebraTensor', ->
  describe 'Constructor', ->
    it 'has signature (field, indices, elements)', ->
      elements = [ z, w, z, w, z, w,
                   z, z, z, w, w, w,
                   z, z, z, z, z, z,
                   z, z, z, z, z, z]

      indices = [2, 4, 3]

      tensor = new AlgebraTensor(complex, indices, elements)
      tensor.should.be.instanceOf AlgebraTensor

    it 'has signature (field, indices)', ->
      indices = [2, 4]

      tensor = new AlgebraTensor(complex, indices)
      tensor.should.be.instanceOf AlgebraTensor

    it 'defaults #elements to Ricci tensor elements', ->

    it 'has signature (field)', ->
      tensor = new AlgebraTensor(complex)
      tensor.should.be.instanceOf AlgebraTensor

    it 'has default indices [0]', ->
      tensor = new AlgebraTensor(complex)
      tensor.indices.should.eql [0]

    it 'checks signature', ->
      (() ->
        new AlgebraTensor()
      ).should.throwError()

    it 'requires #field is instance of AlgebraField', ->
      (() ->
         tensor = new AlgebraTensor('not a field')
      ).should.throwError()

    it 'coerces #elements from AlgebraElement', ->
      x = new RealElement(2)
      y = new RealElement(4)
      field = real
      indices = [3]
      elements = [x, y, 8]
      tensor = new AlgebraTensor(field, indices, elements)

      tensor.should.be.instanceOf AlgebraTensor

      tensor.elements[0].should.eql x.data
      tensor.elements[1].should.eql y.data
      tensor.elements[2].should.eql 8

    it 'requires #elements are valid', ->
      x = new RealElement(2)
      y = 'foo'
      field = real
      indices = [2]
      elements = [x, y]
      tensor = new AlgebraTensor(field, indices, elements)

  describe 'Attributes', ->
    describe '#indices', ->

    describe '#elements', ->

  describe 'Methods', ->

