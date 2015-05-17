
var multiDimensionalArrayIndex = require('./multiDimensionalArrayIndex')

/*!
 * Convert a pair of indices to a 1-dimensional index
 *
 * @function
 * @param {Number} i row
 * @param {Number} j column
 * @param {Number} numberOfColumns
 *
 * @returns {Number} index
 */

function matrixToArrayIndex(i, j, numberOfColumns) {
  var index = multiDimensionalArrayIndex([numberOfColumns, numberOfColumns], [i, j])

  return index
}

module.exports = matrixToArrayIndex

