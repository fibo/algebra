
var algebraGroup = require('algebra-group'),
    algebraRing  = require('algebra-ring'),
    Element      = require('./Element'),
    mutator      = require('./mutator'),
    inherits     = require('inherits'),
    nArify       = require('./nArify')

var nAryMutator  = mutator.nAry,
    unaryMutator = mutator.unary

/**
 * Create an algebra ring.
 *
 * @params {Array} identities [zero, one]
 * @params {Object} operators: contains, equality, addition, negation, multiplication, inversion
 *
 * @returns {Function} K ring
 */

function ring (id, op) {
  var g = algebraGroup(op.contains, id[0], op.equality, op.addition, op.negation),
      r = algebraRing(g, id[1], op.multiplication, op.inversion)

  function K (data) {
    Element.call(this, data, op.contains)
  }

  inherits(K, Element)

  var addition       = nArify(g.addition),
      disequality    = nArify(g.disequality),
      division       = nArify(r.division),
      equality       = nArify(g.equality),
      multiplication = nArify(r.multiplication),
      subtraction    = nArify(g.subtraction)

  // Comparison operators.

  function comparison (operator) {
    return function () {
      return operator.bind(null, this.data).apply(null, arguments)
    }
  }

  K.prototype.equality    = comparison(equality)
  K.prototype.disequality = comparison(disequality)

  // Chainable class methods.

  K.prototype.addition       = nAryMutator(addition)
  K.prototype.division       = nAryMutator(division)
  K.prototype.multiplication = nAryMutator(multiplication)
  K.prototype.subtraction    = nAryMutator(subtraction)

  K.prototype.inversion = unaryMutator(r.inversion)
  K.prototype.negation  = unaryMutator(g.negation)

  // Static operators.

  K.addition       = addition
  K.contains       = g.contains
  K.disequality    = disequality
  K.division       = division
  K.equality       = equality
  K.inversion      = r.inversion
  K.multiplication = multiplication
  K.negation       = g.negation
  K.notContains    = g.notContains
  K.subtraction    = subtraction

  // Identities.

  Object.defineProperties(K, {
    'zero': {
      writable: false,
      value: id[0]
    },
    'one': {
      writable: false,
      value: id[1]
    },
  })

  // Aliases.

  K.eq = K.equality
  K.ne = K.disequality

  K.equal    = K.equality
  K.notEqual = K.disequality
  K.notEq    = K.disequality

  K.add = K.addition
  K.div = K.division
  K.inv = K.inversion
  K.mul = K.multiplication
  K.neg = K.negation
  K.sub = K.subtraction

  K.prototype.add = K.prototype.addition
  K.prototype.div = K.prototype.division
  K.prototype.inv = K.prototype.inversion
  K.prototype.mul = K.prototype.multiplication
  K.prototype.neg = K.prototype.negation
  K.prototype.sub = K.prototype.subtraction

  return K
}

module.exports = ring

