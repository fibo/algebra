
function addition (a, b) { return a + b }

function subtraction (a, b) { return a - b }

function multiplication (a, b) { return a * b }

function division (a, b) { return a / b }

function equal (a, b) { return a === b }

function contains (a) { return typeof a === "number" }

/**
 * Real number.
 */

function Real (data) {
  this.data = data

  // TODO inherit from Scalar
}

Real.prototype.addition = function (a) {
  this.data = addition(this.data, a)
}

Real.addition = addition

module.exports = Real

