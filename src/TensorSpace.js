
var inherits = require('inherits')

var Space = require('./Space')

function TensorSpace (field, indices) {
  var self = this

  var space = new Space(field, indices)

  self.addition = space.addition
  self.subtraction = space.subtraction
  
  function Tensor (data) {
    space.Element.call(this, data)  
  }

  inherits(Tensor, space.Element)

  self.Tensor = Tensor
}

inherits(TensorSpace, Space)

module.exports = TensorSpace

