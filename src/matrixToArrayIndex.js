
/**
 *
 * @param {Number} i row
 * @param {Number} j column
 * @param {Number} numberOfColumns
 *
 * @return {Number} index
 */

function matrixToArrayIndex(i, j, numberOfColumns) {
  var index = i * numberOfColumns + j

  return index
}

module.exports = matrixToArrayIndex

