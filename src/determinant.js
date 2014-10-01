
var adjointMatrix = require('./adjointMatrix')
  , matrixToArrayIndex = require('./matrixToArrayIndex')

/**
 *
 * @param {Object} Scalar
 * @param {Array} data
 * @param {Number} order
 *
 * @return {Any} det
 */

function determinant (Scalar, data, order) {
  var adjointData
    , adjointMatrix
    , det
    , startingCol
    , startingRow
    , index

  if (order === 2) {
    det = Scalar.subtraction(Scalar.multiplication(data[0], data[3]), Scalar.multiplication(data[2], data[1]))

    return det
  }

  // TODO choose best row or column to start from, i.e. the one with more zeros
  // by now we start from first row, and walk by column
  startingCol = 0
  startingRow = 0

  index = matrixToArrayIndex(startingRow, startingCol, order)

  adjointData = adjointMatrix(data, order, order, startingRow, startingCol)
  adjoinDeterminant = determinant(Scalar, adjointData, order - 1)

  det = Scalar.multiplication(data[index], adjointDeterminant)

  for (var col = 1; col < order; col++) {
    adjointData = adjointMatrix(data, order, order, row, col)

    adjoinDeterminant = determinant(Scalar, adjointData, order - 1)
  }

  return det
}

module.exports = determinant

