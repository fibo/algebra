
algebra = require '../index'

AlgebraTensor = algebra.AlgebraTensor
RealElement   = algebra.RealElement
RealTensor    = algebra.RealTensor

zero = new RealElement(0)
one  = new RealElement(1)

describe 'RealTensor', ->
  describe 'Inheritance', ->
    it 'is an AlgebraTensor', ->
      indices = [1, 2]
      elements = [zero, one]

      tensor = new RealTensor(indices, elements)

      tensor.should.be.instanceOf AlgebraTensor

  describe 'Constructor', ->

  describe 'Attributes', ->

  describe 'Methods', ->

