
var inherits = require('inherits')

var Space = require('./Space')

/**
 * Space of m x n matrices
 *
 * @param {Object} field
 * @param {Number} numRows
 * @param {Number} numCols
 *
 * @constructor
 */

function MatrixSpace (field, numRows, numCols) {
  var self = this

  // numCols defaults to numRows
  if (typeof numCols === 'undefined')
    numCols = numRows

  this.numRows = numRows
  this.numCols = numCols

  var space = new Space(field, [numRows, numCols])

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

