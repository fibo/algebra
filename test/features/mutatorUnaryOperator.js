
var should = require('should')

/*!
 * Check if unary operator is a mutator
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {*} operand
 * @param {*} result
 *
 * @returns {Function} mutatorUnaryOperatorTest
 */

function mutatorUnaryOperator (Scalar, operator, operand, result) {
  return function mutatorUnaryOperatorTest () {
    var scalar = new Scalar(operand)

    scalar[operator]()

    scalar.data.should.eql(result)
  }
}

module.exports = mutatorUnaryOperator

