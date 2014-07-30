
var requiredOperators = [
  'addition', 'multiplication', 'equal', 'division', 'subtraction'
]

var derivedOperators = [
  'addition', 'multiplication', 'equal', 'division', 'subtraction'
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
      // Create aliases for required operators
      aliasOperatorsOf[operator].forEach(function (alias) {
        self[alias] = operator
      })
    } else {
      unimplementedOperators.push(operator)
    }
  })

  if (unimplementedOperators.length > 0)
    throw new Error('Unimplemented operators: ', unimplementedOperators.join(' '))

  function negation (a) { return self.subtraction(self.zero, a) }
  self.negation = negation

  function inversion (a) { return self.division(self.one, a) }
  self.inversion = inversion

  function notEqual (a, b) { return ! self.equal(a, b) }
  self.notEqual = notEqual

  // Create aliases for derived operators
  derivedOperators.forEach(function (operator) {
    aliasOperatorsOf[operator].forEach(function (alias) {
      self[alias] = operator
    })
  })
}

module.exports = AlgebraField

