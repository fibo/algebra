
var arrayFrom = require('./arrayFrom'),
    toData    = require('./toData')

/**
 * Turns a 2-ary operator into an n-ary
 *
 * @api {private}
 *
 * ```
 * var add = nArify(function (a, b) { return a + b })
 *
 * add(1, 2, 3) // 1 + 2 + 3 = 6
 * ```
 *
 * @params {Function} twoAryOperator
 *
 * @params {Function} nAryOperator
 */

function nArify (operator) {
  return function () {
    return [].slice.call(arguments).map(toData).reduce(operator)
  }
}

module.exports = nArify

