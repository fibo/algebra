const staticProps = require('static-props')

const coerced = require('./coerced.js')
const operators = require('./operators.json')
const toData = require('./toData.js')

/**
 * @param {Object} ring definition
 *
 * @returns {Function} Scalar
 */

function Ring (ring) {
  const attributes = {
    zero: ring.zero,
    one: ring.one
  }

  function scalarEquality (scalar1, scalar2) {
    const scalarData1 = toData(scalar1)
    const scalarData2 = toData(scalar2)

    return ring.equality(scalarData1, scalarData2)
  }

  function scalarDisequality (scalar1, scalar2) {
    return !scalarEquality(scalar1, scalar2)
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

      // Method aliases.

      staticProps(this)({
        // add: () => this.addition,
        eq: () => this.equality,
        equal: () => this.equality,
        equals: () => this.equality,
        ne: () => this.disequality,
        notEqual: () => this.disequality,
        notEquals: () => this.disequality
        // mul: () => this.multiplication,
        // sub: () => this.subtraction
      })
    }

    belongsTo (Ring) {
      return Ring.contains(this.data)
    }

    disequality (scalar) {
      return scalarDisequality(this, scalar)
    }

    equality (scalar) {
      return scalarEquality(this, scalar)
    }
  }

  staticProps(Scalar)(attributes)

  // Vector static operators.

  staticProps(Scalar)({
    // addition: () => vectorAddition,
    disequality: () => scalarDisequality,
    equality: () => scalarEquality,
    ne: () => scalarDisequality,
    notEqual: () => scalarDisequality
    // subtraction: () => vectorSubtraction
  })

  staticProps(Scalar)({
    // add: () => Vector.addition,
    eq: () => Scalar.equality
    // sub: () => Vector.subtraction
  })

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

module.exports = Ring
