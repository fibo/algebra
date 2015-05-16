
var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    Scalar              = require('./Scalar')

var zero = [0, 0]
  , one  = [1, 0]

function addition (z, w) {
  return [z[0] + w[0], z[1] + w[1]]
}

function multiplication (z, w) {
  return [z[0] * w[0] - z[1] * w[1], z[1] * w[0] + z[0] * w[1]]
}

function conjugation (z) {
  // z~ = (z0 + i z1)~
  //    = z0 - i z1
  return [z[0], - z[1]]
}

function norm (z) {
  // |z| = |z0 + i z1|
  //     = z0 * z0 + z1 * z1
  return z[0] * z[0] + z[1] * z[1]
}

function inversion (z) {
  // z^-1 = z~ * 1 / |z|
  return multiplication(conjugation(z), [1 / norm(z), 0])
}

function equal (z, w) {
  return ((z[0] === w[0]) && (z[1] === w[1]))
}

function contains (z) {
  return (typeof z[0] === 'number') && (typeof z[1] === 'number')
}

function negation (z) {
  return [-z[0], -z[1]]
}

var operators = {
  addition      : addition,
  multiplication: multiplication,
  negation      : negation,
  inversion     : inversion,
  equal         : equal,
  contains      : contains
}

var field = {
  one     : one,
  zero    : zero,
  operator: operators
}

/**
 * Complex number.
 *
 * ```
 * var z = new Complex([1, 2]),
 *     w = new Complex([-2, 8.5]);
 * ```
 *
 * @param {Array} data
 *
 * @returns {Object} complex number
 */

function Complex (data) {
  Scalar.call(this, field, data)
}

inherits(Complex, Scalar)

addStaticOperators(Complex, buildFieldOperators(field))

function fieldConjugation (z) {
  return conjugation(z)
}

function scalarConjugation (z) {
  this.data = fieldConjugation(this.data)

  return this
}

Complex.prototype.conjugation = scalarConjugation
Complex.prototype.conj        = scalarConjugation

Complex.conjugation = fieldConjugation
Complex.conj        = fieldConjugation

module.exports = Complex

