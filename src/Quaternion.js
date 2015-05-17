
var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    Scalar              = require('./Scalar')

var zero = [0, 0, 0, 0],
    one  = [1, 0, 0, 0]

/*!
 */

function addition (p, q) {
  return [z[0] + w[0], z[1] + w[1]]
}

/*!
 */

function multiplication (p, q) {
// TODO  return [z[0] * w[0] - z[1] * w[1], z[1] * w[0] + z[0] * w[1]]
}

/*!
 */

function conjugation (p) {
  // p~ = (p0 + i p1 + j p2 + k p3)~
  //    = p0 - i p1 - j p2 - k p3
  return [p[0], - p[1], -p[2], -p[3]]
}

/*!
 */

function norm (z) {
  // |p| = |p0 + i p1|
  //     = p0 * p0 + p1 * p1 + p2 * p2 + p3 * p3
  return p[0] * p[0] + p[1] * p[1] + p[2] + p[3]
}

// TODO which inversion? right or left inversion?
//function inversion (z) {
//  // z^-1 = z~ * 1 / |z|
//  return multiplication(conjugation(z), [1 / norm(z), 0])
//}

/*!
 */

function equal (p, q) {
  return ((p[0] === q[0]) && (p[1] === q[1])) && ((p[2] === q[2]) && (p[3] === q[3]))
}

/*!
 */

function contains (p) {
  return (typeof p[0] === 'number') && (typeof p[1] === 'number') && (typeof p[2] === 'number') && (typeof p[3] === 'number')
}

/*!
 */

function negation (p) {
  return [-p[0], -p[1], -p[2], -p[3]]
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
 * Quaternion number.
 *
 * Ladies and gentlmen, this class implements a [Quaternion](https://en.wikipedia.org/wiki/Quaternion).
 *
 * ```
 * var p = new Quaternion([1, 0, 3.5, 1]),
 *     q = new Quaternion([-1, 2, 4, 0]);
 * ```
 *
 * @class
 *
 * @param {Array} data
 */

// TODO Quaternions are a skew field, there is left and right multiplication. Create a SkewField class.
function Quaternion (data) {
  Scalar.call(this, field, data)
}

inherits(Quaternion, Scalar)

addStaticOperators(Complex, buildFieldOperators(field))

/*!
 */

function fieldConjugation (z) {
  return conjugation(z)
}

/*!
 */

function scalarConjugation (z) {
  this.data = fieldConjugation(this.data)

  return this
}

Quaternion.prototype.conjugation = scalarConjugation
Quaternion.prototype.conj        = scalarConjugation
Quaternion
Quaternion.conjugation = fieldConjugation
Quaternion.conj        = fieldConjugation

module.exports = Complex

