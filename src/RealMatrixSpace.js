
var AlgebraMatrixSpace = require('./AlgebraMatrixSpace')
  , RealField          = require('./RealField')
  , inherits           = require('inherits')

var field = new RealField()

/**
 * Space of matrices over Reals
 *
 * @param {Number} numberOfRows
 * @param {Number} numberOfColumns
 */

function RealMatrixSpace (numberOfRows, numberOfColumns) {
  AlgebraMatrixSpace.call(this, field, numberOfRows, numberOfColumns)
}

inherits(RealMatrixSpace, AlgebraMatrixSpace)

module.exports = RealMatrixSpace

