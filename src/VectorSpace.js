
var inherits = require('inherits')

var Space = require('./Space')

/**
 * Space of vectors
 *
 * @param {Object} Scalar
 * @param {Number} dimension
 */

function VectorSpace (Scalar, dimension) {
  var self = this

  var space = new Space(Scalar, [dimension])

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

