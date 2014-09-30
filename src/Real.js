
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
  addition      : addition
, subtraction   : subtraction
, multiplication: multiplication
, contains      : contains
})

/**
 * Real number.
 */

function Real (data) {
  field.Scalar.call(this, data)
}

inherits(Real, field.Scalar)

Real.addition       = field.addition
Real.subtraction    = field.subtraction
Real.multiplication = field.multiplication
Real.contains       = field.contains

module.exports = Real

