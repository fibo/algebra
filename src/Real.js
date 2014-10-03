
var inherits = require('inherits')

var addStaticOperators = require('./addStaticOperators')
  , Field = require('./Field')

var zero = 0
  , one  = 1

function addition (a, b) { return a + b }

function subtraction (a, b) { return a - b }

function multiplication (a, b) { return a * b }

function division (a, b) { return a / b }

function negation (a) { return - a }

function equal (a, b) { return a === b }

function contains (a) { return typeof a === "number" }

var field = new Field(zero, one, {
  addition      : addition
, subtraction   : subtraction
, multiplication: multiplication
, negation      : negation
, equal         : equal
, contains      : contains
})

/**
 * Real number.
 */

function Real (data) {
  field.Scalar.call(this, data)
}

inherits(Real, field.Scalar)

addStaticOperators(Real, field)

module.exports = Real

