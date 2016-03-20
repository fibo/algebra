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
 * @param {Object} field
 *
 * @returns {Function} anonymous with signature (numOfCayleyDicksonConstructionIteration)
 */

function CompositionAlgebra (field) {
  /**
   * @param {Number} num of CayleyDickson construction iterations
   */

  return function (num) {
    var K = CayleyDickson(field, num)
    var indices = [1]

    var AbstractScalar = TensorSpace(indices)(K)

    function Scalar (data) {
      AbstractScalar.call(this, data)

      staticProps(this)({
        zero: K.zero,
        one: K.one
      })
    }

    inherits(Scalar, AbstractScalar)

    staticProps(Scalar)({
      zero: K.zero,
      one: K.one
    })

    var myBinaryOperators = operators.group.concat(['equality', 'disequality', 'multiplication', 'division'])

    if (num > 0) {
      myBinaryOperators.push('conjugation')
    }

    myBinaryOperators.forEach((operator) => {
      Scalar[operator] = function () {
        var operands = [].slice.call(arguments).map(toData)
        return K[operator].apply(null, operands)
      }

      Scalar.prototype[operator] = function () {
        var args = [].slice.call(arguments)
        var operands = [this.data].concat(args)

        var data = Scalar[operator].apply(null, operands)

        return new Scalar(data)
      }
    })

    Scalar.prototype.mul = Scalar.prototype.multiplication

    Scalar.mul = Scalar.multiplication

    Scalar.div = Scalar.division

    Scalar.prototype.eq = Scalar.prototype.equality

    Scalar.eq = Scalar.equality

    Scalar.disequality = function () {
      var operands = [].slice.call(arguments).map(toData)
      var operator = K.disequality
      return operator.apply(null, operands)
    }

    Scalar.prototype.disequality = function () {
      var args = [].slice.call(arguments)
      var operands = [this.data].concat(args)

      var data = Scalar.disequality.apply(null, operands)

      return new Scalar(data)
    }

    Scalar.prototype.ne = Scalar.prototype.disequality

    Scalar.ne = Scalar.disequality

    // TODO refactor all binary operators in a functionally way

    function unary (operator) {
      Scalar[operator] = function (operand) {
        return K[operator](toData(operand))
      }

      Scalar.prototype[operator] = function () {
        var data = Scalar[operator](this.data)

        return new Scalar(data)
      }
    }

    var unaryOperators = ['inversion', 'negation']

    unaryOperators.forEach(unary)

    Scalar.prototype.ne = Scalar.prototype.negation
    Scalar.prototype.inv = Scalar.prototype.inversion

    Scalar.ne = Scalar.negation
    Scalar.inv = Scalar.inversion

    return Scalar
  }
}

module.exports = CompositionAlgebra
