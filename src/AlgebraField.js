
var requiredOperators = [
  'addition', 'multiplication', 'equal', 'division', 'subtraction', 'contains'
]

var derivedOperators = [
  'inversion', 'negation', 'notEqual', 'notContains'
]

var aliasOperatorsOf = {
  'addition': ['add']
, 'subtraction': ['sub']
, 'multiplication': ['mul']
, 'division': ['div']
, 'equal': ['eq']
, 'notEqual': ['ne']
, 'inversion': ['inv']
, 'negation': ['neg']
, 'contains': []
, 'notContains': []
}

/**
 * Abstract algebra field
 *
 * @param {Any} zero
 * @param {Any} one
 */

function AlgebraField (zero, one) {
  var self = this

  self.zero = zero
  self.one = one

/*
*/
  var unimplementedOperators = []

  // Check if operators are implemented
  requiredOperators.forEach(function (operator) {
    if (typeof self[operator] === 'function') {
      // Create aliases of required operators
      aliasOperatorsOf[operator].forEach(function (alias) {
        self[alias] = self[operator]
      })
    } else {
      unimplementedOperators.push(operator)
    }
  })

  if (unimplementedOperators.length > 0)
    throw new Error('Unimplemented operators: ' + unimplementedOperators.join(' '))

  function negation (a) { return self.subtraction(self.zero, a) }
  self.negation = negation

  function inversion (a) { return self.division(self.one, a) }
  self.inversion = inversion

  function notEqual (a, b) { return ! self.equal(a, b) }
  self.notEqual = notEqual

  function notContains (a) { return ! self.contains(a) }
  self.notContains = notContains

  // Create aliases for derived operators
  derivedOperators.forEach(function (operator) {
    aliasOperatorsOf[operator].forEach(function (alias) {
      self[alias] = self[operator]
    })
  })
}

AlgebraField.requiredOperators = requiredOperators
AlgebraField.derivedOperators = derivedOperators
AlgebraField.aliasOperatorsOf = aliasOperatorsOf

module.exports = AlgebraField

