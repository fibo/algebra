
var inherits = require('inherits')

var Field = require('./Field')

var zero = [0, 0]
  , one  = [1, 0]

function addition (z, w) {
  return [z[0] + w[0], z[1] + w[1]]
}

function subtraction (z, w) {
  return [z[0] - w[0], z[1] - w[1]]
}

function multiplication (z, w) {
  return [z[0] * w[0] + z[1] * w[1], z[0] * w[1] - z[1] * w[0]]
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

Complex.addition = field.addition
Complex.subtraction = field.subtraction
Complex.multiplication = field.multiplication

Complex.contains = field.contains

module.exports = Complex

