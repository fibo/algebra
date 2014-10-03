
var should = require('should')

/**
 * Check if binary operator is static
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {Any} operand1
 * @param {Any} operand2
 * @param {Any} result
 *
 * @return {Function} staticBinaryOperatorTest
 */

function staticBinaryOperator (Scalar, operator, operand1, operand2, result) {
  return function staticBinaryOperatorTest () {
    Scalar[operator](operand1, operand2).should.eql(result)
  }
}

module.exports = staticBinaryOperator

