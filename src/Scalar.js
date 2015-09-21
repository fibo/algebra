
var algebraRing = require('algebra-ring'),
    coerced     = require('./coerced'),
    comparison  = require('./comparison'),
    Element     = require('./Element'),
    method      = require('./method'),
    inherits    = require('inherits')

var nAryMethod  = method.nAry,
    unaryMethod = method.unary

/**
 * Create an algebra scalar.
 *
 * @param {Array} identity
 * @param {Array} identity[0] a.k.a. zero
 * @param {Array} identity[1] a.k.a. uno
 * @param {Object}   given operator functions
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

  Scalar.prototype.addition    = nAryMethod(addition, Scalar)
  Scalar.prototype.subtraction = nAryMethod(subtraction, Scalar)
  Scalar.prototype.negation    = unaryMethod(negation, Scalar)
  Scalar.prototype.conjugation = unaryMethod(conjugation, Scalar)

  Scalar.prototype.multiplication = nAryMethod(multiplication, Scalar)
  Scalar.prototype.division       = nAryMethod(division, Scalar)
  Scalar.prototype.inversion      = unaryMethod(inversion, Scalar)

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

