
/**
 * Comparison operator for group and ring classes
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

