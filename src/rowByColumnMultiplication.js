
var matrixToArrayIndex = require('./matrixToArrayIndex')

/**
 *
 * @param {Object} Scalar
 * @param {Array} leftMatrix
 * @param {Array} leftIndices
 * @param {Array} rightMatrix
 * @param {Array} rightIndices
 *
 * @return {Array} data
 */

function rowByColumnMultiplication (Scalar, leftMatrix, leftIndices, rightMatrix, rightIndices) {
  var data = []

  // Check if matrix can be multiplied
  if (leftIndices[1] !== rightIndices[0])
    throw new TypeError('Left num cols != right num rows')

  var commonIndex = leftIndices[1]

  var rows = leftIndices[0]
  var cols = rightIndices[1]

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var element
        , leftIndex
        , rightIndex
        , rightElement
        , leftElement

      leftIndex = matrixToArrayIndex(i, 0, commonIndex)
      rightIndex = matrixToArrayIndex(0, j, cols)

      rightElement = rightMatrix[rightIndex]
      leftElement = leftMatrix[leftIndex]

      element = Scalar.multiplication(leftElement, rightElement)

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

