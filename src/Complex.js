
var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildComplexField   = require('./buildComplexField'),
    buildFieldOperators = require('./buildFieldOperators'),
    realField           = require('./realField'),
    Scalar              = require('./Scalar')

var complexField = buildComplexField(realField)

/**
 * Complex number.
 *
 * ```
 * var z = new Complex([1, 2]),
 *     w = new Complex([-2, 8.5]);
 * ```
 *
 * @class
 *
 * @param {Array} data
 */

function Complex (data) {
  Scalar.call(this, complexField, data)
}

inherits(Complex, Scalar)

addStaticOperators(Complex, buildFieldOperators(complexField))

/*!
 */

function scalarConjugation (z) {
  this.data = complexField.operator.conjugation(this.data)

  return this
}

Complex.prototype.conjugation = scalarConjugation
Complex.prototype.conj        = scalarConjugation

// Add conjugation as a static operator.
Complex.conjugation = complexField.operator.conjugation
Complex.conj        = complexField.operator.conjugation

module.exports = Complex

