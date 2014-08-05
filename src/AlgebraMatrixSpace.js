
var AlgebraVectorSpace = require('./AlgebraVectorSpace')
  , inherits           = require('inherits')

/**
 * Space of matrices
 *
 * @param {Object} field
 * @param {Number} numberOfRows
 * @param {Number} numberOfColumns
 */

function AlgebraMatrixSpace (field, numberOfRows, numberOfColumns) {
  this.numberOfRows = numberOfRows
  this.numberOfColumns = numberOfColumns

  AlgebraVectorSpace.call(this, field, numberOfRows * numberOfColumns)
}

inherits(AlgebraMatrixSpace, AlgebraVectorSpace)

module.exports = AlgebraMatrixSpace

