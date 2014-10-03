
var inherits = require('inherits')

var addStaticOperators = require('./addStaticOperators')
  , Field = require('./Field')

var zero = [0, 0]
  , one  = [1, 0]

function addition (z, w) {
  return [z[0] + w[0], z[1] + w[1]]
}

function subtraction (z, w) {
  return [z[0] - w[0], z[1] - w[1]]
}

function multiplication (z, w) {
  return [z[0] * w[0] - z[1] * w[1], z[1] * w[0] + z[0] * w[1]]
}

function contains (z) {
  return (typeof z[0] === 'number') && (typeof z[1] === 'number')
}

var field = new Field(zero, one, {
  addition   : addition
, subtraction: subtraction
, multiplication: multiplication
, contains   : contains
})

/**
 * Complex number.
 */

function Complex (data) {
  field.Scalar.call(this, data)
}

inherits(Complex, field.Scalar)

addStaticOperators(Complex, field)

function fieldConjugation (z) {
  return [z[0], -z[1]]
}

function scalarConjugation (z) {
  this.data = fieldConjugation(this.data)

  return this
}

Complex.prototype.conjugation = scalarConjugation
Complex.prototype.conj = scalarConjugation

Complex.conjugation = fieldConjugation
Complex.conj        = fieldConjugation

module.exports = Complex

