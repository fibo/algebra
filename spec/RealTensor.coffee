
algebra = require '../index'

AlgebraTensor = algebra.AlgebraTensor
RealTensor    = algebra.RealTensor

describe 'RealTensor', ->
  describe 'Inheritance', ->
    it 'is an AlgebraTensor', ->
      indices = [1, 2]
      elements = [0, 1]
      tensor = new RealTensor(indices, elements)
      tensor.should.be.instanceOf AlgebraTensor

  describe 'Constructor', ->

  describe 'Attributes', ->

  describe 'Methods', ->
