
var inherits = require('inherits')

var TensorSpace = require('./TensorSpace')

function VectorSpace (Field, dimension) {
  var self = this

  TensorSpace.call(this, Field, dimension)

  var Tensor = self.Tensor
  
  function Vector (elements) {
    Tensor.call(this, elements)  
  }
  
  inherits(Vector, Tensor)
  
  self.Vector = Vector
}

inherits(VectorSpace, TensorSpace)

module.exports = VectorSpace

