
var AlgebraVectorSpace = require('./AlgebraVectorSpace')
  , inherits           = require('inherits')
  , _                  = require('underscore')

/**
 * Space of matrices
 *
 * @param {Object} field
 * @param {Number} numberOfRows
 * @param {Number} numberOfColumns
 */

function AlgebraMatrixSpace (field, numberOfRows, numberOfColumns) {
  AlgebraVectorSpace.call(this, field, numberOfRows * numberOfColumns)
}

inherits(AlgebraMatrixSpace, AlgebraVectorSpace)

module.exports = AlgebraMatrixSpace

