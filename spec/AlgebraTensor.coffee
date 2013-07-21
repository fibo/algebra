
algebra = require '../index.js'

AlgebraTensor = algebra.AlgebraTensor

ComplexField   = algebra.ComplexField
ComplexElement = algebra.ComplexElement

complex = new ComplexField()

z = new ComplexElement(1, 2)
w = new ComplexElement(5, -1)

describe 'AlgebraTensor', ->
  describe 'constructor', ->
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

  describe 'attributes', ->
    describe '#indices', ->

    describe '#elements', ->

