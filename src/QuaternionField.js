
//
// # QuaternionField
//

var AlgebraField = require('./AlgebraField')
  , inherits     = require('inherits')

function QuaternionField () {
  this.addition = addition
  this.subtraction = subtraction
  this.multiplication = function () {}
  this.division = function () {}
  this.equal = equal

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

function subtraction(a, b) {
  return [
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2],
    a[3] - b[3]
  ]
}

function conjugation(q) {
  // z~ = (q0 + i q1 + j q2 + k q3)~
  //    = q0 - i q1 - j q2 - k q3
  return [q[0], - q[1], - q[2], - q[3]]
}

function equal(a, b) {
  return (
    a[0] === b[0] &&
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3]
  )
}

function notEqual(a, b) {
  return (
    a[0] !== b[0] ||
    a[1] !== b[1] ||
    a[2] !== b[2] ||
    a[3] !== b[3]
  )
}

module.exports = QuaternionField

