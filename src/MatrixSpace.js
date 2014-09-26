
var inherits = require('inherits')

var Space = require('./Space')

function MatrixSpace (field, numRows, numColumns) {
  var self = this

  var space = new Space(field, [numRows, numColumns])

  self.addition = space.addition
  self.subtraction = space.subtraction
  
  function Matrix (data) {
    space.Element.call(this, data)  
  }

  inherits(Matrix, space.Element)

  self.Matrix = Matrix
}

inherits(MatrixSpace, Space)

module.exports = MatrixSpace

