
var AlgebraMatrix = require('./AlgebraMatrix')
  , inherits      = require('inherits')

/**
 * Abstract square matrix
 *
 * @param {Object} space instance of AlgebraMatrixSpace
 * @param {Array} elements
 */

function AlgebraSquareMatrix (space, elements) {
  AlgebraMatrix.call(this, space, elements)
}

inherits(AlgebraMatrix, AlgebraSquareMatrix)

module.exports = AlgebraSquareMatrix

