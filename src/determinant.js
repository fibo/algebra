
var matrixToArrayIndex = require('./matrixToArrayIndex')

/**
 *
 * @param {Object} field
 * @param {Array} data
 * @param {Number} order
 *
 * @return {Any} det
 */

function determinant (field, data, order) {
  var det

  if (order === 2)
    det = field.subtraction(field.multiplication(data[0], data[3]), field.multiplication(data[2], data[1]))

  return det
}

module.exports = determinant

