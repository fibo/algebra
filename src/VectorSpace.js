
var inherits = require('inherits')

var Space = require('./Space')

function VectorSpace (field, dimension) {
  var self = this

  var space = new Space(field, [dimension])

  self.addition = space.addition
  self.subtraction = space.subtraction
  
  function Vector (data) {
    space.Element.call(this, data)  
  }

  inherits(Vector, space.Element)

  self.Vector = Vector
}

inherits(VectorSpace, Space)

module.exports = VectorSpace
