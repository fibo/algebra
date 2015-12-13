var AbstractTensor = require('./Tensor')
var AbstractTensorSpace = require('./TensorSpace')

function createTensorSpace (indices, rank) {
  class TensorSpace extends AbstractTensorSpace {
    constructor () {
      super(indices, rank)
    }
  }

  return TensorSpace
}

module.exports = createTensorSpace
