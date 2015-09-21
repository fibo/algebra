
/**
 * Comparison operator for group and ring classes
 *
 * @api private
 *
 * @param {Function} operator
 *
 * @returns {Function} anonymous accessor
 */

function comparison (operator) {
  return function () {
    return operator.bind(null, this.data).apply(null, arguments)
  }
}

module.exports = comparison

