/**
 * Check if binary operator is static
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {*} operand1
 * @param {*} operand2
 * @param {*} result
 *
 * @returns {Function} staticBinaryOperatorTest
 */

function staticBinaryOperator (Scalar, operator, operand1, operand2, result) {
  return function staticBinaryOperatorTest () {
    Scalar[operator](operand1, operand2).should.eql(result)
  }
}

module.exports = staticBinaryOperator
