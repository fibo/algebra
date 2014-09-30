
// See http://en.wikipedia.org/wiki/Boolean_algebra
 
var algebra  = require('algebra')
  , inherits = require('inherits')

var Field = algebra.Field

var zero = false
  , one = true

function addition (a, b) { return a && b }
function subtraction (a, b) { return a && (!b) }
function multiplication (a, b) { return a || b }
// division       = function (a, b) { return (a / b) % 2 }
// equal          = function (a, b) { return a === b }
function contains (a) { return typeof a === "boolean" }

var field = new Field(zero, one, {
  addition      : addition
, subtraction   : subtraction
, multiplication: multiplication
, contains      : contains
})

/**
 * Boolean Algebra

 */

function Boole (data) {
  field.Scalar.call(this, data)
}

inherits(Boole, field.Scalar)

Boole.addition    = field.addition
Boole.subtraction = field.subtraction
Boole.contains    = field.contains

module.exports = Boole

