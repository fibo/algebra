
var AlgebraField = require('./AlgebraField')
  , inherits     = require('inherits')

function QuaternionField () {
  AlgebraField.call(this, [0, 0, 0, 0], [1, 0, 0, 0])
}

inherits(QuaternionField, AlgebraField)

function addition(a, b) {
  return [
    a[0] + b[0],
    a[1] + b[1],
    a[2] + b[2],
    a[3] + b[3]
  ]
}
QuaternionField.prototype.addition = addition
QuaternionField.prototype.add      = addition

function subtraction(a, b) {
  return [
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2],
    a[3] - b[3]
  ]
}
QuaternionField.prototype.subtraction = subtraction
QuaternionField.prototype.sub         = subtraction

function conjugation(q) {
  // z~ = (q0 + i q1 + j q2 + k q3)~
  //    = q0 - i q1 - j q2 - k q3
  return [q[0], - q[1], - q[2], - q[3]]
}
QuaternionField.prototype.conjugation = conjugation
QuaternionField.prototype.conj        = conjugation

function equal(a, b) {
  return (
    a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3]
  )
}
QuaternionField.prototype.equal = equal
QuaternionField.prototype.eq    = equal

function notEqual(a, b) {
  return (
    a[0] !== b[0] ||
    a[1] !== b[1] ||
    a[2] !== b[2] ||
    a[3] !== b[3]
  )
}
QuaternionField.prototype.notEqual = notEqual
QuaternionField.prototype.ne    = notEqual

module.exports = QuaternionField

