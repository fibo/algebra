
var matrixToArrayIndex = require('./matrixToArrayIndex')

/**
 * Multiply two matrices, row by column.
 *
 * @function
 *
 * @api private
 *
 * @param {Object}   scalar
 * @param {Function} scalar.addition
 * @param {Function} scalar.multiplication
 * @param {Array} leftMatrix
 * @param {Array} leftIndices
 * @param {Array} rightMatrix
 * @param {Array} rightIndices
 *
 * @returns {Array} data
 */

function rowByColumnMultiplication (scalar, leftMatrix, leftIndices, rightMatrix, rightIndices) {
  // Check if matrices can be multiplied.
  if (leftIndices[1] !== rightIndices[0])
    throw new TypeError('Left num cols != right num rows')

  var commonIndex = leftIndices[1],
      data        = [],
      rows        = leftIndices[0],
      cols        = rightIndices[1]

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var leftIndex  = matrixToArrayIndex(i, 0, commonIndex),
          rightIndex = matrixToArrayIndex(0, j, cols)

      var rightElement = rightMatrix[rightIndex],
          leftElement  = leftMatrix[leftIndex]

      var element = scalar.multiplication(leftElement, rightElement)

      for (var k = 1; k < commonIndex; k++) {
        leftIndex = matrixToArrayIndex(i, k, commonIndex)
        rightIndex = matrixToArrayIndex(k, j, cols)

        rightElement = rightMatrix[rightIndex]
        leftElement = leftMatrix[leftIndex]

        element = scalar.addition(element, scalar.multiplication(rightElement, leftElement))
      }

      data.push(element)
    }
  }

  return data
}

module.exports = rowByColumnMultiplication

