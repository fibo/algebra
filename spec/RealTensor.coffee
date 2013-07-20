
algebra = require '../index.js'

AlgebraTensor = algebra.AlgebraTensor
RealTensor    = algebra.RealTensor

tensor = new RealTensor()

describe 'RealTensor', ->
  describe 'inheritance', ->
    it 'is an AlgebraTensor', ->
      tensor.should.be.instanceOf AlgebraTensor

