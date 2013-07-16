Real Tensor
===========

    AlgebraTensor = require 'AlgebraTensor'

    class RealTensor extends AlgebraTensor
      constructor: (indices, elements) ->
        super.indices indices

    exports = RealTensor

