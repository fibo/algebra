
algebra = require '../index'

AlgebraTensor = algebra.AlgebraTensor

ComplexField   = algebra.ComplexField
ComplexElement = algebra.ComplexElement

RealField = algebra.RealField
RealElement = algebra.RealElement

real = new RealField()

x = new RealElement(2)
y = new RealElement(-1)

z = new ComplexElement(1, 2)
w = new ComplexElement(5, -1)

describe 'AlgebraTensor', ->
  describe 'Constructor', ->
    it 'has signature (Element, indices, elements)', ->
      Element = ComplexElement
      indices = [2, 4, 3]
      elements = [ z, w, z, w, z, w,
                   z, z, z, w, w, w,
                   z, z, z, z, z, z,
                   z, z, z, z, z, z ]


      tensor = new AlgebraTensor(Element, indices, elements)
      tensor.should.be.instanceOf AlgebraTensor

    it 'has signature (Element, indices)', ->
      Element = ComplexElement
      indices = [2, 4]

      tensor = new AlgebraTensor(Element, indices)
      tensor.should.be.instanceOf AlgebraTensor

    it 'defaults #elements to Ricci tensor elements'

    it 'has signature (Element)', ->
      Element = ComplexElement
      tensor = new AlgebraTensor(Element)
      tensor.should.be.instanceOf AlgebraTensor

    it 'has default indices [0]', ->
      tensor = new AlgebraTensor(ComplexElement)
      tensor.indices.should.eql [0]

    it 'checks signature', ->
      (() ->
        new AlgebraTensor()
      ).should.throwError()

    it 'requires #Element is an AlgebraElement class', ->
      (() ->
         tensor = new AlgebraTensor('not an AlgebraElement class')
      ).should.throwError()

    it 'coerces data to elements' # , ->
      # field = real
      # indices = [3]
      # data = [2, 4, 8]
      # elements = (new RealElement(num) for num in data)
      # tensor = new AlgebraTensor(field, indices, data)

      # tensor.should.be.instanceOf AlgebraTensor

      # tensor.elements.should.eql elements

    it 'requires #elements belongs to #Element field' # , ->
      # x = new RealElement(2)
      # y = 'foo'
      # Element = RealElement
      # indices = [2]
      # elements = [x, y]

      # (() ->
      #    tensor = new AlgebraTensor(Element, indices, elements)
      # ).should.throwError()

  describe 'Attributes', ->
    describe '#indices', ->
      it 'returns tensor indices'

    describe '#data', ->
      it 'returns tensor elements data', ->
        Element = RealElement
        indices = [2, 2]
        elements = [x, y, y, x]
        tensor = new AlgebraTensor(Element, indices, elements)

        data = []
        data = (element.data for element in elements)

        tensor.data.should.eql data

    describe '#field', ->
      it 'returns tensor field'

    describe '#elements', ->
      it 'returns tensor elements', ->
        Element = RealElement
        indices = [2, 2]
        elements = [x, y, y, x]
        tensor = new AlgebraTensor(Element, indices, elements)

        tensor.elements.should.eql elements

  describe 'Methods', ->
    describe '#addition()', ->
      it 'implements +' , ->
        # t = [0, 1, 2]
        # u = [1, 1, 1]
        # t -> t + u = [0, 1, 2] + [1, 1, 1] = [1, 2, 3]
        Element = RealElement
        indices = [3]

        t = new AlgebraTensor(Element, indices, [0, 1, 2])
        u = new AlgebraTensor(Element, indices, [1, 1, 1])

        t.addition(u)
        t.data.should.eql [1, 2, 3]

      it 'can be chained' , ->
        Element = RealElement
        indices = [2]

        t = new AlgebraTensor(Element, indices, [0, 1])
        u = new AlgebraTensor(Element, indices, [1, 1])

        t.addition(u).should.be.instanceOf AlgebraTensor

