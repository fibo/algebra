
algebra = require '../index'

AlgebraTensor = algebra.AlgebraTensor

ComplexField   = algebra.ComplexField
ComplexElement = algebra.ComplexElement


RealField = algebra.RealField
RealElement = algebra.RealElement

complex = new ComplexField()
real = new RealField()

x = new RealElement(2)
y = new RealElement(-1)

z = new ComplexElement(1, 2)
w = new ComplexElement(5, -1)

describe 'AlgebraTensor', ->
  describe 'Constructor', ->
    it 'has signature (field, indices, elements)', ->

      elements = [ z, w, z, w, z, w,
                   z, z, z, w, w, w,
                   z, z, z, z, z, z,
                   z, z, z, z, z, z ]

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

    it 'coerces data to elements', ->
      field = real
      indices = [3]
      data = [2, 4, 8]
      elements = (new RealElement(num) for num in data)
      tensor = new AlgebraTensor(field, indices, elements)

      tensor.should.be.instanceOf AlgebraTensor

      tensor.elements.should.eql elements

    it 'requires #elements belongs to field' #, ->
      # x = new RealElement(2)
      # y = 'foo'
      # field = real
      # indices = [2]
      # elements = [x, y]
      # tensor = new AlgebraTensor(field, indices, elements)
      #(() ->
      #   tensor = new AlgebraTensor(field, indices, elements)
      #).should.throwError()

  describe 'Attributes', ->
    describe '#indices', ->
      it 'returns tensor indices'

    describe '#data', ->
      it 'returns tensor elements data', ->
        field = real
        indices = [2, 2]
        elements = [x, y, y, x]
        tensor = new AlgebraTensor(field, indices, elements)

        data = []
        data = (element.data for element in elements)

        tensor.data.should.eql data

    describe '#field', ->
      it 'returns tensor field'

    describe '#elements', ->
      it 'returns tensor elements'

  describe 'Methods', ->
    describe '#addition()', ->
      it 'implements +' #, ->
        # t = [0, 1, 2]
        # u = [1, 1, 1]
        # t -> t + u = [0, 1, 2] + [1, 1, 1] = [1, 2, 3]
        #indices = [3]
        #t = new AlgebraTensor(real, indices, [0, 1, 2])
        #u = new AlgebraTensor(real, indices, [1, 1, 1])
        #t.addition(u)
        #t.data.should.equal [1, 2, 3]

      it 'can be chained'#, ->
        #t.addition(u).should.be.instanceOf RealElement

