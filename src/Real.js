
var inherits = require('inherits')

var Field = require('./Field')

var zero = 0
  , one  = 1

function addition (a, b) { return a + b }

function subtraction (a, b) { return a - b }

function multiplication (a, b) { return a * b }

function division (a, b) { return a / b }

function equal (a, b) { return a === b }

function contains (a) { return typeof a === "number" }

var field = new Field(zero, one, {
  addition   : addition
, subtraction: subtraction
, contains   : contains
})

/**
 * Real number.
 */

function Real (data) {
  field.Scalar.call(this, data)

  // TODO inherit from Scalar
}
/*
Real.prototype.addition = function (a) {
  this.data = addition(this, a)

  return this
}

Real.prototype.subtraction = function (a) {
  this.data = subtraction(this, a)

  return this
}
*/

inherits(Real, field.Scalar)

Real.addition = field.addition
Real.subtraction = field.subtraction
Real.contains = field.contains

module.exports = Real

