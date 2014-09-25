
var inherits = require('inherits')

var TensorSpace = require('./TensorSpace')

function VectorSpace (Field, dimension) {
  var self = this

  TensorSpace.call(this, Field, dimension)

  function Vector (elements) {
    this.space = self
  }
}

inherits(VectorSpace, TensorSpace)

module.exports = VectorSpace

