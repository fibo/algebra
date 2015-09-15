
var algebraRing = require('algebra-ring'),
    coerced     = require('./coerced'),
    comparison  = require('./comparison'),
    Element     = require('./Element'),
    mutator     = require('./mutator'),
    inherits    = require('inherits')

var nAryMutator  = mutator.nAry,
    unaryMutator = mutator.unary

/**
 * Create an algebra ring.
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
 * @returns {Function} Ring that implements an algebra ring as a class
 */

function ring (identity, given) {
  var r = algebraRing(identity, given)

  function Ring (data) {
    Element.call(this, data, given.contains)
  }

  inherits(Ring, Element)

  // Note that many code in ring.js is almost the same of group.js:
  // copy and paste over inheritance!

  var addition    = coerced(given.addition),
      contains    = coerced(given.contains),
      disequality = coerced(given.disequality),
      equality    = coerced(given.equality),
      negation    = coerced(given.negation),
      notContains = coerced(given.notContains),
      subtraction = coerced(given.subtraction)

  var multiplication = coerced(given.multiplication),
      division       = coerced(given.division),
      inversion      = coerced(given.inversion)

  // Comparison operators.

  Ring.prototype.equality    = comparison(equality)
  Ring.prototype.disequality = comparison(disequality)

  // Chainable class methods.

  Ring.prototype.addition    = nAryMutator(addition)
  Ring.prototype.subtraction = nAryMutator(subtraction)
  Ring.prototype.negation    = unaryMutator(negation)

  Ring.prototype.multiplication = nAryMutator(multiplication)
  Ring.prototype.division       = nAryMutator(division)
  Ring.prototype.inversion      = unaryMutator(r.inversion)

  // Static operators.

  Ring.addition    = addition
  Ring.contains    = contains
  Ring.disequality = disequality
  Ring.equality    = equality
  Ring.negation    = negation
  Ring.notContains = notContains
  Ring.subtraction = subtraction

  Ring.multiplication = multiplication
  Ring.division       = division
  Ring.inversion      = inversion

  // Aliases.

  Ring.eq = Ring.equality
  Ring.ne = Ring.disequality

  Ring.equal    = Ring.equality
  Ring.notEqual = Ring.disequality
  Ring.notEq    = Ring.disequality

  Ring.add = Ring.addition
  Ring.neg = Ring.negation
  Ring.sub = Ring.subtraction

  Ring.div = Ring.division
  Ring.inv = Ring.inversion
  Ring.mul = Ring.multiplication

  Ring.prototype.add = Ring.prototype.addition
  Ring.prototype.neg = Ring.prototype.negation
  Ring.prototype.sub = Ring.prototype.subtraction

  Ring.prototype.mul = Ring.prototype.multiplication
  Ring.prototype.div = Ring.prototype.division
  Ring.prototype.inv = Ring.prototype.inversion

  // Identities.

  Ring.zero = new Ring(identity[0])
  Ring.one = new Ring(identity[1])

  return Ring
}

module.exports = ring

