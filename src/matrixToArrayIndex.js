/**
 * Convert a pair of indices to a 1-dimensional index
 *
 * @api private
 *
 * @param {Number} i index row
 * @param {Number} j index column
 * @param {Number} numCols
 *
 * @returns {Number} index
 */

var multiDimArrayIndex = require('multidim-array-index')

function matrixToArrayIndex (i, j, numCols) {
  return multiDimArrayIndex([numCols, numCols], [i, j])
}

module.exports = matrixToArrayIndex
