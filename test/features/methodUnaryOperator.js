
var should = require('should')

/**
 * Check if unary operator is a mutator
 *
 * @api private
 *
 * @param {Object} Scalar
 * @param {String} operator name
 * @param {*} operand
 * @param {*} resultData
 *
 * @returns {Function} mutatorUnaryOperatorTest
 */

function mutatorUnaryOperator (Scalar, operator, operand, resultData) {
  return function mutatorUnaryOperatorTest () {
    var scalar = new Scalar(operand)

    var result = scalar[operator]()

    result.data.should.eql(resultData)
  }
}

module.exports = mutatorUnaryOperator

