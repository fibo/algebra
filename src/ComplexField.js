
var AlgebraField = require('./AlgebraField')
  , inherits     = require('inherits')

/**
 * The field of complex numbers.
 */

function ComplexField () {
  this.addition       = addition
  this.subtraction    = subtraction
  this.multiplication = multiplication
  this.division       = division
  this.equal          = equal
  this.contains       = contains

  AlgebraField.call(this, [0, 0], [1, 0])
}

inherits(ComplexField, AlgebraField)

function contains (z) {
  return ((typeof z[0] === "number") && (typeof z[1] === "number"))
}

function addition (z, w) {
  // z + w = (z0 + i z1) + (w0 + i w1)
  //       = (z0 + w0) + i (z1 + w1)
  return [z[0] + w[0], z[1] + w[1]]
}

function subtraction (z, w) {
  // z - w = (z0 + i z1) - (w0 + i w1)
  //       = (z0 - w0) + i (z1 - w1)
  return [z[0] - w[0], z[1] - w[1]]
}

function multiplication (z, w) {
  // z * w = (z0 + i z1) * (w0 + i w1)
  //       = z0 * w0 + z0 * i w1 + i z1 * w0 + i z1 * i w1
  //       = (z0 * w0 - z1 * w1) + i (z0 * w1 + z1 * w0)
  return [z[0] * w[0] - z[1] * w[1], z[0] * w[1] + z[1] * w[0]]
}

function division (z, w) {
  // z / w = z * w^-1
  return multiplication(z, inversion(w))
}

function conjugation (z) {
  // z~ = (z0 + i z1)~
  //    = z0 - i z1
  return [z[0], - z[1]]
}
ComplexField.prototype.conjugation = conjugation
ComplexField.prototype.conj        = conjugation

/**
 * Norm of a complex number
 *
 * @return {Number} norm
 */

function norm (z) {
  // |z| = |z0 + i z1|
  //     = z0 * z0 + z1 * z1
  return z[0] * z[0] + z[1] * z[1]
}
ComplexField.prototype.norm        = norm

function inversion(z) {
  // z^-1 = z~ * 1 / |z|
  return multiplication(conjugation(z), [1 / norm(z), 0])
}

function equal(z, w) {
  return z[0] === w[0] && z[1] === w[1]
}

function notEqual(z, w) {
  return z[0] !== w[0] || z[1] !== w[1]
}

module.exports = ComplexField

