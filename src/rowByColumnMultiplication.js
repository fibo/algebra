var isInteger = require('is-integer')
var matrixToArrayIndex = require('./matrixToArrayIndex')
/* TODO
var tensorContraction = require('tensor-contraction')
var tensorProduct = require('tensor-product')
var toData = require('./toData')
*/

/**
 * Multiply two matrices, row by column.
 *
 * @api private
 *
 * @param {Object} field
 * @param {Function} field.addition
 * @param {Function} field.multiplication
 * @param {Object|Array} leftMatrix
 * @param {Array} leftNumRows
 * @param {Object|Array} rightMatrix
 * @param {Array} rightNumCols
 *
 * @returns {Array} matrix
 */

function rowByColumnMultiplication (field, leftMatrix, leftNumRows, rightMatrix, rightNumCols) {
  var leftNumCols = leftMatrix.length / leftNumRows
  var rightNumRows = rightMatrix.length / rightNumCols

  if (!isInteger(leftNumCols)) {
    throw new TypeError('leftNumCols does not divide leftMatrix.length')
  }

  if (!isInteger(rightNumRows)) {
    throw new TypeError('rightNumRows does not divide rightMatrix.length')
  }

  // Check if matrices can be multiplied.
  if (leftNumCols !== rightNumRows) {
    throw new TypeError('Left num cols != right num rows')
  }

  /*
   * TODO try with tensor product and contraction.
  var leftMatrixData = toData(leftMatrix)
  var rightMatrixData = toData(rightMatrix)

  var tensorIndices = [leftNumRows, leftNumCols, rightNumRows, rightNumCols]

  var tensorProductData = tensorProduct(field.multiplication, [leftNumRows, leftNumCols], [rightNumRows, rightNumCols], leftMatrixData, rightMatrixData)

  return tensorContraction(field.addition, [1, 2], tensorIndices, tensorProductData)
  */
  var commonIndex = leftNumCols
  var data = []
  var rows = leftNumRows
  var cols = rightNumCols

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var leftIndex = matrixToArrayIndex(i, 0, commonIndex)
      var rightIndex = matrixToArrayIndex(0, j, cols)

      var rightElement = rightMatrix[rightIndex]
      var leftElement = leftMatrix[leftIndex]

      var element = field.multiplication(leftElement, rightElement)

      for (var k = 1; k < commonIndex; k++) {
        leftIndex = matrixToArrayIndex(i, k, commonIndex)
        rightIndex = matrixToArrayIndex(k, j, cols)

        rightElement = rightMatrix[rightIndex]
        leftElement = leftMatrix[leftIndex]

        element = field.addition(element, field.multiplication(rightElement, leftElement))
      }

      data.push(element)
    }
  }

  return data
}

module.exports = rowByColumnMultiplication
