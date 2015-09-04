
var matrixToArrayIndex = require('./matrixToArrayIndex')

/**
 * Compute the sub-matrix formed by deleting the i-th row and j-th column
 *
 * @function
 *
 * @param {Array} data set
 * @param {Number} numRows
 * @param {Number} numCols
 * @param {Number} row index deleted
 * @param {Number} col index deleted
 *
 * @returns {Array} sub data-set
 */

function subMatrix (data, numRows, numCols, row, col) {
  var sub = []

  for (var i = 0; i < numRows; i++)
    for (var j = 0; j < numCols; j++)
      if ((i !== row) && (j !== col))
        sub.push(data[matrixToArrayIndex(i, j, numCols)])

  return sub
}

module.exports = subMatrix

