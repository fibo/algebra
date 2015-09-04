
/**
 * Convert a pair of indices to a 1-dimensional index
 *
 * @function
 * @param {Number} i index row
 * @param {Number} j index column
 * @param {Number} numCols
 *
 * @returns {Number} index
 */

function matrixToArrayIndex (i, j, numCols) {
  return j + i * numCols
}

module.exports = matrixToArrayIndex

