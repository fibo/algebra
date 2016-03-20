var CayleyDickson = require('cayley-dickson')
var inherits  = require('inherits')
var operators = require('./operators.json')
var staticProps = require('static-props')
var TensorSpace = require('./TensorSpace')

/**
 * A composition algebra is one of ℝ, ℂ, ℍ, O:
 * Real, Complex, Quaterion, Octonion.
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

    var AbstractScalar = TensorSpace([1])(K)

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

    function binary (operator) {
      return function (scalar) {
        var result = K[operator](this.data, scalar)

        return new Scalar(result)
      }
    }

    function multiplication (scalar) {
      var result = K.multiplication(this.data, scalar)

      return new Scalar(result)
    }

    operators.group.forEach((operator) => {
      Scalar[operator] = AbstractScalar[operator]
    })

    Scalar.prototype.multiplication = binary('multiplication')
    Scalar.prototype.mul = Scalar.prototype.multiplication

    Scalar.multiplication = K.multiplication
    Scalar.mul = K.multiplication

    return Scalar
  }
}

module.exports = CompositionAlgebra
