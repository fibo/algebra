
var matrixToArrayIndex = require('./matrixToArrayIndex')

/**
 *
 * @param {Object} Scalar
 * @param {Array} data
 * @param {Number} order
 *
 * @return {Any} det
 */

function determinant (Scalar, data, order) {
  var det

  if (order === 2)
    det = Scalar.subtraction(Scalar.multiplication(data[0], data[3]), Scalar.multiplication(data[2], data[1]))

  return det
}

module.exports = determinant

