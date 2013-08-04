
var AlgebraField = require('./AlgebraField')
  , util         = require('util')

function QuaternionField() {
  AlgebraField.call(this, {
    zero: [0, 0, 0, 0],
    one: [1, 0, 0, 0],
    constants: {
      i: [0, 1, 0, 0],
      j: [0, 0, 1, 0],
      k: [0, 0, 0, 1]
    }
  })
}

util.inherits(QuaternionField, AlgebraField)

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

function equal(a, b) {
  return 
    a[0] === b[0] && 
    a[1] === b[1] &&
    a[2] === b[2] &&
    a[3] === b[3]
}
QuaternionField.prototype.equal = equal
QuaternionField.prototype.eq    = equal

function notEqual(a, b) {
  return 
    a[0] !== b[0] || 
    a[1] !== b[1] ||
    a[2] !== b[2] ||
    a[3] !== b[3]
}
QuaternionField.prototype.notEqual = notEqual
QuaternionField.prototype.ne    = notEqual

module.exports = QuaternionField
