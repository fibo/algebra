
var AlgebraField = require('./AlgebraField')
  , util         = require('util')

function ComplexField() {
  AlgebraField.call(this, {
    zero: [0, 0],
    one: [1, 0],
    constants: {
      i: [0, 1]
    }
  })
}

util.inherits(ComplexField, AlgebraField)

function addition(a, b) {
  return [a[0] + b[0], a[1] + b[1]]
}
ComplexField.prototype.addition = addition
ComplexField.prototype.add      = addition

function subtraction(a, b) {
  return [a[0] - b[0], a[1] - b[1]]
}
ComplexField.prototype.subtraction = subtraction
ComplexField.prototype.sub         = subtraction

function equal(a, b) {
  return a[0] === b[0] && a[1] === b[1]
}
ComplexField.prototype.equal = equal
ComplexField.prototype.eq    = equal

function notEqual(a, b) {
  return a[0] !== b[0] || a[1] !== b[1]
}
ComplexField.prototype.notEqual = notEqual
ComplexField.prototype.ne    = notEqual

module.exports = ComplexField

