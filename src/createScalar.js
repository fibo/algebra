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
    one: ring.one
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

  const scalarOperators = ({ categories }) => categories.includes('scalar')

  operators.filter(scalarOperators).forEach(operator => {
    const isBinary = operator.categories.includes('binary')
    const isClosed = operator.isClosed
    const isInstanceMethod = operator.isInstanceMethod
    const isStaticMethod = operator.isStaticMethod
    const isUnary = operator.categories.includes('unary')
    const operatorName = operator.name

    if (isBinary) {
      if (isInstanceMethod) {
        Scalar.prototype[operatorName] = function () {
          const args = [].slice.call(arguments)
          const operands = [this.data].concat(args)

          const data = coerced(ring[operatorName]).apply(null, operands)

          if (isClosed) {
            return new Scalar(data)
          } else {
            return data
          }
        }
      }

      if (isStaticMethod) {
        Scalar[operatorName] = function () {
          const operands = [].slice.call(arguments).map(toData)

          return coerced(ring[operatorName]).apply(null, operands)
        }
      }
    }

    if (isUnary) {
      if (isInstanceMethod) {
        Scalar.prototype[operatorName] = function () {
          const data = Scalar[operatorName](this.data)

          if (isClosed) {
            return new Scalar(data)
          } else {
            return data
          }
        }
      }

      if (isStaticMethod) {
        Scalar[operatorName] = function (operand) {
          return ring[operatorName](toData(operand))
        }
      }
    }

    operator.aliases.forEach(alias => {
      if (isInstanceMethod) {
        Scalar.prototype[alias] = Scalar.prototype[operatorName]
      }

      if (isStaticMethod) {
        Scalar[alias] = Scalar[operatorName]
      }
    })
  })

  return Scalar
}

module.exports = createScalar
