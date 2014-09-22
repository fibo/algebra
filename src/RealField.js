
var AlgebraField = require('./AlgebraField')
  , inherits     = require('inherits')

function addition (a, b) { return a + b }

function subtraction (a, b) { return a - b }

function multiplication (a, b) { return a * b }

function division (a, b) { return a / b }

function equal (a, b) { return a === b }

function contains (a) { return typeof a === "number" }

/**
 * The field of real numbers.
 */

function RealField () {
  this.addition       = addition
  this.subtraction    = subtraction
  this.multiplication = multiplication
  this.division       = division
  this.equal          = equal
  this.contains       = contains

  AlgebraField.call(this, 0, 1)
}

inherits(RealField, AlgebraField)

module.exports = RealField

