
var adjointMatrix      = require('./adjointMatrix'),
    matrixToArrayIndex = require('./matrixToArrayIndex')

/*!
 *
 * @param {Object} Scalar
 * @param {Array} data
 * @param {Number} order
 *
 * @returns {Any} det
 */

function determinant (Scalar, data, order) {
  var det

  // If order is 2, go for a straight calculation.
  //
  //  det | a b | = a * d - c * b
  //      | c d |
  //
  if (order === 2) {
    det = Scalar.subtraction(Scalar.multiplication(data[0], data[3]),
                             Scalar.multiplication(data[2], data[1]))

    return det
  }

  // TODO choose best row or column to start from, i.e. the one with more zeros
  // by now we start from first row, and walk by column
  var startingCol = 0,
      startingRow = 0


  var adjointData        = adjointMatrix(data, order, order, startingRow, startingCol),
      adjointDeterminant = determinant(Scalar, adjointData, order - 1),
      index              = matrixToArrayIndex(startingRow, startingCol, order)

  det = Scalar.multiplication(data[index], adjointDeterminant)

  for (var col = 1; col < order; col++) {
    adjointData = adjointMatrix(data, order, order, startingRow, col)

    adjointDeterminant = determinant(Scalar, adjointData, order - 1)

    index = matrixToArrayIndex(startingRow, col, order)

    det = Scalar.addition(det, Scalar.multiplication(data[index], adjointDeterminant))
  }

  return det
}

module.exports = determinant

