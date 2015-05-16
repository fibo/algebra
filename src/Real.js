
var inherits = require('inherits')

var addStaticOperators  = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    Scalar              = require('./Scalar')

var zero = 0
  , one  = 1

function addition (a, b) { return a + b }

function multiplication (a, b) { return a * b }

function inversion (a) { return one / a }

function negation (a) { return - a }

function equal (a, b) { return a === b }

function contains (a) { return typeof a === 'number' }

var operators = {
  addition      : addition,
  multiplication: multiplication,
  negation      : negation,
  inversion     : inversion,
  equal         : equal,
  contains      : contains
}

var field = {
  one     : one,
  zero    : zero,
  operator: operators
}

/**
 * Real number.
 *
 * ```
 * var x = new Real(1.5),
 *     y = new Real(-20);
 * ```
 *
 * @param {Number} data
 *
 * @returns {Object} real number
 */

function Real (data) {
  Scalar.call(this, field, data)
}

inherits(Real, Scalar)

addStaticOperators(Real, buildFieldOperators(field))

module.exports = Real

