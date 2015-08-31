
var algebraGroup = require('algebra-group'),
    algebraRing  = require('algebra-ring'),
    Element      = require('./Element'),
    inherits     = require('inherits'),
    nArify       = require('./nArify')

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
      equality       = nArify(g.equality),
      multiplication = nArify(r.multiplication),
      subtraction    = nArify(g.subtraction)

  // Comparison operators.

  function equalityComparison () {
    return equality(this.data, equality.apply(null, arguments))
  }

  K.prototype.equality = equalityComparison

  function disequalityComparison () {
    return disequality(this.data, disequality.apply(null, arguments))
  }

  K.prototype.disequality = disequalityComparison

  // Chainable class methods.

  function additionMutator () {
    this.data = addition(this.data, addition.apply(null, arguments))
    return this
  }

  K.prototype.addition = additionMutator

  function inversionMutator () {
    this.data = r.inversion(this.data)
    return this
  }

  K.prototype.inversion = inversionMutator

  function multiplicationMutator () {
    this.data = multiplication(this.data, multiplication.apply(null, arguments))
    return this
  }

  K.prototype.multiplication = multiplicationMutator

  function negationMutator () {
    this.data = g.negation(this.data)
    return this
  }

  K.prototype.negation = negationMutator

  function subtractionMutator () {
    this.data = subtraction(this.data, subtraction.apply(null, arguments))
    return this
  }

  K.prototype.subtraction = subtractionMutator

  // Static operators.

  K.addition       = addition
  K.equality       = equality
  K.disequality    = disequality
  K.inversion      = g.inversion
  K.multiplication = multiplication
  K.negation       = g.negation
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
  K.inv = K.inversion
  K.mul = K.multiplication
  K.neg = K.negation
  K.sub = K.subtraction

  K.prototype.add = additionMutator
  K.prototype.inv = inversionMutator
  K.prototype.mul = multiplicationMutator
  K.prototype.neg = negationMutator
  K.prototype.sub = subtractionMutator

  return K
}

module.exports = ring

