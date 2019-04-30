/**
 * Check if binary operator is a mutator
 *
 * @api private
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {*} operand1
 * @param {*} operand2
 * @param {*} resultData
 *
 * @returns {Function} mutatorBinaryOperatorTest
 */

function mutatorBinaryOperator (Scalar, operator, operand1, operand2, resultData) {
  return function mutatorBinaryOperatorTest () {
    const scalar = new Scalar(operand1)

    const result = scalar[operator](operand2)

    result.data.should.eql(resultData)
  }
}

module.exports = mutatorBinaryOperator
