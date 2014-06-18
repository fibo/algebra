
//
// # RealField
//
// The field of real numbers.
//

var AlgebraField = require('./AlgebraField')
  , inherits     = require('inherits')
  , _            = require('underscore')

function RealField () {
  AlgebraField.call(this, 0, 1)
}

inherits(RealField, AlgebraField)

  /* TODO manca "inverse", inoltre dovrei fare checkData */

//
// ## Methods
//

//
// ### addition
//

function addition (a, b) {
  return a + b
}
RealField.prototype.addition = addition
RealField.prototype.add      = addition

//
// ### subtraction
//

function subtraction (a, b) {
  return a - b
}
RealField.prototype.subtraction = subtraction
RealField.prototype.sub         = subtraction

//
// ### multiplication
//

function multiplication (a, b) {
  return a * b
}
RealField.prototype.multiplication = multiplication
RealField.prototype.mul      = multiplication

//
// ### division
//

function division(a, b) {
  return a / b
}
RealField.prototype.division = division
RealField.prototype.div      = division

//
// ### equal
//

function equal(a, b) {
  return a === b
}
RealField.prototype.equal = equal
RealField.prototype.eq    = equal

//
// ### notEqual
//

function notEqual(a, b) {
  return a !== b
}
RealField.prototype.notEqual = notEqual
RealField.prototype.ne       = notEqual

module.exports = RealField

