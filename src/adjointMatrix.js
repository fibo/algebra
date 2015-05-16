
var matrixToArrayIndex = require('./matrixToArrayIndex')

// TODO: check name disambiguation https://en.wikipedia.org/wiki/Adjugate_matrix

/*!
 * Compute the adjoint of a matrix
 *
 * @param {Array} data
 * @param {Number} numRows
 * @param {Number} numCols
 * @param {Number} row
 * @param {Number} col
 *
 * @return {Array} adjoint
 */

function adjointMatrix (data, numRows, numCols, row, col) {
  var adjoint = []

  for (var i = 0; i < numRows; i++) {
    for (var j = 0; j < numCols; j++) {
      if ((i !== row) && (j !== col)) {
        var index = matrixToArrayIndex(i, j, numCols)

        adjoint.push(data[index])
      }
    }
  }

  return adjoint
}

module.exports = adjointMatrix

