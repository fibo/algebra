
var should = require('should')

/**
 * Check if binary operator is a mutator
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {Any} operand1
 * @param {Any} operand2
 * @param {Any} result
 *
 * @return {Function} mutatorBinaryOperatorTest
 */

function mutatorBinaryOperator (Scalar, operator, operand1, operand2, result) {
  return function mutatorBinaryOperatorTest () {
    var scalar = new Scalar(operand1)

    scalar[operator](operand2)

    scalar.data.should.eql(result)
  }
}

module.exports = mutatorBinaryOperator

