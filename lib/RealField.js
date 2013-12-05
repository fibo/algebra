
// RealField

var AlgebraField = require('./AlgebraField')
  , inherits     = require('inherits')
  , _            = require('underscore')

// constructor

function RealField() {
  AlgebraField.call(this, 0, 1)
}

inherits(RealField, AlgebraField)

// addition
function addition (a, b) {
  return a + b
}
RealField.prototype.addition = addition
RealField.prototype.add      = addition

function subtraction (a, b) {
  return a - b
}
RealField.prototype.subtraction = subtraction
RealField.prototype.sub         = subtraction

function multiplication (a, b) {
  return a * b
}
RealField.prototype.multiplication = multiplication
RealField.prototype.mul      = multiplication

function division(a, b) {
  return a / b
}
RealField.prototype.division = division
RealField.prototype.div      = division

function equal(a, b) {
  return a === b
}
RealField.prototype.equal = equal
RealField.prototype.eq    = equal

function notEqual(a, b) {
  return a !== b
}
RealField.prototype.notEqual = notEqual
RealField.prototype.ne       = notEqual

module.exports = RealField

