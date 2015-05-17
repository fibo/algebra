
var matrixToArrayIndex = require('./matrixToArrayIndex')

/*!
 *
 * @function
 *
 * @param {Object} Scalar
 * @param {Array} leftMatrix
 * @param {Array} leftIndices
 * @param {Array} rightMatrix
 * @param {Array} rightIndices
 *
 * @returns {Array} data
 */

function rowByColumnMultiplication (Scalar, leftMatrix, leftIndices, rightMatrix, rightIndices) {
  // Check if matrix can be multiplied
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

      var element = Scalar.multiplication(leftElement, rightElement)

      for (var k = 1; k < commonIndex; k++) {
        leftIndex = matrixToArrayIndex(i, k, commonIndex)
        rightIndex = matrixToArrayIndex(k, j, cols)

        rightElement = rightMatrix[rightIndex]
        leftElement = leftMatrix[leftIndex]

        element = Scalar.addition(element, Scalar.multiplication(rightElement, leftElement))
      }

      data.push(element)
    }
  }

  return data
}

module.exports = rowByColumnMultiplication

