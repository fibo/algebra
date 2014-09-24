
var AlgebraMatrixSpace = require('./AlgebraMatrixSpace')
  , RealElement        = require('./RealElement')
  , inherits           = require('inherits')

/**
 * Space of matrices over Reals
 *
 * @param {Number} numberOfRows
 * @param {Number} numberOfColumns
 */

function RealMatrixSpace (numberOfRows, numberOfColumns) {
  AlgebraMatrixSpace.call(this, RealElement, numberOfRows, numberOfColumns)
}

inherits(RealMatrixSpace, AlgebraMatrixSpace)

module.exports = RealMatrixSpace

