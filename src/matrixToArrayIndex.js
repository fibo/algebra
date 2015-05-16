
var multiDimensionalArrayIndex = require('./multiDimensionalArrayIndex')

/*!
 *
 * @param {Number} i row
 * @param {Number} j column
 * @param {Number} numberOfColumns
 *
 * @return {Number} index
 */

function matrixToArrayIndex(i, j, numberOfColumns) {
  var index = multiDimensionalArrayIndex([numberOfColumns, numberOfColumns], [i, j])

  return index
}

module.exports = matrixToArrayIndex

