
var zero = 0,
    one  = 1

/*!
 */

function addition (a, b) { return a + b }

/*!
 */

function multiplication (a, b) { return a * b }

/*!
 */

function inversion (a) { return one / a }

/*!
 */

function negation (a) { return - a }

/*!
 */

function equal (a, b) { return a === b }

/*!
 */

function contains (a) {
  // NaN, Infinity and -Infinity are not allowed
  return (typeof a === 'number' && isFinite(a))
}

var operators = {
  addition      : addition,
  multiplication: multiplication,
  negation      : negation,
  inversion     : inversion,
  equal         : equal,
  contains      : contains
}

var realField = {
  one     : one,
  zero    : zero,
  operator: operators
}

module.exports = realField

