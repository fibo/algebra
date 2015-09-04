
var algebraRing = require('algebra-ring'),
    coerced     = require('./coerced'),
    Element     = require('./Element'),
    group       = require('./group'),
    mutator     = require('./mutator'),
    inherits    = require('inherits')

var nAryMutator  = mutator.nAry,
    unaryMutator = mutator.unary

/**
 * Create an algebra ring.
 *
 * @params {Array} identities [zero, one]
 * @params {Object} operator definition
 * @param {Function} operator.contains
 * @param {Function} operator.equality
 * @param {Function} operator.addition
 * @param {Function} operator.negation
 * @param {Function} operator.multiplication
 * @param {Function} operator.inversion
 *
 * @returns {Function} Ring that implements an algebra ring as a class
 */

function ring (id, op) {
  /*
  var Group = group({
    identity       : id[0],
    contains       : op.contains,
    equality       : op.equality,
    compositionLaw : op.addition,
    inversion      : op.negation
  }),
  r = null // algebraRing(g, id[1], op.multiplication, op.inversion)

  function Ring (data) {
    Group.call(this, data)
  }

  inherits(Ring, Group)

  var multiplication = coerced(r.multiplication),
      division       = coerced(r.division),
      inversion      = coerced(r.inversion)

  // Chainable class methods.

  Ring.prototype.multiplication = nAryMutator(multiplication)
  Ring.prototype.division       = nAryMutator(division)

  Ring.prototype.inversion = unaryMutator(r.inversion)

  // Static operators.

  Ring.multiplication = multiplication
  Ring.division       = division
  Ring.inversion      = inversion

  // Identity.

  Object.defineProperties(Ring, 'one', {
    writable: false,
    value: id[1]
  })

  // Aliases.

  Ring.div = Ring.division
  Ring.inv = Ring.inversion
  Ring.mul = Ring.multiplication

  Ring.prototype.mul = Ring.prototype.multiplication
  Ring.prototype.div = Ring.prototype.division
  Ring.prototype.inv = Ring.prototype.inversion

  return Ring
  */
}

module.exports = ring

