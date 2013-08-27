
var AlgebraField = require('./AlgebraField')
  , inherits     = require('inherits')

function ComplexField() {
  AlgebraField.call(this, {
    zero: [0, 0],
    one: [1, 0],
    constants: {
      i: [0, 1]
    }
  })
}

inherits(ComplexField, AlgebraField)

function addition(z, w) {
  // z + w = (z0 + i z1) + (w0 + i w1)
  //       = (z0 + w0) + i (z1 + w1)
  return [z[0] + w[0], z[1] + w[1]]
}
ComplexField.prototype.addition = addition
ComplexField.prototype.add      = addition

function subtraction(z, w) {
  // z - w = (z0 + i z1) - (w0 + i w1)
  //       = (z0 - w0) + i (z1 - w1)
  return [z[0] - w[0], z[1] - w[1]]
}
ComplexField.prototype.subtraction = subtraction
ComplexField.prototype.sub         = subtraction

function multiplication(z, w) {
  // z * w = (z0 + i z1) * (w0 + i w1)
  //       = z0 * w0 + z0 * i w1 + i z1 * w0 + i z1 * i w1
  //       = (z0 * w0 - z1 * w1) + i (z0 * w1 + z1 * w0)
  return [z[0] * w[0] - z[1] * w[1], z[0] * w[1] + z[1] * w[0]]
}
ComplexField.prototype.multiplication = multiplication
ComplexField.prototype.mul            = multiplication

function division(z, w) {
  // z / w = z * w^-1
  return multiplication(z, inversion(w))
}
ComplexField.prototype.division = division
ComplexField.prototype.div      = division

function conjugation(z) {
  // z~ = (z0 + i z1)~
  //    = z0 - i z1
  return [z[0], - z[1]]
}
ComplexField.prototype.conjugation = conjugation
ComplexField.prototype.conj        = conjugation

function norm(z) {
  // |z| = |z0 + i z1|
  //     = z0 * z0 + z1 * z1
  return z[0] * z[0] + z[1] * z[1]
}

function inversion(z) {
  // z^-1 = z~ * 1 / |z|
  return multiplication(conjugation(z), [1 / norm(z), 0])
}

function equal(z, w) {
  return z[0] === w[0] && z[1] === w[1]
}
ComplexField.prototype.equal = equal
ComplexField.prototype.eq    = equal

function notEqual(a, b) {
  return z[0] !== w[0] || z[1] !== w[1]
}
ComplexField.prototype.notEqual = notEqual
ComplexField.prototype.ne       = notEqual

module.exports = ComplexField

