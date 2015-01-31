
var inherits = require('inherits')

var addStaticOperators = require('./addStaticOperators'),
    buildFieldOperators = require('./buildFieldOperators'),
    Scalar = require('./Scalar')

var zero = 0
  , one  = 1

function addition (a, b) { return a + b }

function multiplication (a, b) { return a * b }

function inversion (a) { return one / a }

function negation (a) { return - a }

function equal (a, b) { return a === b }

function contains (a) { return typeof a === 'number' }

/*
var field = new Field(zero, one, {
  addition      : addition
, multiplication: multiplication
, negation      : negation
, inversion     : inversion
, equal         : equal
, contains      : contains
})
*/

var operators = {
  addition      : addition,
  multiplication: multiplication,
  negation      : negation,
  inversion     : inversion,
  equal         : equal,
  contains      : contains
}

var field = {
  one: one,
  zero: zero,
  operator: operators
}

/**
 * Real number.
 */

function Real (data) {
  //field.Scalar.call(this, data)
  Scalar.call(this, field, data)
    // TODO devo aggiungere contains per passarlo ad Element e field per costruire gli operatori mutator
    // TODO Field è statico, non va instanaziato con new
    // basta fare un buildField
    // TODO buildField(Real,zero,one,operators)
    // il quale aggiunge i metodi statici
}

//inherits(Real, field.Scalar)
inherits(Real, Scalar)

addStaticOperators(Real, buildFieldOperators(field))

module.exports = Real

