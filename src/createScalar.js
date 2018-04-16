const coerced = require('./coerced')
const operators = require('./operators.json')
const staticProps = require('static-props')
const toData = require('./toData')

/**
 * @param {Object} ring
 *
 * @returns {Function} Scalar
 */

function createScalar (ring) {
  const attributes = {
    zero: ring.zero,
    one: ring.one,
    order: 0
  }

  /**
   * Scalar element.
   */

  class Scalar {
    constructor (data) {
      // validate data
      if (ring.notContains(data)) {
        throw new TypeError('Invalid data = ' + data)
      }

      const enumerable = true
      staticProps(this)({ data }, enumerable)

      staticProps(this)(attributes)
    }
  }

  staticProps(Scalar)(attributes)

  const staticNary = (operator) => {
    Scalar[operator] = function () {
      const operands = [].slice.call(arguments).map(toData)
      return coerced(ring[operator]).apply(null, operands)
    }
  }

  const unaryOperators = operators.inversion

  unaryOperators.push('conjugation')

  unaryOperators.forEach((operator) => {
    Scalar[operator] = function (operand) {
      return ring[operator](toData(operand))
    }

    Scalar.prototype[operator] = function () {
      const data = Scalar[operator](this.data)

      return new Scalar(data)
    }
  })

  operators.group.concat(operators.ring).forEach((operator) => {
    staticNary(operator)

    Scalar.prototype[operator] = function () {
      const args = [].slice.call(arguments)
      const operands = [this.data].concat(args)

      const data = Scalar[operator].apply(null, operands)

      return new Scalar(data)
    }
  })

  operators.set.forEach((operator) => {
    staticNary(operator)
  })

  operators.comparison.forEach((operator) => {
    staticNary(operator)

    Scalar.prototype[operator] = function () {
      const args = [].slice.call(arguments)
      const operands = [this.data].concat(args)

      const bool = Scalar[operator].apply(null, operands)

      return bool
    }
  })

  Object.keys(operators.aliasesOf).forEach((operator) => {
    operators.aliasesOf[operator].forEach((alias) => {
      Scalar[alias] = Scalar[operator]
      Scalar.prototype[alias] = Scalar.prototype[operator]
    })
  })

  return Scalar
}

module.exports = createScalar
