
var algebraRing = require('algebra-ring'),
    coerced     = require('./coerced'),
    comparison  = require('./comparison'),
    Element     = require('./Element'),
    mutator     = require('./mutator'),
    inherits    = require('inherits')

var nAryMutator  = mutator.nAry,
    unaryMutator = mutator.unary

/**
 * Create an algebra scalar.
 *
 * @params {Array} identity
 * @params {Array} identity[0] a.k.a. zero
 * @params {Array} identity[1] a.k.a. uno
 * @params {Object} given operator functions
 * @param {Function} given.contains
 * @param {Function} given.equality
 * @param {Function} given.addition
 * @param {Function} given.negation
 * @param {Function} given.multiplication
 * @param {Function} given.inversion
 *
 * @returns {Function} Scalar that implements an algebra scalar as a class
 */

function Scalar (identity, given) {
  var r = algebraRing(identity, given)

  function Scalar (data) {
    Element.call(this, data, given.contains)
  }

  inherits(Scalar, Element)

    // TODO questo codice dovrebbe stare in cayley-dickson
  if (typeof given.conjugation === 'undefined')
    given.conjugation = function (a) { return a }

  var addition    = coerced(given.addition),
      contains    = coerced(given.contains),
      conjugation = coerced(given.conjugation),
      disequality = coerced(given.disequality),
      equality    = coerced(given.equality),
      negation    = coerced(given.negation),
      notContains = coerced(given.notContains),
      subtraction = coerced(given.subtraction)

  var multiplication = coerced(given.multiplication),
      division       = coerced(given.division),
      inversion      = coerced(given.inversion)

  // Comparison operators.

  Scalar.prototype.equality    = comparison(equality)
  Scalar.prototype.disequality = comparison(disequality)

  // Chainable class methods.

  Scalar.prototype.addition    = nAryMutator(addition, Scalar)
  Scalar.prototype.subtraction = nAryMutator(subtraction, Scalar)
  Scalar.prototype.negation    = unaryMutator(negation)
  Scalar.prototype.conjugation = unaryMutator(conjugation)

  Scalar.prototype.multiplication = nAryMutator(multiplication, Scalar)
  Scalar.prototype.division       = nAryMutator(division, Scalar)
  Scalar.prototype.inversion      = unaryMutator(r.inversion)

  // Static operators.

  Scalar.addition    = addition
  Scalar.contains    = contains
  Scalar.conjugation = conjugation
  Scalar.disequality = disequality
  Scalar.equality    = equality
  Scalar.negation    = negation
  Scalar.notContains = notContains
  Scalar.subtraction = subtraction

  Scalar.multiplication = multiplication
  Scalar.division       = division
  Scalar.inversion      = inversion

  // Aliases.

  Scalar.eq = Scalar.equality
  Scalar.ne = Scalar.disequality

  Scalar.equal    = Scalar.equality
  Scalar.notEqual = Scalar.disequality
  Scalar.notEq    = Scalar.disequality

  Scalar.add = Scalar.addition
  Scalar.neg = Scalar.negation
  Scalar.sub = Scalar.subtraction

  Scalar.div = Scalar.division
  Scalar.inv = Scalar.inversion
  Scalar.mul = Scalar.multiplication

  Scalar.conj = Scalar.conj

  Scalar.prototype.add = Scalar.prototype.addition
  Scalar.prototype.neg = Scalar.prototype.negation
  Scalar.prototype.sub = Scalar.prototype.subtraction

  Scalar.prototype.mul = Scalar.prototype.multiplication
  Scalar.prototype.div = Scalar.prototype.division
  Scalar.prototype.inv = Scalar.prototype.inversion

  Scalar.prototype.conj = Scalar.prototype.conjugation

  // Identities.

  Scalar.zero = new Scalar(identity[0])
  Scalar.one  = new Scalar(identity[1])

  return Scalar
}

module.exports = Scalar

