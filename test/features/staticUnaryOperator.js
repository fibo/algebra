/**
 * Check if unary operator is static
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {*} operand
 * @param {*} result
 *
 * @returns {Function} staticUnaryOperatorTest
 */

function staticUnaryOperator (Scalar, operator, operand, result) {
  return function staticUnaryOperatorTest () {
    Scalar[operator](operand).should.eql(result)
  }
}

module.exports = staticUnaryOperator
