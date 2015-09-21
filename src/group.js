
// TODO remove this file

var algebraGroup = require('algebra-group'),
    coerced      = require('./coerced'),
    comparison   = require('./comparison'),
    Element      = require('./Element'),
    inherits     = require('inherits')

/**
 * Create an algebra group.
 *
 * @api private
 *
 * @param {Object} given
 * @param {*}        given.identity a.k.a neutral element
 * @param {Function} given.contains
 * @param {Function} given.equality
 * @param {Function} given.compositionLaw
 * @param {Function} given.inversion
 * @param {Object} [naming]
 * @param {String} [naming.identity=zero]
 * @param {String} [naming.contains=contains]
 * @param {String} [naming.equality=equality]
 * @param {String} [naming.compositionLaw=addition]
 * @param {String} [naming.inversion=negation]
 * @param {String} [naming.inverseCompositionLaw=subtraction]
 * @param {String} [naming.notContains=notContains]
 *
 * @returns {Function} Group that implements an algebra group as a class
 */

function group (given, naming) {
  var g = algebraGroup(given, naming)

  function Group (data) {
    Element.call(this, data, given.contains)
  }

  inherits(Group, Element)

  var addition    = coerced(g.addition),
      contains    = coerced(g.contains),
      disequality = coerced(g.disequality),
      equality    = coerced(g.equality),
      negation    = coerced(g.negation),
      notContains = coerced(g.notContains),
      subtraction = coerced(g.subtraction)

  // Comparison operators.

  Group.prototype.equality    = comparison(equality)
  Group.prototype.disequality = comparison(disequality)

  // Chainable class methods.

  Group.prototype.addition    = nAryMutator(addition)
  Group.prototype.subtraction = nAryMutator(subtraction)
  Group.prototype.negation    = unaryMutator(negation)

  // Static operators.

  Group.addition       = addition
  Group.contains       = contains
  Group.disequality    = disequality
  Group.equality       = equality
  Group.negation       = negation
  Group.notContains    = notContains
  Group.subtraction    = subtraction

  // Identity.

  Object.defineProperty(Group, 'zero', {
    writable: false,
    value: g.zero
  })

  // Aliases.

  Group.eq = Group.equality
  Group.ne = Group.disequality

  Group.equal    = Group.equality
  Group.notEqual = Group.disequality
  Group.notEq    = Group.disequality

  Group.add = Group.addition
  Group.neg = Group.negation
  Group.sub = Group.subtraction

  Group.prototype.add = Group.prototype.addition
  Group.prototype.neg = Group.prototype.negation
  Group.prototype.sub = Group.prototype.subtraction

  return Group
}

module.exports = group

