var CayleyDickson = require('cayley-dickson')
var coerced = require('./coerced')
var inherits  = require('inherits')
var operators = require('./operators.json')
var staticProps = require('static-props')
var TensorSpace = require('./TensorSpace')
var toData = require('./toData')

/**
 * A composition algebra is one of ℝ, ℂ, ℍ, O:
 * Real, Complex, Quaternion, Octonion.
 *
 * https://en.wikipedia.org/wiki/Composition_algebra
 *
 * @param {Object} ring
 *
 * @returns {Function} anonymous with signature (numOfCayleyDicksonConstructionIteration)
 */

function CompositionAlgebra (ring) {
  /**
   * @param {Number} num of CayleyDickson construction iterations
   */

  return function (num) {
    var K = CayleyDickson(ring, num)
    var indices = [1]

    function Scalar (data) {
      this.data = data

      staticProps(this)({
        zero: K.zero,
        one: K.one
      })
    }

    staticProps(Scalar)({
      zero: K.zero,
      one: K.one
    })

    var comparisonOperators = ['equality', 'disequality']

    var binaryOperators = operators.group.concat(['multiplication', 'division'])

    function staticNary (operator) {
      Scalar[operator] = function () {
        var operands = [].slice.call(arguments).map(toData)
        return coerced(K[operator]).apply(null, operands)
      }
    }

    binaryOperators.forEach((operator) => {
      staticNary(operator)

      Scalar.prototype[operator] = function () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var data = Scalar[operator].apply(null, operands)

        var scalar = new Scalar(data)

        return scalar
      }
    })

    comparisonOperators.forEach((operator) => {
      staticNary(operator)

      Scalar.prototype[operator] = function () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var bool = Scalar[operator].apply(null, operands)

        return bool
      }
    })

    Scalar.contains = K.contains
    Scalar.notContains = K.notContains

    Scalar.prototype.add = Scalar.prototype.addition
    Scalar.prototype.mul = Scalar.prototype.multiplication

    Scalar.mul = Scalar.multiplication

    Scalar.div = Scalar.division

    Scalar.prototype.eq = Scalar.prototype.equality

    Scalar.eq = Scalar.equality

    Scalar.prototype.ne = Scalar.prototype.disequality

    Scalar.ne = Scalar.disequality

    var unaryOperators = ['inversion', 'negation', 'inversion', 'negation']

    if (num > 0) unaryOperators.push('conjugation')

    unaryOperators.forEach((operator) => {
      Scalar[operator] = function (operand) {
        return K[operator](toData(operand))
      }

      Scalar.prototype[operator] = function () {

        var data = Scalar[operator](this.data)

        return new Scalar(data)
      }
    })

    // Aliases

    var myOperators = binaryOperators.concat(comparisonOperators)

      // TODO this aliasify function can be in common with Vector and Matrix
    myOperators.forEach((operator) => {
      operators.aliasesOf[operator].forEach((alias) => {
        Scalar[alias] = Scalar[operator]
        Scalar.prototype[alias] = Scalar.prototype[operator]
      })
    })

    Scalar.prototype.ne = Scalar.prototype.negation
    Scalar.prototype.inv = Scalar.prototype.inversion

    Scalar.ne = Scalar.negation
    Scalar.inv = Scalar.inversion

    return Scalar
  }
}

module.exports = CompositionAlgebra
