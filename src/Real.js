
function coerceToData (a) {
  if (a instanceof Real)
    return a.data

  if (contains(a))
    return a

  throw new TypeError(arg)
}

function addition (a, b) { return coerceToData(a) + coerceToData(b) }

function subtraction (a, b) { return coerceToData(a) - coerceToData(b) }

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
  this.data = addition(this, a)

  return this
}

Real.prototype.subtraction = function (a) {
  this.data = subtraction(this, a)

  return this
}

Real.addition = addition
Real.subtraction = subtraction

Real.coerceToData = coerceToData

module.exports = Real

