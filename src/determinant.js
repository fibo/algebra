
var matrixToArrayIndex = require('./matrixToArrayIndex'),
    subMatrix          = require('./subMatrix')

/**
 * Computes the determinant of a matrix using Laplace's formula
 *
 * See https://en.wikipedia.org/wiki/Laplace_expansion
 *
 * @function
 *
 * @param {Object} scalar
 * @param {Function} scalar.addition
 * @param {Function} scalar.multiplication
 * @param {Function} scalar.negation
 * @param {Array} data
 * @param {Number} order
 *
 * @returns {Any} det
 */

function determinant (scalar, data, order) {
  var det,
      add = scalar.addition,
      mul = scalar.multiplication,
      neg = scalar.negation

  // Recursion will stop here:
  // the determinant of a 1x1 matrix is its only element.
  if (order === 1)
    return data[0]

  // TODO choose best row or column to start from, i.e. the one with more zeros
  // by now we start from first row, and walk by column
  // needs scalar.isZero
  var startingCol = 0,
      startingRow = 0

  for (var col = 0; col < order; col++) {
    var subData = subMatrix(data, order, order, startingRow, col)

                // +-- Recursion here.
                // ↓
    var cofactor = determinant(scalar, subData, order - 1)

    if ((startingRow + col) % 2 === 1)
      cofactor = neg(cofactor)

    var index = matrixToArrayIndex(startingRow, col, order)

    if (typeof det === 'undefined')
      det = mul(data[index], cofactor) // first iteration
    else
      det = add(det, mul(data[index], cofactor))
  }

  return det
}

module.exports = determinant

